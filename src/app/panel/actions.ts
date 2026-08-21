"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth";
import {
  isCoachLevel,
  isCourseKind,
  isPlanBranch,
  isWeekday,
  planBranches,
  type CoachLevel,
  type PlanBranch,
} from "@/lib/member";
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
    const detail = profileError.message.toLowerCase();
    if (detail.includes("email") || detail.includes("column") || profileError.code === "PGRST204") {
      return {
        error:
          "profiles.email kolonu eksik. Supabase SQL Editor’da supabase/schema.sql dosyasını yeniden çalıştırın.",
      };
    }
    if (detail.includes("duplicate") || profileError.code === "23505") {
      return { error: "Bu sporcu profili zaten var." };
    }
    return { error: `Sporcu profili kaydedilemedi: ${profileError.message}` };
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

export async function updateCoachProfileAction(formData: FormData) {
  const gate = await requireCoach();
  if ("error" in gate) return gate;

  const fullName = asString(formData, "full_name");
  const showOnHomepage = formData.get("show_on_homepage") === "on";

  if (!fullName) {
    return { error: "Ad soyad zorunlu." };
  }

  const desired: Array<{ branch: PlanBranch; level: CoachLevel }> = [];
  for (const branch of planBranches) {
    const raw = asString(formData, `level_${branch}`);
    if (!raw) continue;
    if (!isCoachLevel(raw)) {
      return { error: "Geçersiz belge seviyesi." };
    }
    desired.push({ branch, level: raw });
  }

  const supabase = await createServerSupabaseClient();
  const submittedAvatarUrl = asString(formData, "avatar_url");
  const avatarUrl = submittedAvatarUrl || gate.profile.avatar_url || "";

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      show_on_homepage: showOnHomepage,
      avatar_url: avatarUrl,
    })
    .eq("id", gate.profile.id)
    .eq("role", "antrenor");

  if (profileError) {
    return { error: `Profil kaydedilemedi: ${profileError.message}` };
  }

  const { data: existingRows } = await supabase
    .from("coach_credentials")
    .select("id, branch, level")
    .eq("coach_id", gate.profile.id);

  const existing = existingRows ?? [];
  const desiredBranches = new Set(desired.map((d) => d.branch));

  for (const row of existing) {
    if (!isPlanBranch(row.branch)) continue;
    if (!desiredBranches.has(row.branch)) {
      await supabase.from("coach_credentials").delete().eq("id", row.id);
    }
  }

  for (const item of desired) {
    const current = existing.find((row) => row.branch === item.branch);
    if (current) {
      if (current.level !== item.level) {
        const { error } = await supabase
          .from("coach_credentials")
          .update({ level: item.level })
          .eq("id", current.id);
        if (error) return { error: "Belge seviyesi güncellenemedi." };
      }
    } else {
      const { error } = await supabase.from("coach_credentials").insert({
        coach_id: gate.profile.id,
        branch: item.branch,
        level: item.level,
      });
      if (error) return { error: `Belge kaydedilemedi: ${error.message}` };
    }
  }

  revalidatePath("/panel");
  revalidatePath("/");
  return { ok: true as const };
}

function parseAthleteIds(formData: FormData) {
  return formData
    .getAll("athlete_ids")
    .flatMap((value) => (typeof value === "string" && value.trim() ? [value.trim()] : []));
}

function normalizeTime(value: string) {
  if (/^\d{2}:\d{2}$/.test(value)) return `${value}:00`;
  if (/^\d{2}:\d{2}:\d{2}$/.test(value)) return value;
  return "";
}

export async function createCourseAction(formData: FormData) {
  const gate = await requireCoach();
  if ("error" in gate) return gate;

  const title = asString(formData, "title");
  const branch = asString(formData, "branch");
  const weekday = asString(formData, "weekday");
  const startTime = normalizeTime(asString(formData, "start_time"));
  const endTime = normalizeTime(asString(formData, "end_time"));
  const kind = asString(formData, "kind");
  const notes = asString(formData, "notes");
  const athleteIds = parseAthleteIds(formData);

  if (!title || !isPlanBranch(branch) || !isWeekday(weekday) || !startTime || !endTime || !isCourseKind(kind)) {
    return { error: "Başlık, branş, gün, saat ve kurs türü zorunlu." };
  }
  if (endTime <= startTime) {
    return { error: "Bitiş saati başlangıçtan sonra olmalı." };
  }
  if (kind === "bireysel" && athleteIds.length !== 1) {
    return { error: "Bireysel kurs için bir sporcu seçin." };
  }
  if (kind === "grup" && athleteIds.length < 1) {
    return { error: "Grup kursuna en az bir sporcu ekleyin." };
  }

  const supabase = await createServerSupabaseClient();
  const { data: course, error } = await supabase
    .from("courses")
    .insert({
      coach_id: gate.profile.id,
      title,
      branch,
      weekday,
      start_time: startTime,
      end_time: endTime,
      kind,
      notes,
    })
    .select("id")
    .single();

  if (error || !course) {
    return { error: `Kurs kaydedilemedi: ${error?.message ?? ""}` };
  }

  const { error: enrollError } = await supabase.from("course_enrollments").insert(
    athleteIds.map((athlete_id) => ({ course_id: course.id, athlete_id })),
  );

  if (enrollError) {
    await supabase.from("courses").delete().eq("id", course.id);
    return { error: "Sporcular kursa eklenemedi." };
  }

  revalidatePath("/panel");
  return { ok: true as const };
}

export async function updateCourseAction(formData: FormData) {
  const gate = await requireCoach();
  if ("error" in gate) return gate;

  const id = asString(formData, "id");
  const title = asString(formData, "title");
  const branch = asString(formData, "branch");
  const weekday = asString(formData, "weekday");
  const startTime = normalizeTime(asString(formData, "start_time"));
  const endTime = normalizeTime(asString(formData, "end_time"));
  const kind = asString(formData, "kind");
  const notes = asString(formData, "notes");
  const athleteIds = parseAthleteIds(formData);

  if (
    !id ||
    !title ||
    !isPlanBranch(branch) ||
    !isWeekday(weekday) ||
    !startTime ||
    !endTime ||
    !isCourseKind(kind)
  ) {
    return { error: "Eksik veya geçersiz alanlar var." };
  }
  if (endTime <= startTime) {
    return { error: "Bitiş saati başlangıçtan sonra olmalı." };
  }
  if (kind === "bireysel" && athleteIds.length !== 1) {
    return { error: "Bireysel kurs için bir sporcu seçin." };
  }
  if (kind === "grup" && athleteIds.length < 1) {
    return { error: "Grup kursuna en az bir sporcu ekleyin." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("courses")
    .update({
      title,
      branch,
      weekday,
      start_time: startTime,
      end_time: endTime,
      kind,
      notes,
    })
    .eq("id", id)
    .eq("coach_id", gate.profile.id);

  if (error) return { error: "Kurs güncellenemedi." };

  const { data: existing } = await supabase
    .from("course_enrollments")
    .select("athlete_id")
    .eq("course_id", id);

  const current = new Set((existing ?? []).map((row) => row.athlete_id));
  const desired = new Set(athleteIds);

  const toRemove = [...current].filter((athleteId) => !desired.has(athleteId));
  const toAdd = [...desired].filter((athleteId) => !current.has(athleteId));

  if (toRemove.length) {
    await supabase.from("course_enrollments").delete().eq("course_id", id).in("athlete_id", toRemove);
  }
  if (toAdd.length) {
    const { error: enrollError } = await supabase
      .from("course_enrollments")
      .insert(toAdd.map((athlete_id) => ({ course_id: id, athlete_id })));
    if (enrollError) return { error: "Sporcu listesi güncellenemedi." };
  }

  revalidatePath("/panel");
  return { ok: true as const };
}

export async function deleteCourseAction(formData: FormData) {
  const gate = await requireCoach();
  if ("error" in gate) return gate;

  const id = asString(formData, "id");
  if (!id) return { error: "Kurs bulunamadı." };

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("courses").delete().eq("id", id).eq("coach_id", gate.profile.id);

  if (error) return { error: "Kurs silinemedi." };

  revalidatePath("/panel");
  return { ok: true as const };
}
