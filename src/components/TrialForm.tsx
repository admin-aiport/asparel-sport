"use client";

import { useEffect } from "react";
import { CalendlyEmbed, buildCalendlyUrl } from "@/components/CalendlyEmbed";
import { site } from "@/lib/site";

type Props = {
  /** Kept for call-site compatibility; Calendly event types are chosen in the widget. */
  defaultBranch?: string;
};

const trialCalendlyUrl = buildCalendlyUrl(site.calendlyUrl);

export function TrialForm(_props: Props) {
  useEffect(() => {
    if (window.location.hash !== "#basvuru") return;
    requestAnimationFrame(() => {
      document.getElementById("basvuru")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div
      id="basvuru"
      className="scroll-mt-28 min-w-0 overflow-hidden rounded-3xl border border-outline-variant/35 bg-white p-3 shadow-[0_20px_50px_rgba(11,29,66,0.06)] sm:p-6 md:p-9"
    >
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-asp">Rezervasyon</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-navy md:text-3xl">
          Ücretsiz deneme dersi
        </h3>
        <p className="mt-2 text-sm text-muted">
          Takvimden uygun saati seçin; randevunuz anında oluşur.
        </p>
      </div>

      <CalendlyEmbed
        url={trialCalendlyUrl}
        className="mt-6"
        fallbackHref={site.calendlyUrl}
      />
    </div>
  );
}
