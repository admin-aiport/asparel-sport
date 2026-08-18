"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendlyEmbed, buildCalendlyUrl, openCalendlyPopup } from "@/components/CalendlyEmbed";
import { site } from "@/lib/site";

type MemberRole = "sporcu" | "antrenor";

const roleConfig = {
  sporcu: {
    hash: "#giris-sporcu",
    label: "Sporcu",
    title: "Sporcu girişi",
    description: "E-postanızla giriş yapın; antrenman programınızı takvimden görüntüleyin.",
    emailLabel: "Sporcu e-postası",
    loginLabel: "Giriş yap",
    signupLabel: "Sporcu Ol",
    signupHint: "Henüz kayıtlı değil misiniz?",
    calendlyBaseUrl: site.calendlyAthleteUrl,
  },
  antrenor: {
    hash: "#giris-antrenor",
    label: "Antrenör",
    title: "Antrenör girişi",
    description: "E-postanızla giriş yapın; program ve başvuru takviminize erişin.",
    emailLabel: "Antrenör e-postası",
    loginLabel: "Giriş yap",
    signupLabel: "Antrenör Veritabanına katıl",
    signupHint: "Kadromuza katılmak ister misiniz?",
    calendlyBaseUrl: site.calendlyCoachUrl,
  },
} as const;

function hashToRole(hash: string): MemberRole {
  return hash === roleConfig.antrenor.hash ? "antrenor" : "sporcu";
}

export function MemberAccess() {
  const [role, setRole] = useState<MemberRole>("sporcu");
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  useEffect(() => {
    const syncRoleFromHash = () => {
      setRole(hashToRole(window.location.hash));
    };

    syncRoleFromHash();
    window.addEventListener("hashchange", syncRoleFromHash);
    return () => window.removeEventListener("hashchange", syncRoleFromHash);
  }, []);

  const config = roleConfig[role];
  const calendlyUrl = useMemo(
    () => buildCalendlyUrl(config.calendlyBaseUrl, submittedEmail),
    [config.calendlyBaseUrl, submittedEmail],
  );

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedEmail(email.trim());
  }

  function handleSignup() {
    void openCalendlyPopup(buildCalendlyUrl(config.calendlyBaseUrl, email.trim()));
  }

  return (
    <section
      id="giris"
      className="reveal scroll-mt-28 border-t border-outline-variant/30 bg-surface-low/70 px-4 py-14 md:px-10 md:py-20"
      aria-labelledby="member-access-title"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-asp">Üye alanı</p>
          <h2
            id="member-access-title"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-navy md:text-4xl"
          >
            Sporcu ve antrenör girişi
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Programınızı görüntülemek için giriş yapın; yeni kayıtlar ilgili takvim üzerinden
            tamamlanır.
          </p>
        </div>

        <div
          className="mt-8 flex justify-center gap-2"
          role="tablist"
          aria-label="Üye türü"
        >
          {(Object.keys(roleConfig) as MemberRole[]).map((tabRole) => {
            const tab = roleConfig[tabRole];
            const active = role === tabRole;

            return (
              <a
                key={tabRole}
                id={tabRole === "sporcu" ? "giris-sporcu" : "giris-antrenor"}
                href={tab.hash}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tabRole}`}
                onClick={() => setRole(tabRole)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-navy text-white shadow-sm"
                    : "border border-outline-variant/50 bg-white text-navy hover:border-arel hover:text-arel"
                }`}
              >
                {tab.label}
              </a>
            );
          })}
        </div>

        <div
          id={`panel-${role}`}
          role="tabpanel"
          aria-labelledby={role === "sporcu" ? "giris-sporcu" : "giris-antrenor"}
          className="mt-8 rounded-3xl border border-outline-variant/35 bg-white p-6 shadow-[0_20px_50px_rgba(11,29,66,0.06)] md:p-9"
        >
          <div>
            <h3 className="font-display text-2xl font-bold text-navy md:text-3xl">{config.title}</h3>
            <p className="mt-2 text-sm text-muted">{config.description}</p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor={`${role}-email`} className="mb-2 block text-sm font-semibold text-navy">
                {config.emailLabel}
              </label>
              <input
                id={`${role}-email`}
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ornek@email.com"
                required
                className="w-full rounded-2xl border border-outline-variant/50 bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-muted/70 focus:border-arel"
              />
            </div>
            <button
              type="submit"
              className="cta-lift rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white sm:shrink-0"
            >
              {config.loginLabel}
            </button>
          </form>

          <CalendlyEmbed
            key={`${role}-${submittedEmail}`}
            url={calendlyUrl}
            className="mt-6"
            heightClassName="h-[700px]"
            fallbackHref={config.calendlyBaseUrl}
          />

          <div className="mt-6 flex flex-col items-center gap-3 border-t border-outline-variant/25 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-muted">{config.signupHint}</p>
            <button
              type="button"
              onClick={handleSignup}
              className="cta-lift rounded-full border border-outline-variant/50 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-arel hover:text-arel"
            >
              {config.signupLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
