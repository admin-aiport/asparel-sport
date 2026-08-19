"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth";
import { isPlanBranch } from "@/lib/member";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function asString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function createPlanAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "antrenor") {
    return { error: "Yalnız antrenörler plan ekleyebilir." };
  }

  const title = asString(formData, "title");
  const athleteId = asString(formData, "athlete_id");
  const branch = asString(formData, "branch");
  const weekday = asString(formData, "weekday");
  const notes = asString(formData, "notes");

  if (!title || !athleteId || !isPlanBranch(branch) || !weekday) {
    return { error: "Başlık, sporcu, branş ve gün zorunlu." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("plans").insert({
    title,
    athlete_id: athleteId,
    coach_id: profile.id,
    branch,
    weekday,
    notes,
  });

  if (error) return { error: "Plan kaydedilemedi." };

  revalidatePath("/panel");
  return { ok: true as const };
}

export async function updatePlanAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "antrenor") {
    return { error: "Yalnız antrenörler plan düzenleyebilir." };
  }

  const id = asString(formData, "id");
  const title = asString(formData, "title");
  const athleteId = asString(formData, "athlete_id");
  const branch = asString(formData, "branch");
  const weekday = asString(formData, "weekday");
  const notes = asString(formData, "notes");

  if (!id || !title || !athleteId || !isPlanBranch(branch) || !weekday) {
    return { error: "Eksik alanlar var." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("plans")
    .update({ title, athlete_id: athleteId, branch, weekday, notes })
    .eq("id", id)
    .eq("coach_id", profile.id);

  if (error) return { error: "Plan güncellenemedi." };

  revalidatePath("/panel");
  return { ok: true as const };
}

export async function deletePlanAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "antrenor") {
    return { error: "Yalnız antrenörler plan silebilir." };
  }

  const id = asString(formData, "id");
  if (!id) return { error: "Plan bulunamadı." };

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("plans").delete().eq("id", id).eq("coach_id", profile.id);

  if (error) return { error: "Plan silinemedi." };

  revalidatePath("/panel");
  return { ok: true as const };
}
