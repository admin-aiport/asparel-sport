"use client";

import { getBranchBySlug } from "@/data/branches";
import { planBranches, weekdays, type Profile, type TrainingPlan } from "@/lib/member";
import {
  createAthleteAction,
  createPlanAction,
  deleteAthleteAction,
  deletePlanAction,
  updateAthleteAction,
  updatePlanAction,
} from "@/app/panel/actions";
import { FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";

function branchLabel(slug: string) {
  return getBranchBySlug(slug)?.name ?? slug;
}

export function CoachPlanBoard({
  coachId,
  athletes,
  plans,
  adminConfigured,
}: {
  coachId: string;
  athletes: Profile[];
  plans: TrainingPlan[];
  adminConfigured: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>(athletes[0]?.id ?? "");
  const [editingAthleteId, setEditingAthleteId] = useState<string | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId && athletes.some((athlete) => athlete.id === selectedId)) return;
    setSelectedId(athletes[0]?.id ?? "");
  }, [athletes, selectedId]);

  const selected = athletes.find((athlete) => athlete.id === selectedId);
  const visiblePlans = useMemo(
    () => (selectedId ? plans.filter((plan) => plan.athlete_id === selectedId) : []),
    [plans, selectedId],
  );

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
    if (!window.confirm(`${name || "Bu sporcu"} silinsin mi? Planları da kalkar.`)) return;
    setError(null);
    const formData = new FormData();
    formData.set("id", id);
    const result = await deleteAthleteAction(formData);
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    if (selectedId === id) setSelectedId("");
  }

  async function handleCreatePlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const result = await createPlanAction(new FormData(form));
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    form.reset();
  }

  async function handleUpdatePlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const result = await updatePlanAction(new FormData(event.currentTarget));
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    setEditingPlanId(null);
  }

  async function handleDeletePlan(id: string) {
    setError(null);
    const formData = new FormData();
    formData.set("id", id);
    const result = await deletePlanAction(formData);
    if (result && "error" in result && result.error) {
      setError(result.error);
    }
  }

  return (
    <div className="space-y-8">
      {error ? <p className="text-sm font-medium text-error">{error}</p> : null}
      {notice ? <p className="text-sm font-medium text-navy">{notice}</p> : null}

      <section className="rounded-3xl border border-outline-variant/35 bg-white p-4 shadow-[0_20px_50px_rgba(11,29,66,0.06)] sm:p-5 md:p-7">
        <h2 className="font-display text-xl font-bold text-navy">Sporcular</h2>
        <p className="mt-1 text-sm text-muted">Ekleyin, seçin, düzenleyin veya silin. Planlar seçilen sporcuya yazılır.</p>

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
              const active = athlete.id === selectedId;
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
                <li key={athlete.id}>
                  <div
                    className={`flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
                      active ? "border-navy bg-surface-low" : "border-outline-variant/40 bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(athlete.id)}
                      className="min-w-0 text-left"
                    >
                      <p className="font-semibold text-navy">{athlete.full_name || "Sporcu"}</p>
                      <p className="truncate text-sm text-muted">{athlete.email || "E-posta yok"}</p>
                    </button>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedId(athlete.id)}
                        className="min-h-11 rounded-full border border-outline-variant/50 px-4 py-2 text-sm font-semibold text-navy"
                      >
                        Seç
                      </button>
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
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </section>

      <form
        onSubmit={(event) => void handleCreatePlan(event)}
        className="rounded-3xl border border-outline-variant/35 bg-white p-4 shadow-[0_20px_50px_rgba(11,29,66,0.06)] sm:p-5 md:p-7"
      >
        <h2 className="font-display text-xl font-bold text-navy">Yeni plan</h2>
        <p className="mt-1 text-sm text-muted">
          {selected ? `${selected.full_name} için plan yazın.` : "Önce yukarıdan bir sporcu seçin."}
        </p>
        <input type="hidden" name="athlete_id" value={selectedId} />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field label="Başlık">
            <input name="title" required placeholder="Teknik antrenman" className="field-input" disabled={!selectedId} />
          </Field>
          <Field label="Branş">
            <select name="branch" required className="field-input" defaultValue="basketbol" disabled={!selectedId}>
              {planBranches.map((slug) => (
                <option key={slug} value={slug}>
                  {branchLabel(slug)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Gün">
            <select name="weekday" required className="field-input" defaultValue={weekdays[0]} disabled={!selectedId}>
              {weekdays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notlar">
              <textarea name="notes" rows={3} className="field-input" placeholder="Isınma, setler, odak…" disabled={!selectedId} />
            </Field>
          </div>
        </div>
        <button
          type="submit"
          disabled={!selectedId}
          className="cta-lift mt-5 min-h-11 w-full rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
        >
          Planı kaydet
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="font-display text-xl font-bold text-navy">
          {selected ? `${selected.full_name} — planlar` : "Planlar"}
        </h2>
        {!selectedId ? (
          <p className="rounded-2xl bg-white px-4 py-6 text-sm text-muted">Planları görmek için bir sporcu seçin.</p>
        ) : visiblePlans.length === 0 ? (
          <p className="rounded-2xl bg-white px-4 py-6 text-sm text-muted">Bu sporcuya kayıtlı plan yok.</p>
        ) : (
          visiblePlans.map((plan) => {
            if (editingPlanId === plan.id && plan.coach_id === coachId) {
              return (
                <form
                  key={plan.id}
                  onSubmit={(event) => void handleUpdatePlan(event)}
                  className="rounded-3xl border border-outline-variant/35 bg-white p-5"
                >
                  <input type="hidden" name="id" value={plan.id} />
                  <input type="hidden" name="athlete_id" value={plan.athlete_id} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Başlık">
                      <input name="title" required className="field-input" defaultValue={plan.title} />
                    </Field>
                    <Field label="Branş">
                      <select name="branch" required className="field-input" defaultValue={plan.branch}>
                        {planBranches.map((slug) => (
                          <option key={slug} value={slug}>
                            {branchLabel(slug)}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Gün">
                      <select name="weekday" required className="field-input" defaultValue={plan.weekday}>
                        {weekdays.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Notlar">
                        <textarea name="notes" rows={3} className="field-input" defaultValue={plan.notes} />
                      </Field>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="submit" className="min-h-11 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white">
                      Kaydet
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingPlanId(null)}
                      className="min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold text-muted"
                    >
                      Vazgeç
                    </button>
                  </div>
                </form>
              );
            }

            return (
              <article key={plan.id} className="rounded-3xl border border-outline-variant/35 bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-asp">
                  {branchLabel(plan.branch)} · {plan.weekday}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-navy">{plan.title}</h3>
                {plan.notes ? <p className="mt-2 text-sm leading-relaxed text-muted">{plan.notes}</p> : null}
                {plan.coach_id === coachId ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingPlanId(plan.id)}
                      className="min-h-11 rounded-full border border-outline-variant/50 px-4 py-2.5 text-sm font-semibold text-navy"
                    >
                      Düzenle
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDeletePlan(plan.id)}
                      className="min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold text-error"
                    >
                      Sil
                    </button>
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </div>
    </div>
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
