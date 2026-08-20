"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandWordmark } from "@/components/BrandWordmark";
import { HeaderAuth } from "@/components/HeaderAuth";
import { getActiveBranches } from "@/data/branches";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const branches = getActiveBranches();
  const supabaseReady = isSupabaseConfigured();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant/25 bg-white/80 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl">
      <div className="page-shell flex h-[4.25rem] items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-navy md:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
          <div className="min-w-0 overflow-hidden" onClick={() => setOpen(false)}>
            <BrandWordmark size="md" className="max-w-[9.75rem] sm:max-w-none" />
          </div>
        </div>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Ana menü">
          <NavLink href="/" label="Anasayfa" pathname={pathname} />
          <NavLink href="/#branslar" label="Branşlar" pathname={pathname} />
          <NavLink href="/iletisim" label="İletişim" pathname={pathname} />
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
          <PathHashLink
            pathname="/iletisim"
            hash="#basvuru"
            className="cta-lift rounded-full bg-navy px-3 py-2.5 text-sm font-semibold text-white sm:px-4 md:px-5"
          >
            <span className="sm:hidden">Deneme</span>
            <span className="hidden sm:inline">Ücretsiz Deneme</span>
          </PathHashLink>
          <HeaderAuth configured={supabaseReady} />
        </div>
      </div>

      {open && (
        <div className="max-h-[min(70dvh,calc(100dvh-8.5rem))] overflow-y-auto border-t border-outline-variant/25 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobil menü">
            <Link
              href="/"
              className="rounded-xl px-3 py-3 text-base font-semibold text-navy hover:bg-surface-low"
              onClick={() => setOpen(false)}
            >
              Anasayfa
            </Link>
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
            <Link
              href="/iletisim"
              className="rounded-xl px-3 py-3 text-base font-semibold text-navy hover:bg-surface-low"
              onClick={() => setOpen(false)}
            >
              İletişim
            </Link>
            <div onClick={() => setOpen(false)}>
              <HeaderAuth configured={supabaseReady} variant="mobile" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function PathHashLink({
  pathname: targetPath,
  hash,
  className,
  children,
  onNavigate,
}: {
  pathname: "/" | "/iletisim";
  hash: "#giris-sporcu" | "#giris-antrenor" | "#basvuru";
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const href = `${targetPath}${hash}`;

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        onNavigate?.();
        if (pathname !== targetPath) return;
        event.preventDefault();
        if (window.location.hash !== hash) {
          window.location.hash = hash;
        }
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
    >
      {children}
    </Link>
  );
}

function NavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active =
    href === "/"
      ? pathname === "/"
      : href === "/#branslar"
        ? pathname === "/" || pathname.startsWith("/branslar")
        : pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`text-[13px] font-semibold tracking-wide transition-colors hover:text-arel ${
        active ? "text-arel" : "text-muted"
      }`}
      onClick={(event) => {
        if (href !== "/#branslar" || pathname !== "/") return;
        event.preventDefault();
        if (window.location.hash !== "#branslar") {
          history.replaceState(null, "", "#branslar");
        }
        document.getElementById("branslar")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
    >
      {label}
    </Link>
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
