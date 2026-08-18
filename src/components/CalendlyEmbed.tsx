"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

export function buildCalendlyUrl(baseUrl: string, email?: string) {
  const url = new URL(baseUrl);
  url.searchParams.set("hide_gdpr_banner", "1");
  const trimmed = email?.trim();
  if (trimmed) {
    url.searchParams.set("email", trimmed);
  }
  return url.toString();
}

export function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
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

export async function openCalendlyPopup(url: string) {
  try {
    await loadCalendlyScript();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
      return;
    }
  } catch {
    /* fallback below */
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

type CalendlyEmbedProps = {
  url: string;
  className?: string;
  heightClassName?: string;
  fallbackHref?: string;
  fallbackLabel?: string;
};

export function CalendlyEmbed({
  url,
  className = "",
  heightClassName = "h-[700px]",
  fallbackHref,
  fallbackLabel = "Calendly’de açın",
}: CalendlyEmbedProps) {
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
          url,
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
  }, [url]);

  return (
    <>
      <div
        ref={containerRef}
        className={`calendly-inline-widget w-full rounded-2xl ${heightClassName} ${className}`}
        data-url={url}
      />
      {fallbackHref && (
        <p className="mt-4 text-center text-sm text-muted">
          Takvim yüklenmezse{" "}
          <a
            href={fallbackHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-arel hover:text-navy"
          >
            {fallbackLabel}
          </a>
          .
        </p>
      )}
    </>
  );
}
