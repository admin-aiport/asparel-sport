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
const WIDGET_HEIGHT_PX = 700;

export function buildCalendlyUrl(baseUrl: string, email?: string) {
  const url = new URL(baseUrl);
  url.searchParams.set("hide_gdpr_banner", "1");
  const trimmed = email?.trim();
  if (trimmed) {
    url.searchParams.set("email", trimmed);
  }
  return url.toString();
}

let scriptPromise: Promise<void> | null = null;

export function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const succeed = () => {
      if (window.Calendly) {
        resolve();
        return;
      }
      scriptPromise = null;
      reject(new Error("Calendly script loaded without Calendly global"));
    };

    const fail = () => {
      scriptPromise = null;
      reject(new Error("Calendly script failed to load"));
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", succeed, { once: true });
      existing.addEventListener("error", fail, { once: true });
      queueMicrotask(() => {
        if (window.Calendly) succeed();
      });
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = succeed;
    script.onerror = fail;
    document.body.appendChild(script);
  });

  return scriptPromise;
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
  fallbackHref?: string;
  fallbackLabel?: string;
};

function applyWidgetBox(el: HTMLElement) {
  // Inline height is required: Calendly concatenates parent.style and produces
  // `position: relative;null` when the attribute is missing, so the iframe
  // never gets a used height. Do not pass data-url (avoids auto-init + JS init).
  el.style.position = "relative";
  el.style.width = "100%";
  el.style.minWidth = "0";
  el.style.height = `${WIDGET_HEIGHT_PX}px`;
}

export function CalendlyEmbed({
  url,
  className = "",
  fallbackHref,
  fallbackLabel = "Calendly’de açın",
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    applyWidgetBox(el);

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) return;
        const parent = containerRef.current;
        parent.replaceChildren();
        applyWidgetBox(parent);
        window.Calendly.initInlineWidget({
          url,
          parentElement: parent,
        });
      })
      .catch(() => {
        /* fallback link remains visible below */
      });

    return () => {
      cancelled = true;
      el.replaceChildren();
    };
  }, [url]);

  return (
    <>
      <div
        ref={containerRef}
        className={`calendly-inline-widget w-full max-w-full overflow-hidden rounded-2xl ${className}`}
        style={{
          position: "relative",
          width: "100%",
          minWidth: 0,
          height: WIDGET_HEIGHT_PX,
        }}
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
