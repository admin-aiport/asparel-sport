"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandWordmark } from "@/components/BrandWordmark";
import { getActiveBranches } from "@/data/branches";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/#branslar", label: "Branşlar" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const branches = getActiveBranches();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant/25 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-container items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-navy md:hidden"
            aria-label="Menüyü aç"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
          <div onClick={() => setOpen(false)}>
            <BrandWordmark size="md" />
          </div>
        </div>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Ana menü">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-semibold tracking-wide transition-colors hover:text-arel ${
                  active ? "text-arel" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="group relative">
            <span className="cursor-default text-[13px] font-semibold tracking-wide text-muted transition-colors group-hover:text-arel">
              Branşlar
            </span>
            <div className="invisible absolute left-1/2 top-full z-50 mt-3 min-w-48 -translate-x-1/2 rounded-2xl border border-outline-variant/40 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              {branches.map((b) => (
                <Link
                  key={b.slug}
                  href={`/branslar/${b.slug}`}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-surface-low hover:text-arel"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <Link
          href="/iletisim#basvuru"
          className="cta-lift rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white md:px-5"
        >
          Ücretsiz Deneme
        </Link>
      </div>

      {open && (
        <div className="border-t border-outline-variant/25 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobil menü">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base font-semibold text-navy hover:bg-surface-low"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {branches.map((b) => (
              <Link
                key={b.slug}
                href={`/branslar/${b.slug}`}
                className="rounded-xl px-3 py-3 text-base font-medium text-muted hover:bg-surface-low hover:text-navy"
                onClick={() => setOpen(false)}
              >
                {b.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}
