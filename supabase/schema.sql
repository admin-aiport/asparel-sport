-- Asparel üye alanı: profiles + courses + coach credentials
-- Supabase SQL Editor'da çalıştırın (idempotent).

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  role text not null check (role in ('sporcu', 'antrenor')),
  avatar_url text not null default '',
  show_on_homepage boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text not null default '';
alter table public.profiles add column if not exists avatar_url text not null default '';
alter table public.profiles add column if not exists show_on_homepage boolean not null default false;

-- Eski metin planları kaldırılır
drop policy if exists "plans_select_athlete_or_coach" on public.plans;
drop policy if exists "plans_insert_coach" on public.plans;
drop policy if exists "plans_update_own_coach" on public.plans;
drop policy if exists "plans_delete_own_coach" on public.plans;
drop table if exists public.plans;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles (id) on delete restrict,
  title text not null,
  branch text not null check (branch in ('basketbol', 'voleybol', 'jimnastik', 'yuzme')),
  weekday text not null check (
    weekday in ('Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar')
  ),
  start_time time not null,
  end_time time not null,
  kind text not null check (kind in ('bireysel', 'grup')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  check (end_time > start_time)
);

create index if not exists courses_coach_id_idx on public.courses (coach_id);
create index if not exists courses_weekday_idx on public.courses (weekday);

create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  athlete_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (course_id, athlete_id)
);

create index if not exists course_enrollments_course_id_idx on public.course_enrollments (course_id);
create index if not exists course_enrollments_athlete_id_idx on public.course_enrollments (athlete_id);

create table if not exists public.coach_credentials (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles (id) on delete cascade,
  branch text not null check (branch in ('basketbol', 'voleybol', 'jimnastik', 'yuzme')),
  level text not null check (
    level in ('1. Kademe', '2. Kademe', '3. Kademe', 'Yardımcı Antrenör', 'Antrenör')
  ),
  created_at timestamptz not null default now(),
  unique (coach_id, branch)
);

create index if not exists coach_credentials_coach_id_idx on public.coach_credentials (coach_id);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.coach_credentials enable row level security;

grant select, insert, update on public.profiles to authenticated;
grant select on public.profiles to anon;
grant all on public.profiles to service_role;
grant select, insert, update, delete on public.courses to authenticated;
grant all on public.courses to service_role;
grant select, insert, update, delete on public.course_enrollments to authenticated;
grant all on public.course_enrollments to service_role;
grant select, insert, update, delete on public.coach_credentials to authenticated;
grant select on public.coach_credentials to anon;
grant all on public.coach_credentials to service_role;

create or replace function public.current_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

grant execute on function public.current_role() to authenticated;

drop policy if exists "profiles_select_own_or_coach" on public.profiles;
create policy "profiles_select_own_or_coach"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid() or public.current_role() = 'antrenor');

drop policy if exists "profiles_select_homepage_coaches" on public.profiles;
create policy "profiles_select_homepage_coaches"
  on public.profiles
  for select
  to anon, authenticated
  using (role = 'antrenor' and show_on_homepage = true);

drop policy if exists "profiles_update_athletes_by_coach" on public.profiles;
create policy "profiles_update_athletes_by_coach"
  on public.profiles
  for update
  to authenticated
  using (public.current_role() = 'antrenor' and role = 'sporcu')
  with check (public.current_role() = 'antrenor' and role = 'sporcu');

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Courses
drop policy if exists "courses_select_coach_or_enrolled" on public.courses;
create policy "courses_select_coach_or_enrolled"
  on public.courses
  for select
  to authenticated
  using (
    public.current_role() = 'antrenor'
    or exists (
      select 1 from public.course_enrollments e
      where e.course_id = id and e.athlete_id = auth.uid()
    )
  );

drop policy if exists "courses_insert_coach" on public.courses;
create policy "courses_insert_coach"
  on public.courses
  for insert
  to authenticated
  with check (public.current_role() = 'antrenor' and coach_id = auth.uid());

drop policy if exists "courses_update_own" on public.courses;
create policy "courses_update_own"
  on public.courses
  for update
  to authenticated
  using (public.current_role() = 'antrenor' and coach_id = auth.uid())
  with check (public.current_role() = 'antrenor' and coach_id = auth.uid());

drop policy if exists "courses_delete_own" on public.courses;
create policy "courses_delete_own"
  on public.courses
  for delete
  to authenticated
  using (public.current_role() = 'antrenor' and coach_id = auth.uid());

-- Enrollments
drop policy if exists "enrollments_select_coach_or_self" on public.course_enrollments;
create policy "enrollments_select_coach_or_self"
  on public.course_enrollments
  for select
  to authenticated
  using (public.current_role() = 'antrenor' or athlete_id = auth.uid());

drop policy if exists "enrollments_insert_coach" on public.course_enrollments;
create policy "enrollments_insert_coach"
  on public.course_enrollments
  for insert
  to authenticated
  with check (
    public.current_role() = 'antrenor'
    and exists (
      select 1 from public.courses c
      where c.id = course_id and c.coach_id = auth.uid()
    )
    and exists (
      select 1 from public.profiles p
      where p.id = athlete_id and p.role = 'sporcu'
    )
  );

drop policy if exists "enrollments_delete_coach" on public.course_enrollments;
create policy "enrollments_delete_coach"
  on public.course_enrollments
  for delete
  to authenticated
  using (
    public.current_role() = 'antrenor'
    and exists (
      select 1 from public.courses c
      where c.id = course_id and c.coach_id = auth.uid()
    )
  );

drop policy if exists "credentials_select_homepage" on public.coach_credentials;
create policy "credentials_select_homepage"
  on public.coach_credentials
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = coach_id
        and p.role = 'antrenor'
        and p.show_on_homepage = true
    )
  );

drop policy if exists "credentials_select_own_or_coach" on public.coach_credentials;
create policy "credentials_select_own_or_coach"
  on public.coach_credentials
  for select
  to authenticated
  using (coach_id = auth.uid() or public.current_role() = 'antrenor');

drop policy if exists "credentials_insert_own" on public.coach_credentials;
create policy "credentials_insert_own"
  on public.coach_credentials
  for insert
  to authenticated
  with check (coach_id = auth.uid() and public.current_role() = 'antrenor');

drop policy if exists "credentials_update_own" on public.coach_credentials;
create policy "credentials_update_own"
  on public.coach_credentials
  for update
  to authenticated
  using (coach_id = auth.uid() and public.current_role() = 'antrenor')
  with check (coach_id = auth.uid() and public.current_role() = 'antrenor');

drop policy if exists "credentials_delete_own" on public.coach_credentials;
create policy "credentials_delete_own"
  on public.coach_credentials
  for delete
  to authenticated
  using (coach_id = auth.uid() and public.current_role() = 'antrenor');

insert into storage.buckets (id, name, public)
values ('coach-avatars', 'coach-avatars', true)
on conflict (id) do update set public = true;

drop policy if exists "coach_avatars_public_read" on storage.objects;
create policy "coach_avatars_public_read"
  on storage.objects
  for select
  to public
  using (bucket_id = 'coach-avatars');

drop policy if exists "coach_avatars_insert_own" on storage.objects;
create policy "coach_avatars_insert_own"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'coach-avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "coach_avatars_update_own" on storage.objects;
create policy "coach_avatars_update_own"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'coach-avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'coach-avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "coach_avatars_delete_own" on storage.objects;
create policy "coach_avatars_delete_own"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'coach-avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
