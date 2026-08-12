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

/** Intrinsic size of /brand/wordmark.png */
const WORDMARK = { w: 1793, h: 576 } as const;

const sizes = {
  sm: {
    logo: "h-9 w-9",
    logoPx: 36,
    wordmark: "h-8 w-auto md:h-9",
    wordmarkHeight: 36,
  },
  md: {
    logo: "h-12 w-12 md:h-14 md:w-14",
    logoPx: 56,
    wordmark: "h-9 w-auto md:h-10",
    wordmarkHeight: 40,
  },
  lg: {
    logo: "h-14 w-14",
    logoPx: 56,
    wordmark: "h-12 w-auto md:h-14",
    wordmarkHeight: 56,
  },
  hero: {
    logo: "h-16 w-16 md:h-24 md:w-24",
    logoPx: 96,
    wordmark: "h-16 w-auto sm:h-20 md:h-24 lg:h-28",
    wordmarkHeight: 112,
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
  const wordmarkWidth = Math.round(
    (WORDMARK.w / WORDMARK.h) * s.wordmarkHeight,
  );

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
        <Image
          src="/brand/wordmark.png"
          alt=""
          width={wordmarkWidth}
          height={s.wordmarkHeight}
          className={`${s.wordmark} object-contain object-left`}
          priority={size === "hero" || size === "md"}
        />
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
