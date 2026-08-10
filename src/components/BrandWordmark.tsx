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

/**
 * Matches the crest lockup: two colour blocks
 *   ASP          AREL
 *   SPOR         KULÜBÜ
 * Bottom words stretch to the top word’s width (logo style); a column gap
 * keeps SPOR’s R and KULÜBÜ’s K apart.
 */
const sizes = {
  sm: {
    logo: "h-9 w-9",
    logoPx: 36,
    name: "text-[16px] md:text-[17px]",
    sub: "text-[10px] md:text-[11px]",
    gap: "gap-x-0.5 gap-y-px",
  },
  md: {
    logo: "h-12 w-12 md:h-14 md:w-14",
    logoPx: 56,
    name: "text-[20px] md:text-[22px]",
    sub: "text-[12px] md:text-[14px]",
    gap: "gap-x-0.5 gap-y-0.5",
  },
  lg: {
    logo: "h-14 w-14",
    logoPx: 56,
    name: "text-[28px] md:text-[34px]",
    sub: "text-[17px] md:text-[21px]",
    gap: "gap-x-1.5 gap-y-1",
  },
  hero: {
    logo: "h-16 w-16 md:h-24 md:w-24",
    logoPx: 96,
    name: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
    sub: "text-[1.85rem] sm:text-[2.35rem] md:text-[2.85rem] lg:text-[3.4rem]",
    gap: "gap-x-1.5 gap-y-1 md:gap-x-2 md:gap-y-1.5",
  },
} as const;

function StretchWord({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <span className={`brand-wordmark__stretch ${className}`}>
      {Array.from(text).map((ch, i) => (
        <span key={`${ch}-${i}`}>{ch}</span>
      ))}
    </span>
  );
}

function WordmarkText({
  name,
  sub,
  gap,
}: {
  name: string;
  sub: string;
  gap: string;
}) {
  return (
    <span aria-hidden className={`brand-wordmark inline-flex ${gap}`}>
      <span className="brand-wordmark__col">
        <span className={`brand-wordmark__name text-asp ${name}`}>ASP</span>
        <StretchWord text="SPOR" className={`brand-wordmark__stretch--spor text-asp ${sub}`} />
      </span>
      <span className="brand-wordmark__col">
        <span className={`brand-wordmark__name text-arel ${name}`}>AREL</span>
        <StretchWord text="KULÜBÜ" className={`text-arel ${sub}`} />
      </span>
    </span>
  );
}

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
      {showSubtitle ? (
        <WordmarkText name={s.name} sub={s.sub} gap={s.gap} />
      ) : (
        <span className="sr-only">{site.name}</span>
      )}
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
