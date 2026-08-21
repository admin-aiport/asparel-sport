import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { signOutAction } from "@/app/panel/actions";
import { AthleteManager } from "@/components/AthleteManager";
import { CoachProfileForm } from "@/components/CoachProfileForm";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { getCurrentProfile, getSessionUser } from "@/lib/auth";
import {
  isCoachLevel,
  isCourseKind,
  isMemberRole,
  isPlanBranch,
  isWeekday,
  type CoachCredential,
  type Course,
  type Profile,
} from "@/lib/member";
import { isAdminConfigured } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Üye paneli",
  robots: { index: false, follow: false },
};

export default async function PanelPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/giris");
  }

  const profile = await getCurrentProfile();
  if (!profile) {
    return (
      <section className="pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="page-shell">
          <div className="rounded-3xl border border-outline-variant/35 bg-white p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-navy">Profil eksik</h1>
            <p className="mt-2 text-sm text-muted">
              Giriş yapıldı ancak üye kaydı henüz tamamlanmamış. Kulüple iletişime geçin.
            </p>
            <form action={signOutAction} className="mt-6">
              <button
                type="submit"
                className="min-h-11 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white"
              >
                Çıkış
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  const supabase = await createServerSupabaseClient();

  if (profile.role === "antrenor") {
    const [{ data: athletes }, { data: courses }, { data: enrollments }, { data: credentials }, { data: coaches }] =
      await Promise.all([
        supabase.from("profiles").select("id, full_name, email, role").eq("role", "sporcu").order("full_name"),
        supabase
          .from("courses")
          .select("id, coach_id, title, branch, weekday, start_time, end_time, kind, notes")
          .order("start_time"),
        supabase.from("course_enrollments").select("course_id, athlete_id"),
        supabase.from("coach_credentials").select("id, coach_id, branch, level").eq("coach_id", profile.id),
        supabase.from("profiles").select("id, full_name, role").eq("role", "antrenor").order("full_name"),
      ]);

    const athleteList = asProfiles(athletes);
    const coachList = asProfiles(coaches);
    const courseList = asCourses(courses, enrollments, coachList);

    return (
      <PanelShell profile={profile}>
        <div className="space-y-8">
          <CoachProfileForm profile={profile} credentials={asCredentials(credentials, profile.id)} />
          <AthleteManager athletes={athleteList} adminConfigured={isAdminConfigured()} />
          <WeeklySchedule
            mode="antrenor"
            courses={courseList}
            athletes={athleteList}
            coaches={coachList}
            currentUserId={profile.id}
          />
        </div>
      </PanelShell>
    );
  }

  const [{ data: courses }, { data: enrollments }, { data: coaches }] = await Promise.all([
    supabase
      .from("courses")
      .select("id, coach_id, title, branch, weekday, start_time, end_time, kind, notes")
      .order("start_time"),
    supabase.from("course_enrollments").select("course_id, athlete_id").eq("athlete_id", profile.id),
    supabase.from("profiles").select("id, full_name, role").eq("role", "antrenor"),
  ]);

  const enrolledIds = new Set((enrollments ?? []).map((row) => row.course_id));
  const coachList = asProfiles(coaches);
  const myCourses = asCourses(
    (courses ?? []).filter((c) => enrolledIds.has(c.id)),
    enrollments,
    coachList,
  );

  return (
    <PanelShell profile={profile}>
      <WeeklySchedule
        mode="sporcu"
        courses={myCourses}
        athletes={[]}
        coaches={coachList}
        currentUserId={profile.id}
      />
    </PanelShell>
  );
}

function PanelShell({ profile, children }: { profile: Profile; children: ReactNode }) {
  const roleLabel = profile.role === "antrenor" ? "Antrenör" : "Sporcu";

  return (
    <section className="pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="page-shell min-w-0">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-asp">{roleLabel}</p>
            <h1 className="mt-2 break-words font-display text-2xl font-bold text-navy sm:text-3xl">
              {profile.full_name || "Üye paneli"}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {profile.role === "antrenor"
                ? "Profil, sporcular ve haftalık kurs takvimi."
                : "Kayıtlı olduğunuz haftalık kurslar."}
            </p>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold text-muted hover:text-navy"
            >
              Çıkış
            </button>
          </form>
        </div>
        {children}
      </div>
    </section>
  );
}

function asCredentials(rows: unknown, coachId: string): CoachCredential[] {
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const item = row as Record<string, unknown>;
    if (
      typeof item.branch !== "string" ||
      typeof item.level !== "string" ||
      !isPlanBranch(item.branch) ||
      !isCoachLevel(item.level)
    ) {
      return [];
    }
    return [
      {
        id: typeof item.id === "string" ? item.id : undefined,
        coach_id: typeof item.coach_id === "string" ? item.coach_id : coachId,
        branch: item.branch,
        level: item.level,
      },
    ];
  });
}

function asProfiles(rows: unknown): Profile[] {
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const item = row as { id?: unknown; full_name?: unknown; role?: unknown; email?: unknown };
    if (typeof item.id !== "string" || typeof item.full_name !== "string" || typeof item.role !== "string") {
      return [];
    }
    if (!isMemberRole(item.role)) return [];
    return [
      {
        id: item.id,
        full_name: item.full_name,
        role: item.role,
        email: typeof item.email === "string" ? item.email : "",
      },
    ];
  });
}

function asCourses(
  courses: unknown,
  enrollments: unknown,
  coaches: Profile[],
): Course[] {
  if (!Array.isArray(courses)) return [];
  const coachName = new Map(coaches.map((c) => [c.id, c.full_name]));
  const byCourse = new Map<string, string[]>();
  if (Array.isArray(enrollments)) {
    for (const row of enrollments) {
      if (!row || typeof row !== "object") continue;
      const item = row as { course_id?: unknown; athlete_id?: unknown };
      if (typeof item.course_id !== "string" || typeof item.athlete_id !== "string") continue;
      const list = byCourse.get(item.course_id) ?? [];
      list.push(item.athlete_id);
      byCourse.set(item.course_id, list);
    }
  }

  return courses.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const item = row as Record<string, unknown>;
    if (
      typeof item.id !== "string" ||
      typeof item.coach_id !== "string" ||
      typeof item.title !== "string" ||
      typeof item.branch !== "string" ||
      typeof item.weekday !== "string" ||
      typeof item.start_time !== "string" ||
      typeof item.end_time !== "string" ||
      typeof item.kind !== "string" ||
      typeof item.notes !== "string" ||
      !isPlanBranch(item.branch) ||
      !isWeekday(item.weekday) ||
      !isCourseKind(item.kind)
    ) {
      return [];
    }
    return [
      {
        id: item.id,
        coach_id: item.coach_id,
        title: item.title,
        branch: item.branch,
        weekday: item.weekday,
        start_time: item.start_time,
        end_time: item.end_time,
        kind: item.kind,
        notes: item.notes,
        coach_name: coachName.get(item.coach_id),
        athlete_ids: byCourse.get(item.id) ?? [],
      },
    ];
  });
}
