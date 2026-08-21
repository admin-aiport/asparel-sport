"use client";

import { FormEvent, useState, type ReactNode } from "react";
import {
  createAthleteAction,
  deleteAthleteAction,
  updateAthleteAction,
} from "@/app/panel/actions";
import type { Profile } from "@/lib/member";

export function AthleteManager({
  athletes,
  adminConfigured,
}: {
  athletes: Profile[];
  adminConfigured: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [editingAthleteId, setEditingAthleteId] = useState<string | null>(null);

  async function handleCreateAthlete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    const form = event.currentTarget;
    const result = await createAthleteAction(new FormData(form));
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    if (result && "ok" in result && result.ok) {
      setNotice(`${result.email} bu şifre ile /giris üzerinden panele girebilir.`);
      form.reset();
    }
  }

  async function handleUpdateAthlete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const result = await updateAthleteAction(new FormData(event.currentTarget));
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    setEditingAthleteId(null);
  }

  async function handleDeleteAthlete(id: string, name: string) {
    if (!window.confirm(`${name || "Bu sporcu"} silinsin mi? Kurs kayıtları da kalkar.`)) return;
    setError(null);
    const formData = new FormData();
    formData.set("id", id);
    const result = await deleteAthleteAction(formData);
    if (result && "error" in result && result.error) {
      setError(result.error);
    }
  }

  return (
    <section className="rounded-3xl border border-outline-variant/35 bg-white p-4 shadow-[0_20px_50px_rgba(11,29,66,0.06)] sm:p-5 md:p-7">
      <h2 className="font-display text-xl font-bold text-navy">Sporcular</h2>
      <p className="mt-1 text-sm text-muted">Hesap ekleyin, düzenleyin veya silin. Kurslara buradan seçilirler.</p>

      {error ? <p className="mt-3 text-sm font-medium text-error">{error}</p> : null}
      {notice ? <p className="mt-3 text-sm font-medium text-navy">{notice}</p> : null}

      <form onSubmit={(event) => void handleCreateAthlete(event)} className="mt-5 grid gap-3 sm:grid-cols-2">
        <Field label="Ad soyad">
          <input name="full_name" required className="field-input" placeholder="Ayşe Yılmaz" disabled={!adminConfigured} />
        </Field>
        <Field label="E-posta">
          <input name="email" type="email" required className="field-input" placeholder="sporcu@email.com" disabled={!adminConfigured} />
        </Field>
        <Field label="Geçici şifre">
          <input name="password" type="text" required minLength={6} className="field-input" placeholder="En az 6 karakter" disabled={!adminConfigured} />
        </Field>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={!adminConfigured}
            className="cta-lift min-h-11 w-full rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            Sporcu ekle
          </button>
        </div>
      </form>
      {!adminConfigured ? (
        <p className="mt-3 text-sm text-muted">
          Sporcu eklemek için Vercel / `.env.local` içine `SUPABASE_SERVICE_ROLE_KEY` ekleyin.
        </p>
      ) : null}

      <ul className="mt-6 space-y-2">
        {athletes.length === 0 ? (
          <li className="rounded-2xl bg-surface-low px-4 py-5 text-sm text-muted">Henüz sporcu yok.</li>
        ) : (
          athletes.map((athlete) => {
            if (editingAthleteId === athlete.id) {
              return (
                <li key={athlete.id} className="rounded-2xl border border-outline-variant/40 p-4">
                  <form onSubmit={(event) => void handleUpdateAthlete(event)} className="grid gap-3 sm:grid-cols-2">
                    <input type="hidden" name="id" value={athlete.id} />
                    <Field label="Ad soyad">
                      <input name="full_name" required className="field-input" defaultValue={athlete.full_name} />
                    </Field>
                    <Field label="E-posta">
                      <input name="email" type="email" required className="field-input" defaultValue={athlete.email ?? ""} />
                    </Field>
                    <div className="flex flex-wrap gap-2 sm:col-span-2">
                      <button type="submit" className="min-h-11 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white">
                        Kaydet
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingAthleteId(null)}
                        className="min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold text-muted"
                      >
                        Vazgeç
                      </button>
                    </div>
                  </form>
                </li>
              );
            }

            return (
              <li
                key={athlete.id}
                className="flex flex-col gap-3 rounded-2xl border border-outline-variant/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-navy">{athlete.full_name || "Sporcu"}</p>
                  <p className="truncate text-sm text-muted">{athlete.email || "E-posta yok"}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingAthleteId(athlete.id)}
                    className="min-h-11 rounded-full px-4 py-2 text-sm font-semibold text-navy"
                  >
                    Düzenle
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDeleteAthlete(athlete.id, athlete.full_name)}
                    className="min-h-11 rounded-full px-4 py-2 text-sm font-semibold text-error"
                  >
                    Sil
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-navy">
      {label}
      <div className="mt-2 font-normal">{children}</div>
    </label>
  );
}
