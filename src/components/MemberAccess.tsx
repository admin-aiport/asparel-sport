"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { openCalendlyPopup } from "@/components/CalendlyEmbed";
import { LoginFields } from "@/components/LoginForm";
import { site } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type MemberRole = "sporcu" | "antrenor";

const roleConfig = {
  sporcu: {
    hash: "#giris-sporcu",
    label: "Sporcu",
    title: "Sporcu girişi",
    description: "Kulüp hesabınızla panele girin; antrenman planınız sizi bekliyor.",
    points: ["Antrenman planınızı görün", "Branş programınızı takip edin", "Güvenli üye girişi"],
    signupLabel: "Görüşme randevusu al",
    signupHint:
      "Sporcu hesabınızın açılması için önce görüşme randevusu alın.",
    calendlyBaseUrl: site.calendlyAthleteUrl,
  },
  antrenor: {
    hash: "#giris-antrenor",
    label: "Antrenör",
    title: "Antrenör girişi",
    description: "Kulüp hesabınızla panele girin; sporcu planlarını buradan yönetin.",
    points: ["Sporcu planlarını yönetin", "Kadroya hızlı ulaşın", "Güvenli antrenör girişi"],
    signupLabel: "Ön görüşme randevusu al",
    signupHint:
      "Önce ön görüşme randevusu alın; erişim daha sonra kulüp tarafından verilir.",
    calendlyBaseUrl: site.calendlyCoachUrl,
  },
} as const;

function hashToRole(hash: string): MemberRole {
  return hash === roleConfig.antrenor.hash ? "antrenor" : "sporcu";
}

export function MemberAccess() {
  const pathname = usePathname();
  const [role, setRole] = useState<MemberRole>("sporcu");
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    const syncRoleFromHash = () => {
      setRole(hashToRole(window.location.hash));
    };

    syncRoleFromHash();
    window.addEventListener("hashchange", syncRoleFromHash);

    const { hash } = window.location;
    if (pathname === "/" && (hash === "#giris" || hash === "#giris-sporcu" || hash === "#giris-antrenor")) {
      requestAnimationFrame(() => {
        document.getElementById("giris")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    return () => window.removeEventListener("hashchange", syncRoleFromHash);
  }, [pathname]);

  const config = roleConfig[role];

  function handleSignup() {
    void openCalendlyPopup(config.calendlyBaseUrl);
  }

  return (
    <section
      id="giris"
      className="reveal scroll-mt-[calc(4.25rem+env(safe-area-inset-top,0px)+0.5rem)] border-t border-outline-variant/30 bg-surface-low/70 pb-14 pt-8 md:pb-20 md:pt-10"
      aria-labelledby="member-access-title"
    >
      <div className="page-shell">
        <div className="relative text-center">
          <span id="giris-sporcu" className="absolute inset-x-0 top-0 h-0 w-0" aria-hidden />
          <span id="giris-antrenor" className="absolute inset-x-0 top-0 h-0 w-0" aria-hidden />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-asp">Üye alanı</p>
          <h2
            id="member-access-title"
            className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl md:text-4xl"
          >
            Hesabınızla giriş yapın
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Sporcu veya antrenör hesabınız varsa e-posta ve şifrenizle panele bağlanın.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Üye türü">
          {(Object.keys(roleConfig) as MemberRole[]).map((tabRole) => {
            const tab = roleConfig[tabRole];
            const active = role === tabRole;

            return (
              <a
                key={tabRole}
                id={`tab-${tabRole}`}
                href={tab.hash}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tabRole}`}
                onClick={(event) => {
                  event.preventDefault();
                  setRole(tabRole);
                  if (window.location.hash !== tab.hash) {
                    history.replaceState(null, "", tab.hash);
                  }
                }}
                className={`min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
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
          aria-labelledby={`tab-${role}`}
          className="mt-8 overflow-hidden rounded-3xl border border-outline-variant/35 bg-white shadow-[0_20px_50px_rgba(11,29,66,0.08)]"
        >
          <div className="grid min-w-0 md:grid-cols-2">
            <div className="relative order-2 min-w-0 overflow-hidden bg-navy px-5 py-7 text-white sm:px-8 md:order-1 md:px-10 md:py-12">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-asp/20 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-arel/40 blur-2xl"
                aria-hidden
              />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <LockIcon />
                </span>
                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-asp">
                  Üye paneli
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {config.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                  {config.description}
                </p>
                <ul className="mt-8 space-y-3">
                  {config.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-white/90">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-asp/20 text-asp">
                        <CheckIcon />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="order-1 flex min-w-0 flex-col justify-center px-5 py-7 sm:px-8 md:order-2 md:px-10 md:py-12">
              <p className="text-sm font-semibold text-navy">E-posta ve şifrenizle devam edin</p>
              <p className="mt-1 text-sm text-muted">Giriş sonrası antrenman paneline yönlendirilirsiniz.</p>
              <LoginFields configured={supabaseReady} role={role} idPrefix={`panel-${role}`} />
              <div className="mt-8 border-t border-outline-variant/25 pt-6">
                <p className="text-sm leading-relaxed text-muted">{config.signupHint}</p>
                <button
                  type="button"
                  onClick={handleSignup}
                  className="cta-lift mt-3 min-h-11 w-full rounded-full border border-outline-variant/50 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-arel hover:text-arel sm:w-auto"
                >
                  {config.signupLabel}
                </button>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Randevu sonrası hesabınız e-posta ile iletilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="5" y="11" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 15v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.2 5 8.7 9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
