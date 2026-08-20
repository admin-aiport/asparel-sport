import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { signOutAction } from "@/app/panel/actions";
import { CoachPlanBoard } from "@/components/CoachPlanBoard";
import { getBranchBySlug } from "@/data/branches";
import { getCurrentProfile, getSessionUser } from "@/lib/auth";
import { isMemberRole, isPlanBranch, type Profile, type TrainingPlan } from "@/lib/member";
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
            <button type="submit" className="min-h-11 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white">
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
    const [{ data: athletes }, { data: plans }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, email, role").eq("role", "sporcu").order("full_name"),
      supabase.from("plans").select("id, athlete_id, coach_id, title, branch, weekday, notes, created_at").order("created_at", { ascending: false }),
    ]);

    return (
      <PanelShell profile={profile}>
        <CoachPlanBoard
          coachId={profile.id}
          athletes={asProfiles(athletes)}
          plans={asPlans(plans)}
          adminConfigured={isAdminConfigured()}
        />
      </PanelShell>
    );
  }

  const { data: plans } = await supabase
    .from("plans")
    .select("id, athlete_id, coach_id, title, branch, weekday, notes, created_at")
    .eq("athlete_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <PanelShell profile={profile}>
      <AthletePlanList plans={asPlans(plans)} />
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
                ? "Sporcuları yönetin; seçilen sporcuya plan yazın."
                : "Antrenman planlarınız aşağıda."}
            </p>
          </div>
          <form action={signOutAction}>
            <button type="submit" className="min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold text-muted hover:text-navy">
              Çıkış
            </button>
          </form>
        </div>
        {children}
      </div>
    </section>
  );
}

function AthletePlanList({ plans }: { plans: TrainingPlan[] }) {
  if (plans.length === 0) {
    return (
      <p className="rounded-3xl border border-outline-variant/35 bg-white px-5 py-8 text-sm text-muted">
        Henüz antrenman planınız yok. Antrenörünüz eklediğinde burada görünür.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {plans.map((plan) => (
        <article key={plan.id} className="rounded-3xl border border-outline-variant/35 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-asp">
            {getBranchBySlug(plan.branch)?.name ?? plan.branch} · {plan.weekday}
          </p>
          <h2 className="mt-1 font-display text-lg font-bold text-navy">{plan.title}</h2>
          {plan.notes ? <p className="mt-2 text-sm leading-relaxed text-muted">{plan.notes}</p> : null}
        </article>
      ))}
    </div>
  );
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

function asPlans(rows: unknown): TrainingPlan[] {
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const item = row as Record<string, unknown>;
    if (
      typeof item.id !== "string" ||
      typeof item.athlete_id !== "string" ||
      typeof item.coach_id !== "string" ||
      typeof item.title !== "string" ||
      typeof item.branch !== "string" ||
      typeof item.weekday !== "string" ||
      typeof item.notes !== "string" ||
      typeof item.created_at !== "string" ||
      !isPlanBranch(item.branch)
    ) {
      return [];
    }
    return [
      {
        id: item.id,
        athlete_id: item.athlete_id,
        coach_id: item.coach_id,
        title: item.title,
        branch: item.branch,
        weekday: item.weekday,
        notes: item.notes,
        created_at: item.created_at,
      },
    ];
  });
}
