import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  isCoachLevel,
  isPlanBranch,
  type CoachLevel,
  type HomepageCoach,
  type PlanBranch,
} from "@/lib/member";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function getHomepageCoaches(): Promise<HomepageCoach[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createServerSupabaseClient();
    const { data: coaches, error } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .eq("role", "antrenor")
      .eq("show_on_homepage", true)
      .order("full_name");

    if (error || !coaches?.length) return [];

    const ids = coaches.map((c) => c.id);
    const { data: credentials } = await supabase
      .from("coach_credentials")
      .select("coach_id, branch, level")
      .in("coach_id", ids);

    const byCoach = new Map<string, Array<{ branch: PlanBranch; level: CoachLevel }>>();
    for (const row of credentials ?? []) {
      if (!isPlanBranch(row.branch) || !isCoachLevel(row.level)) continue;
      const list = byCoach.get(row.coach_id) ?? [];
      list.push({ branch: row.branch, level: row.level });
      byCoach.set(row.coach_id, list);
    }

    return coaches.map((coach) => ({
      id: coach.id,
      full_name: coach.full_name || "Antrenör",
      avatar_url: typeof coach.avatar_url === "string" ? coach.avatar_url : "",
      credentials: byCoach.get(coach.id) ?? [],
    }));
  } catch {
    return [];
  }
}
