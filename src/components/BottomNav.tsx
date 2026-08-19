"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Anasayfa", icon: "home" },
  { href: "/#branslar", label: "Branşlar", icon: "sports", match: "/branslar" },
  { href: "/iletisim", label: "İletişim", icon: "contact" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 z-50 w-full rounded-t-3xl border-t border-outline-variant/40 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_30px_rgba(11,29,66,0.06)] backdrop-blur-xl md:hidden"
      aria-label="Alt navigasyon"
    >
      <div className="flex h-20 items-center justify-around px-2 pb-1">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : "match" in item && item.match
                ? pathname.startsWith(item.match)
                : pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-12 min-w-[4.5rem] flex-col items-center justify-center px-2 py-1 transition ${
                active ? "scale-110 text-secondary-container" : "text-outline hover:text-navy"
              }`}
            >
              <NavIcon name={item.icon} filled={active} />
              <span className="mt-1 text-xs font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function NavIcon({ name, filled }: { name: string; filled?: boolean }) {
  const stroke = filled ? 2.2 : 1.8;
  if (name === "home") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden>
        <path
          d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1v-10.5z"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "sports") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={stroke} />
        <path d="M12 3c2.5 3 2.5 15 0 18M3 12h18M5 7c4 2 10 2 14 0M5 17c4-2 10-2 14 0" stroke="currentColor" strokeWidth={stroke} />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22c4-4 8-6.5 8-11a8 8 0 10-16 0c0 4.5 4 7 8 11z"
        stroke="currentColor"
        strokeWidth={stroke}
        fill={filled ? "currentColor" : "none"}
      />
      <circle cx="12" cy="11" r="2.5" fill={filled ? "var(--background)" : "currentColor"} />
    </svg>
  );
}
