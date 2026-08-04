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
      className={`branch-glow group relative block h-[22rem] overflow-hidden rounded-3xl border border-outline-variant/35 accent-${branch.accent} md:h-[26rem]`}
    >
      {hasImage ? (
        <Image
          src={branch.image!}
          alt={branch.imageAlt ?? branch.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
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
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span
              className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: hasImage ? "rgba(255,255,255,0.75)" : branch.accentHex }}
            >
              {branch.ageRangeLabel}
            </span>
            <h3
              className={`font-display text-3xl font-bold tracking-tight md:text-4xl ${
                hasImage ? "text-white" : "text-navy"
              }`}
            >
              {branch.name}
            </h3>
            <p
              className={`mt-2 max-w-[16rem] text-sm leading-relaxed ${
                hasImage ? "text-white/75" : "text-muted"
              }`}
            >
              {branch.shortDescription}
            </p>
          </div>
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-lg"
            style={{ backgroundColor: branch.accentHex }}
          >
            <SportIcon name={branch.icon} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ComingSoonCard({
  name,
  subtitle,
}: {
  name: string;
  subtitle: string;
}) {
  return (
    <div className="relative flex h-[22rem] flex-col items-center justify-center rounded-3xl border border-dashed border-outline-variant/60 bg-surface-low/80 text-muted md:h-[26rem]">
      <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-arel/70">
        {name}
      </p>
      <p className="mt-3 text-sm">{subtitle}</p>
    </div>
  );
}
