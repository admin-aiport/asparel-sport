"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { updateCoachProfileAction } from "@/app/panel/actions";
import { getBranchBySlug } from "@/data/branches";
import {
  coachLevels,
  planBranches,
  type CoachCredential,
  type CoachLevel,
  type PlanBranch,
  type Profile,
} from "@/lib/member";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function CoachProfileForm({
  profile,
  credentials,
}: {
  profile: Profile;
  credentials: CoachCredential[];
}) {
  const initialLevels = useMemo(() => {
    const map: Record<PlanBranch, CoachLevel | ""> = {
      basketbol: "",
      voleybol: "",
      jimnastik: "",
      yuzme: "",
    };
    for (const row of credentials) {
      map[row.branch] = row.level;
    }
    return map;
  }, [credentials]);

  const [preview, setPreview] = useState(profile.avatar_url || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function uploadAvatar(file: File) {
    if (!file.type.startsWith("image/")) {
      throw new Error("Yalnız görsel dosyası yükleyin.");
    }
    if (file.size > 3 * 1024 * 1024) {
      throw new Error("Görsel en fazla 3 MB olabilir.");
    }

    const supabase = createBrowserSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Oturum bulunamadı. Tekrar giriş yapın.");
    }

    const rawExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const ext = rawExt === "jpeg" ? "jpg" : rawExt.replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage.from("coach-avatars").upload(path, file, {
      contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
      upsert: true,
    });

    if (uploadError) {
      throw new Error(
        uploadError.message.includes("Bucket not found")
          ? "Storage bucket yok. Supabase’te schema.sql (coach-avatars) çalıştırın."
          : `Fotoğraf yüklenemedi: ${uploadError.message}`,
      );
    }

    const { data } = supabase.storage.from("coach-avatars").getPublicUrl(path);
    return `${data.publicUrl}?v=${Date.now()}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setNotice(null);

    try {
      const formData = new FormData(event.currentTarget);

      if (avatarFile) {
        const url = await uploadAvatar(avatarFile);
        formData.set("avatar_url", url);
        setPreview(url);
        setAvatarFile(null);
      } else if (profile.avatar_url) {
        formData.set("avatar_url", profile.avatar_url);
      }

      formData.delete("avatar");

      const result = await updateCoachProfileAction(formData);
      if (result && "error" in result && result.error) {
        setError(result.error);
        return;
      }
      setNotice("Profil kaydedildi.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt başarısız.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="rounded-3xl border border-outline-variant/35 bg-white p-4 shadow-[0_20px_50px_rgba(11,29,66,0.06)] sm:p-5 md:p-7"
    >
      <h2 className="font-display text-xl font-bold text-navy">Profilim</h2>
      <p className="mt-1 text-sm text-muted">
        Ad, fotoğraf ve belge seviyelerinizi düzenleyin. Anasayfada göstermek için anahtarı açın.
      </p>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-outline-variant/40 bg-surface-low">
            {preview ? (
              <Image src={preview} alt="" fill className="object-cover" sizes="112px" unoptimized />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
                Foto
              </div>
            )}
          </div>
          <label className="cursor-pointer text-sm font-semibold text-arel">
            Fotoğraf seç
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setAvatarFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <label className="block text-sm font-semibold text-navy">
            Ad soyad
            <input
              name="full_name"
              required
              defaultValue={profile.full_name}
              className="field-input mt-2"
            />
          </label>

          <label className="flex items-center gap-3 text-sm font-semibold text-navy">
            <input
              type="checkbox"
              name="show_on_homepage"
              defaultChecked={Boolean(profile.show_on_homepage)}
              className="h-4 w-4 rounded border-outline-variant"
            />
            Anasayfada göster
          </label>

          <div>
            <p className="text-sm font-semibold text-navy">Branş belge seviyeleri</p>
            <p className="mt-1 text-xs text-muted">Boş bırakılan branş kaydedilmez.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {planBranches.map((branch) => (
                <label key={branch} className="block text-sm font-medium text-navy">
                  {getBranchBySlug(branch)?.name ?? branch}
                  <select
                    name={`level_${branch}`}
                    defaultValue={initialLevels[branch]}
                    className="field-input mt-2"
                  >
                    <option value="">Seçilmedi</option>
                    {coachLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-error">{error}</p> : null}
      {notice ? <p className="mt-4 text-sm font-medium text-navy">{notice}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="cta-lift mt-6 min-h-11 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Kaydediliyor…" : "Profili kaydet"}
      </button>
    </form>
  );
}
