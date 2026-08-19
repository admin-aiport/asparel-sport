"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faq";

type Props = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-outline-variant/35 bg-white"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left min-h-12 sm:px-5"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="min-w-0 break-words font-semibold text-navy">{item.question}</span>
              <span
                className={`shrink-0 font-display text-xl text-asp transition-transform ${open ? "rotate-45" : ""}`}
                aria-hidden
              >
                +
              </span>
            </button>
            {open && (
              <div className="border-t border-outline-variant/25 px-5 pb-4 pt-3 text-sm leading-relaxed text-muted">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
