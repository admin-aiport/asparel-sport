"use client";

import { FormEvent, useMemo, useState, type ReactNode } from "react";
import { createCourseAction, deleteCourseAction, updateCourseAction } from "@/app/panel/actions";
import { getBranchBySlug } from "@/data/branches";
import {
  courseKinds,
  formatTimeLabel,
  planBranches,
  weekdays,
  type Course,
  type CourseKind,
  type Profile,
  type Weekday,
} from "@/lib/member";

function branchLabel(slug: string) {
  return getBranchBySlug(slug)?.name ?? slug;
}

function timeInputValue(value: string) {
  return formatTimeLabel(value);
}

export function WeeklySchedule({
  mode,
  courses,
  athletes,
  coaches,
  currentUserId,
}: {
  mode: "antrenor" | "sporcu";
  courses: Course[];
  athletes: Profile[];
  coaches: Profile[];
  currentUserId: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [kind, setKind] = useState<CourseKind>("grup");
  const coachNames = useMemo(() => {
    const map = new Map(coaches.map((c) => [c.id, c.full_name]));
    return map;
  }, [coaches]);

  const byDay = useMemo(() => {
    const map = Object.fromEntries(weekdays.map((day) => [day, [] as Course[]])) as Record<
      Weekday,
      Course[]
    >;
    for (const course of courses) {
      map[course.weekday]?.push(course);
    }
    for (const day of weekdays) {
      map[day].sort((a, b) => a.start_time.localeCompare(b.start_time));
    }
    return map;
  }, [courses]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const result = await createCourseAction(new FormData(form));
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    form.reset();
    setKind("grup");
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const result = await updateCourseAction(new FormData(event.currentTarget));
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    setEditingId(null);
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`“${title}” kursu silinsin mi?`)) return;
    setError(null);
    const formData = new FormData();
    formData.set("id", id);
    const result = await deleteCourseAction(formData);
    if (result && "error" in result && result.error) {
      setError(result.error);
    }
  }

  return (
    <div className="space-y-8">
      {mode === "antrenor" ? (
        <form
          onSubmit={(event) => void handleCreate(event)}
          className="rounded-3xl border border-outline-variant/35 bg-white p-4 shadow-[0_20px_50px_rgba(11,29,66,0.06)] sm:p-5 md:p-7"
        >
          <h2 className="font-display text-xl font-bold text-navy">Kurs ekle</h2>
          <p className="mt-1 text-sm text-muted">
            Haftalık yinelenen ders. Grupta seçilen tüm sporcuların takvimine düşer.
          </p>
          <CourseFields
            kind={kind}
            onKindChange={setKind}
            athletes={athletes}
            defaultAthleteIds={[]}
          />
          {error ? <p className="mt-3 text-sm font-medium text-error">{error}</p> : null}
          <button
            type="submit"
            disabled={athletes.length === 0}
            className="cta-lift mt-5 min-h-11 w-full rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
          >
            Kursu kaydet
          </button>
          {athletes.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Önce en az bir sporcu ekleyin.</p>
          ) : null}
        </form>
      ) : null}

      {error && mode === "sporcu" ? <p className="text-sm font-medium text-error">{error}</p> : null}

      <section>
        <h2 className="font-display text-xl font-bold text-navy">Haftalık takvim</h2>
        <p className="mt-1 text-sm text-muted">
          {mode === "antrenor"
            ? "Tüm antrenörlerin kursları. Kendi kurslarınızı düzenleyebilirsiniz."
            : "Kayıtlı olduğunuz kurslar."}
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {weekdays.map((day) => (
            <div key={day} className="rounded-3xl border border-outline-variant/35 bg-white p-4">
              <h3 className="font-display text-base font-bold text-navy">{day}</h3>
              <ul className="mt-3 space-y-2">
                {byDay[day].length === 0 ? (
                  <li className="text-sm text-muted">Kurs yok</li>
                ) : (
                  byDay[day].map((course) => {
                    const coachName =
                      course.coach_name || coachNames.get(course.coach_id) || "Antrenör";
                    const own = course.coach_id === currentUserId;

                    if (mode === "antrenor" && editingId === course.id && own) {
                      return (
                        <li key={course.id} className="rounded-2xl border border-outline-variant/40 p-3">
                          <form onSubmit={(event) => void handleUpdate(event)} className="space-y-2">
                            <input type="hidden" name="id" value={course.id} />
                            <CourseFields
                              kind={course.kind}
                              onKindChange={() => undefined}
                              athletes={athletes}
                              defaultAthleteIds={course.athlete_ids}
                              defaults={course}
                              compact
                            />
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="submit"
                                className="min-h-10 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white"
                              >
                                Kaydet
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="min-h-10 rounded-full px-4 py-2 text-sm font-semibold text-muted"
                              >
                                Vazgeç
                              </button>
                            </div>
                          </form>
                        </li>
                      );
                    }

                    return (
                      <li key={course.id} className="rounded-2xl bg-surface-low px-3 py-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-asp">
                          {formatTimeLabel(course.start_time)}–{formatTimeLabel(course.end_time)} ·{" "}
                          {course.kind === "grup" ? "Grup" : "Bireysel"}
                        </p>
                        <p className="mt-1 font-semibold text-navy">{course.title}</p>
                        <p className="text-sm text-muted">
                          {branchLabel(course.branch)} · {coachName}
                        </p>
                        {mode === "antrenor" ? (
                          <p className="mt-1 text-xs text-muted">
                            {course.athlete_ids.length} sporcu
                          </p>
                        ) : null}
                        {mode === "antrenor" && own ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingId(course.id)}
                              className="text-sm font-semibold text-navy"
                            >
                              Düzenle
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDelete(course.id, course.title)}
                              className="text-sm font-semibold text-error"
                            >
                              Sil
                            </button>
                          </div>
                        ) : null}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CourseFields({
  kind,
  onKindChange,
  athletes,
  defaultAthleteIds,
  defaults,
  compact,
}: {
  kind: CourseKind;
  onKindChange: (kind: CourseKind) => void;
  athletes: Profile[];
  defaultAthleteIds: string[];
  defaults?: Course;
  compact?: boolean;
}) {
  const [localKind, setLocalKind] = useState<CourseKind>(kind);

  const activeKind = defaults ? localKind : kind;

  return (
    <div className={`grid gap-3 ${compact ? "" : "mt-5 sm:grid-cols-2"}`}>
      <Field label="Başlık">
        <input
          name="title"
          required
          className="field-input"
          placeholder="Teknik antrenman"
          defaultValue={defaults?.title}
        />
      </Field>
      <Field label="Branş">
        <select name="branch" required className="field-input" defaultValue={defaults?.branch ?? "basketbol"}>
          {planBranches.map((slug) => (
            <option key={slug} value={slug}>
              {branchLabel(slug)}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Gün">
        <select name="weekday" required className="field-input" defaultValue={defaults?.weekday ?? weekdays[0]}>
          {weekdays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Tür">
        <select
          name="kind"
          required
          className="field-input"
          value={activeKind}
          onChange={(event) => {
            const next = event.target.value as CourseKind;
            setLocalKind(next);
            onKindChange(next);
          }}
        >
          {courseKinds.map((k) => (
            <option key={k} value={k}>
              {k === "grup" ? "Grup" : "Bireysel"}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Başlangıç">
        <input
          name="start_time"
          type="time"
          required
          className="field-input"
          defaultValue={defaults ? timeInputValue(defaults.start_time) : "17:00"}
        />
      </Field>
      <Field label="Bitiş">
        <input
          name="end_time"
          type="time"
          required
          className="field-input"
          defaultValue={defaults ? timeInputValue(defaults.end_time) : "18:00"}
        />
      </Field>
      <div className={compact ? "" : "sm:col-span-2"}>
        <Field label="Notlar">
          <textarea name="notes" rows={2} className="field-input" defaultValue={defaults?.notes} placeholder="Salon, ekipman…" />
        </Field>
      </div>
      <div className={compact ? "" : "sm:col-span-2"}>
        <p className="text-sm font-semibold text-navy">
          {activeKind === "bireysel" ? "Sporcu" : "Sporcular"}
        </p>
        {activeKind === "bireysel" ? (
          <select
            name="athlete_ids"
            required
            className="field-input mt-2"
            defaultValue={defaultAthleteIds[0] ?? ""}
          >
            <option value="" disabled>
              Seçin
            </option>
            {athletes.map((athlete) => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.full_name || athlete.email || athlete.id}
              </option>
            ))}
          </select>
        ) : (
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {athletes.map((athlete) => (
              <li key={athlete.id}>
                <label className="flex items-center gap-2 rounded-xl border border-outline-variant/40 px-3 py-2 text-sm text-navy">
                  <input
                    type="checkbox"
                    name="athlete_ids"
                    value={athlete.id}
                    defaultChecked={defaultAthleteIds.includes(athlete.id)}
                  />
                  {athlete.full_name || athlete.email || athlete.id}
                </label>
              </li>
            ))}
          </ul>
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
