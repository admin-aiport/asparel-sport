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
      className={`group relative block h-72 overflow-hidden rounded-2xl border border-outline-variant/40 shadow-lg accent-${branch.accent} md:h-80`}
    >
      {hasImage ? (
        <Image
          src={branch.image!}
          alt={branch.imageAlt ?? branch.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `linear-gradient(145deg, #ffffff 0%, ${branch.accentHex}33 45%, #eef2f8 100%)`,
          }}
        />
      )}
      {hasImage ? (
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
      )}
      <div
        className={`absolute bottom-0 left-0 w-full p-5 transition-transform duration-300 group-hover:-translate-y-1 md:p-6 ${
          hasImage
            ? "bg-navy/55 backdrop-blur-md border-t border-white/10"
            : "glass-panel"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <span
              className="mb-2 inline-block rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-tighter"
              style={{
                borderColor: `${branch.accentHex}50`,
                backgroundColor: `${branch.accentHex}22`,
                color: hasImage ? "#fff" : branch.accentHex,
              }}
            >
              {branch.ageRangeLabel}
            </span>
            <h3
              className={`text-2xl font-bold md:text-3xl ${hasImage ? "text-white" : "text-foreground"}`}
            >
              {branch.name}
            </h3>
            <p
              className={`mt-1 line-clamp-2 text-sm ${hasImage ? "text-white/80" : "text-muted"}`}
            >
              {branch.shortDescription}
            </p>
          </div>
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
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
    <div className="relative flex h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/50 bg-surface-low text-muted md:h-80">
      <span className="mb-2 text-4xl opacity-50" aria-hidden>
        ···
      </span>
      <p className="text-sm font-bold uppercase tracking-widest">{name}</p>
      <p className="mt-1 text-xs opacity-60">{subtitle}</p>
    </div>
  );
}
