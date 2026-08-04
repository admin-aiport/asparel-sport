import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

type Props = {
  href?: string | null;
  size?: "sm" | "md" | "lg" | "hero";
  showSubtitle?: boolean;
  showLogo?: boolean;
  className?: string;
};

const sizes = {
  sm: {
    logo: "h-9 w-9",
    logoPx: 36,
    name: "text-base md:text-lg",
    sub: "text-[10px] md:text-[11px]",
  },
  md: {
    logo: "h-10 w-10 md:h-11 md:w-11",
    logoPx: 44,
    name: "text-lg md:text-xl",
    sub: "text-[10px] md:text-[11px]",
  },
  lg: {
    logo: "h-14 w-14",
    logoPx: 56,
    name: "text-2xl md:text-3xl",
    sub: "text-xs md:text-sm",
  },
  hero: {
    logo: "h-16 w-16 md:h-24 md:w-24",
    logoPx: 96,
    name: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
    sub: "text-sm md:text-base tracking-[0.2em]",
  },
} as const;

export function BrandWordmark({
  href = "/",
  size = "md",
  showSubtitle = true,
  showLogo = true,
  className = "",
}: Props) {
  const s = sizes[size];
  const content = (
    <>
      {showLogo && (
        <Image
          src="/brand/logo.png"
          alt=""
          width={s.logoPx}
          height={s.logoPx}
          className={`${s.logo} object-contain`}
          priority={size === "hero" || size === "md"}
        />
      )}
      <span className="flex flex-col leading-none">
        <span className={`font-display font-bold tracking-tight ${s.name}`}>
          <span className="text-asp">ASP</span>
          <span className="text-arel">AREL</span>
        </span>
        {showSubtitle && (
          <span
            className={`mt-1.5 font-semibold uppercase text-asp ${s.sub} ${size === "hero" ? "" : "tracking-[0.16em]"}`}
          >
            Spor Kulübü
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-2.5 ${className}`}
        aria-label={site.name}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`} aria-label={site.name}>
      {content}
    </div>
  );
}
