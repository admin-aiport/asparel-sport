"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
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
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-white/85 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-container items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground md:hidden"
            aria-label="Menüyü aç"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
            aria-label={site.name}
          >
            <Image
              src="/brand/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-10 w-10 object-contain md:h-11 md:w-11"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="text-base font-extrabold tracking-tight md:text-lg">
                <span className="text-[#5BA8D9]">ASP</span>
                <span className="text-[#1A4F9C]">AREL</span>
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5BA8D9] md:text-[11px]">
                Spor Kulübü
              </span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Ana menü">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-secondary ${
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? "text-secondary"
                  : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="group relative">
            <span className="cursor-default text-sm font-semibold text-muted transition-colors group-hover:text-secondary">
              Branş Detay
            </span>
            <div className="invisible absolute left-0 top-full z-50 mt-2 min-w-44 rounded-xl border border-outline-variant/30 bg-surface-high p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              {branches.map((b) => (
                <Link
                  key={b.slug}
                  href={`/branslar/${b.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-highest hover:text-secondary"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <Link
          href="/iletisim#basvuru"
          className="rounded-full bg-primary-fixed px-4 py-2 text-sm font-semibold text-on-primary-fixed transition hover:opacity-90 active:scale-95"
        >
          Hemen Başvur
        </Link>
      </div>

      {open && (
        <div className="border-t border-outline-variant/20 bg-surface-low px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobil menü">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-surface-high"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {branches.map((b) => (
              <Link
                key={b.slug}
                href={`/branslar/${b.slug}`}
                className="rounded-lg px-3 py-3 text-base font-medium text-muted hover:bg-surface-high hover:text-foreground"
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
