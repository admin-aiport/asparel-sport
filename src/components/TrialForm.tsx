"use client";

import { useState, type FormEvent } from "react";
import { getActiveBranches } from "@/data/branches";
import { whatsappTrialMessage } from "@/lib/site";

type Props = {
  defaultBranch?: string;
};

const inputClass =
  "w-full rounded-2xl border border-outline-variant/50 bg-white px-4 py-3.5 text-[0.95rem] text-navy outline-none transition placeholder:text-muted/45 focus:border-arel focus:ring-2 focus:ring-asp/25 disabled:opacity-50";

export function TrialForm({ defaultBranch = "" }: Props) {
  const branches = getActiveBranches();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState(defaultBranch);
  const [ageGroup, setAgeGroup] = useState("");
  const [message, setMessage] = useState("");

  const selected = branches.find((b) => b.slug === branch);
  const ageOptions = selected?.ageGroups ?? [];

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const branchName = selected?.name ?? branch;
    const url = whatsappTrialMessage({
      name: name.trim() || undefined,
      branch: branchName || undefined,
      ageGroup: ageGroup || undefined,
      message:
        [phone.trim() && `Telefon: ${phone.trim()}`, message.trim()]
          .filter(Boolean)
          .join(" | ") || undefined,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-outline-variant/35 bg-white p-6 shadow-[0_20px_50px_rgba(11,29,66,0.06)] md:p-9"
      id="basvuru"
    >
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-asp">Başvuru</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-navy md:text-3xl">
          Ücretsiz deneme dersi
        </h3>
        <p className="mt-2 text-sm text-muted">
          Formu gönderince WhatsApp açılır; ekibimiz hızlıca dönüş yapar.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block" htmlFor="name">
          <span className="mb-1.5 block text-sm font-semibold text-muted">Ad Soyad</span>
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Adınız ve soyadınız"
            autoComplete="name"
          />
        </label>
        <label className="block" htmlFor="phone">
          <span className="mb-1.5 block text-sm font-semibold text-muted">Telefon</span>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="05xx xxx xx xx"
            autoComplete="tel"
          />
        </label>
        <label className="block" htmlFor="branch">
          <span className="mb-1.5 block text-sm font-semibold text-muted">Branş</span>
          <select
            id="branch"
            name="branch"
            required
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
              setAgeGroup("");
            }}
            className={inputClass}
          >
            <option value="" disabled>
              Branş seçin
            </option>
            {branches.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block" htmlFor="ageGroup">
          <span className="mb-1.5 block text-sm font-semibold text-muted">Yaş grubu</span>
          <select
            id="ageGroup"
            name="ageGroup"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className={inputClass}
            disabled={!branch}
          >
            <option value="">Seçiniz (isteğe bağlı)</option>
            {ageOptions.map((g) => (
              <option key={g.label} value={g.label}>
                {g.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block" htmlFor="message">
        <span className="mb-1.5 block text-sm font-semibold text-muted">Mesaj</span>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Kısaca bir not bırakabilirsiniz..."
        />
      </label>

      <button
        type="submit"
        className="cta-lift mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-base font-semibold text-white md:w-auto"
      >
        WhatsApp ile gönder
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
