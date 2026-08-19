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
  el.style.position = "relative";
  el.style.width = "100%";
  el.style.maxWidth = "100%";
  el.style.minWidth = "0";
  el.style.height = `${WIDGET_HEIGHT_PX}px`;
}

function waitUntilRevealVisible(el: HTMLElement, signal: { cancelled: boolean }): Promise<void> {
  const reveal = el.closest(".reveal");
  if (!reveal || reveal.classList.contains("is-visible")) return Promise.resolve();

  return new Promise((resolve) => {
    const finish = () => {
      observer.disconnect();
      resolve();
    };

    const observer = new MutationObserver(() => {
      if (signal.cancelled || reveal.classList.contains("is-visible")) finish();
    });

    observer.observe(reveal, { attributes: true, attributeFilter: ["class"] });

    if (reveal.classList.contains("is-visible")) finish();
  });
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

    const signal = { cancelled: false };
    applyWidgetBox(el);
    el.setAttribute("data-url", url);

    void (async () => {
      await waitUntilRevealVisible(el, signal);
      if (signal.cancelled) return;

      try {
        await loadCalendlyScript();
      } catch {
        return;
      }

      if (signal.cancelled || !window.Calendly) return;

      const parent = containerRef.current;
      if (!parent) return;
      if (parent.querySelector("iframe")) return;

      parent.removeAttribute("data-processed");
      parent.replaceChildren();
      applyWidgetBox(parent);
      parent.setAttribute("data-url", url);
      window.Calendly.initInlineWidget({
        url,
        parentElement: parent,
      });
    })();

    return () => {
      signal.cancelled = true;
    };
  }, [url]);

  return (
    <>
      <div className={`calendly-embed-shell ${className}`}>
        <div
          ref={containerRef}
          className="calendly-inline-widget w-full max-w-full min-w-0 rounded-2xl"
          data-url={url}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            height: WIDGET_HEIGHT_PX,
          }}
        />
      </div>
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
