"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth";
import { isPlanBranch } from "@/lib/member";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function asString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function requireCoach() {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "antrenor") {
    return { error: "Yalnız antrenörler bu işlemi yapabilir." as const };
  }
  return { profile };
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function createAthleteAction(formData: FormData) {
  const gate = await requireCoach();
  if ("error" in gate) return gate;

  const fullName = asString(formData, "full_name");
  const email = asString(formData, "email").toLowerCase();
  const password = asString(formData, "password");

  if (!fullName || !isEmail(email) || password.length < 6) {
    return { error: "Ad, geçerli e-posta ve en az 6 karakter şifre gerekli." };
  }

  let admin;
  try {
    admin = createAdminSupabaseClient();
  } catch {
    return { error: "Sporcu eklemek için sunucu anahtarı (SUPABASE_SERVICE_ROLE_KEY) gerekli." };
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    if (error?.message.toLowerCase().includes("already")) {
      return { error: "Bu e-posta zaten kayıtlı." };
    }
    return { error: "Sporcu hesabı oluşturulamadı." };
  }

  const { error: profileError } = await admin.from("profiles").insert({
    id: data.user.id,
    full_name: fullName,
    email,
    role: "sporcu",
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(data.user.id);
    return { error: "Sporcu profili kaydedilemedi." };
  }

  revalidatePath("/panel");
  return { ok: true as const, email };
}

export async function updateAthleteAction(formData: FormData) {
  const gate = await requireCoach();
  if ("error" in gate) return gate;

  const id = asString(formData, "id");
  const fullName = asString(formData, "full_name");
  const email = asString(formData, "email").toLowerCase();

  if (!id || !fullName || !isEmail(email)) {
    return { error: "Ad ve geçerli e-posta gerekli." };
  }

  let admin;
  try {
    admin = createAdminSupabaseClient();
  } catch {
    return { error: "Düzenleme için sunucu anahtarı gerekli." };
  }

  const { data: existing } = await admin
    .from("profiles")
    .select("id, role, email")
    .eq("id", id)
    .maybeSingle();

  if (!existing || existing.role !== "sporcu") {
    return { error: "Sporcu bulunamadı." };
  }

  const { error: profileError } = await admin
    .from("profiles")
    .update({ full_name: fullName, email })
    .eq("id", id)
    .eq("role", "sporcu");

  if (profileError) return { error: "Sporcu güncellenemedi." };

  if (existing.email !== email) {
    const { error: authError } = await admin.auth.admin.updateUserById(id, { email });
    if (authError) return { error: "E-posta güncellenemedi." };
  }

  revalidatePath("/panel");
  return { ok: true as const };
}

export async function deleteAthleteAction(formData: FormData) {
  const gate = await requireCoach();
  if ("error" in gate) return gate;

  const id = asString(formData, "id");
  if (!id) return { error: "Sporcu bulunamadı." };
  if (id === gate.profile.id) return { error: "Kendi hesabınızı silemezsiniz." };

  let admin;
  try {
    admin = createAdminSupabaseClient();
  } catch {
    return { error: "Silmek için sunucu anahtarı gerekli." };
  }

  const { data: existing } = await admin.from("profiles").select("id, role").eq("id", id).maybeSingle();
  if (!existing || existing.role !== "sporcu") {
    return { error: "Yalnız sporcu hesapları silinebilir." };
  }

  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) return { error: "Sporcu silinemedi." };

  revalidatePath("/panel");
  return { ok: true as const };
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
