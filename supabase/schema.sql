-- Asparel üye alanı: profiles + plans
-- Supabase SQL Editor'da bir kez çalıştırın.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  role text not null check (role in ('sporcu', 'antrenor')),
  created_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles (id) on delete cascade,
  coach_id uuid not null references public.profiles (id) on delete restrict,
  title text not null,
  branch text not null check (branch in ('basketbol', 'voleybol', 'jimnastik', 'yuzme')),
  weekday text not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists plans_athlete_id_idx on public.plans (athlete_id);
create index if not exists plans_coach_id_idx on public.plans (coach_id);

alter table public.profiles enable row level security;
alter table public.plans enable row level security;

grant select on public.profiles to authenticated;
grant select, insert, update, delete on public.plans to authenticated;

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

drop policy if exists "plans_select_athlete_or_coach" on public.plans;
create policy "plans_select_athlete_or_coach"
  on public.plans
  for select
  to authenticated
  using (athlete_id = auth.uid() or public.current_role() = 'antrenor');

drop policy if exists "plans_insert_coach" on public.plans;
create policy "plans_insert_coach"
  on public.plans
  for insert
  to authenticated
  with check (
    public.current_role() = 'antrenor'
    and coach_id = auth.uid()
    and exists (
      select 1 from public.profiles p
      where p.id = athlete_id and p.role = 'sporcu'
    )
  );

drop policy if exists "plans_update_own_coach" on public.plans;
create policy "plans_update_own_coach"
  on public.plans
  for update
  to authenticated
  using (public.current_role() = 'antrenor' and coach_id = auth.uid())
  with check (public.current_role() = 'antrenor' and coach_id = auth.uid());

drop policy if exists "plans_delete_own_coach" on public.plans;
create policy "plans_delete_own_coach"
  on public.plans
  for delete
  to authenticated
  using (public.current_role() = 'antrenor' and coach_id = auth.uid());
