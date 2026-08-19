"use client";

import { getBranchBySlug } from "@/data/branches";
import { planBranches, weekdays, type Profile, type TrainingPlan } from "@/lib/member";
import { createPlanAction, deletePlanAction, updatePlanAction } from "@/app/panel/actions";
import { FormEvent, useState, type ReactNode } from "react";

function branchLabel(slug: string) {
  return getBranchBySlug(slug)?.name ?? slug;
}

export function CoachPlanBoard({
  coachId,
  athletes,
  plans,
}: {
  coachId: string;
  athletes: Profile[];
  plans: TrainingPlan[];
}) {
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
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

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const result = await updatePlanAction(new FormData(event.currentTarget));
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    setEditingId(null);
  }

  async function handleDelete(id: string) {
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
      <form
        onSubmit={(event) => void handleCreate(event)}
        className="rounded-3xl border border-outline-variant/35 bg-white p-4 shadow-[0_20px_50px_rgba(11,29,66,0.06)] sm:p-5 md:p-7"
      >
        <h2 className="font-display text-xl font-bold text-navy">Yeni plan</h2>
        <p className="mt-1 text-sm text-muted">Sporcu seçin, antrenman planını yazın.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field label="Sporcu">
            <select
              name="athlete_id"
              required
              className="field-input"
              defaultValue=""
            >
              <option value="" disabled>
                Seçin
              </option>
              {athletes.map((athlete) => (
                <option key={athlete.id} value={athlete.id}>
                  {athlete.full_name || athlete.id}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Başlık">
            <input name="title" required placeholder="Teknik antrenman" className="field-input" />
          </Field>
          <Field label="Branş">
            <select name="branch" required className="field-input" defaultValue="basketbol">
              {planBranches.map((slug) => (
                <option key={slug} value={slug}>
                  {branchLabel(slug)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Gün">
            <select name="weekday" required className="field-input" defaultValue={weekdays[0]}>
              {weekdays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notlar">
              <textarea name="notes" rows={3} className="field-input" placeholder="Isınma, setler, odak…" />
            </Field>
          </div>
        </div>
        {error ? <p className="mt-3 text-sm font-medium text-error">{error}</p> : null}
        <button
          type="submit"
          disabled={athletes.length === 0}
          className="cta-lift mt-5 min-h-11 w-full rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
        >
          Planı kaydet
        </button>
        {athletes.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Henüz sporcu hesabı yok.</p>
        ) : null}
      </form>

      <div className="space-y-3">
        <h2 className="font-display text-xl font-bold text-navy">Planlar</h2>
        {plans.length === 0 ? (
          <p className="rounded-2xl bg-white px-4 py-6 text-sm text-muted">Kayıtlı plan yok.</p>
        ) : (
          plans.map((plan) => {
            const athleteName =
              athletes.find((athlete) => athlete.id === plan.athlete_id)?.full_name ?? "Sporcu";

            if (editingId === plan.id && plan.coach_id === coachId) {
              return (
                <form
                  key={plan.id}
                  onSubmit={(event) => void handleUpdate(event)}
                  className="rounded-3xl border border-outline-variant/35 bg-white p-5"
                >
                  <input type="hidden" name="id" value={plan.id} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Sporcu">
                      <select name="athlete_id" required className="field-input" defaultValue={plan.athlete_id}>
                        {athletes.map((athlete) => (
                          <option key={athlete.id} value={athlete.id}>
                            {athlete.full_name || athlete.id}
                          </option>
                        ))}
                      </select>
                    </Field>
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
                      onClick={() => setEditingId(null)}
                      className="min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold text-muted"
                    >
                      Vazgeç
                    </button>
                  </div>
                </form>
              );
            }

            return (
              <article
                key={plan.id}
                className="rounded-3xl border border-outline-variant/35 bg-white p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-asp">
                  {athleteName} · {branchLabel(plan.branch)} · {plan.weekday}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-navy">{plan.title}</h3>
                {plan.notes ? <p className="mt-2 text-sm leading-relaxed text-muted">{plan.notes}</p> : null}
                {plan.coach_id === coachId ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(plan.id)}
                      className="min-h-11 rounded-full border border-outline-variant/50 px-4 py-2.5 text-sm font-semibold text-navy"
                    >
                      Düzenle
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(plan.id)}
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
