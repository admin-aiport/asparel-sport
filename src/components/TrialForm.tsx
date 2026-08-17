"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

type Props = {
  /** Kept for call-site compatibility; Calendly event types are chosen in the widget. */
  defaultBranch?: string;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

function loadCalendlyScript(): Promise<void> {
  if (window.Calendly) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve) => {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly script failed to load"));
    document.body.appendChild(script);
  });
}

export function TrialForm(_props: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) return;
        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: `${site.calendlyUrl}?hide_gdpr_banner=1`,
          parentElement: containerRef.current,
          resize: true,
        });
      })
      .catch(() => {
        /* fallback link remains visible below */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      id="basvuru"
      className="rounded-3xl border border-outline-variant/35 bg-white p-6 shadow-[0_20px_50px_rgba(11,29,66,0.06)] md:p-9"
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

      <div
        ref={containerRef}
        className="calendly-inline-widget mt-6 min-h-[680px] w-full overflow-hidden rounded-2xl"
        data-url={`${site.calendlyUrl}?hide_gdpr_banner=1`}
      />

      <p className="mt-4 text-center text-sm text-muted">
        Takvim yüklenmezse{" "}
        <a
          href={site.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-arel hover:text-navy"
        >
          Calendly’de açın
        </a>
        .
      </p>
    </div>
  );
}
