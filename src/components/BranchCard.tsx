import Image from "next/image";
import Link from "next/link";
import type { Branch } from "@/data/branches";
import { SportIcon } from "@/components/SportIcon";

type Props = {
  branch: Branch;
};

export function BranchCard({ branch }: Props) {
  const hasImage = Boolean(branch.image);

  return (
    <Link
      href={`/branslar/${branch.slug}`}
      className={`branch-glow group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-outline-variant/35 accent-${branch.accent}`}
    >
      {hasImage ? (
        <Image
          src={branch.image!}
          alt={branch.imageAlt ?? branch.name}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `linear-gradient(155deg, #ffffff 0%, ${branch.accentHex}28 42%, #e8eef8 100%)`,
          }}
        />
      )}
      {hasImage ? (
        <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/30 to-transparent" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      )}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span
              className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[0.14em] md:text-[11px]"
              style={{ color: hasImage ? "rgba(255,255,255,0.75)" : branch.accentHex }}
            >
              {branch.ageRangeLabel}
            </span>
            <h3
              className={`font-display text-2xl font-bold tracking-tight md:text-3xl ${
                hasImage ? "text-white" : "text-navy"
              }`}
            >
              {branch.name}
            </h3>
            <p
              className={`mt-1.5 text-xs leading-relaxed md:text-sm ${
                hasImage ? "text-white/75" : "text-muted"
              }`}
            >
              {branch.shortDescription}
            </p>
          </div>
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-lg md:h-11 md:w-11"
            style={{ backgroundColor: branch.accentHex }}
          >
            <SportIcon name={branch.icon} className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
