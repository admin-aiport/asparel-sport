import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrialForm } from "@/components/TrialForm";
import { SportIcon } from "@/components/SportIcon";
import { branches, getBranchBySlug } from "@/data/branches";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch) return {};
  return {
    title: branch.seoTitle,
    description: branch.seoDescription,
    openGraph: {
      title: branch.seoTitle,
      description: branch.seoDescription,
      images: branch.image ? [{ url: branch.image, alt: branch.imageAlt }] : undefined,
    },
    alternates: {
      canonical: `/branslar/${branch.slug}`,
    },
  };
}

export default async function BranchPage({ params }: Props) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch) notFound();

  return (
    <>
      <section className={`relative overflow-hidden accent-${branch.accent}`}>
        <div className="absolute inset-0 -z-10">
          {branch.image ? (
            <Image
              src={branch.image}
              alt=""
              fill
              priority
              className="object-cover object-top opacity-40"
              sizes="100vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, ${branch.accentHex}30 48%, #eef3f9 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/88 to-white" />
        </div>

        <div className="mx-auto max-w-container px-4 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
          <Link
            href="/#branslar"
            className="mb-8 inline-block text-sm font-semibold text-muted transition hover:text-arel"
          >
            ← Tüm branşlar
          </Link>
          <div className="reveal flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: branch.accentHex }}
              >
                {branch.ageRangeLabel}
              </p>
              <h1 className="font-display text-5xl font-bold tracking-tight text-navy md:text-7xl">
                {branch.name}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                {branch.longDescription}
              </p>
            </div>
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white shadow-lg md:h-20 md:w-20"
              style={{ backgroundColor: branch.accentHex }}
            >
              <SportIcon name={branch.icon} className="h-8 w-8 md:h-10 md:w-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="reveal px-4 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-container">
          <h2 className="mb-8 font-display text-2xl font-bold text-navy md:text-3xl">
            Yaş grupları
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branch.ageGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-3xl border border-outline-variant/40 bg-white p-6"
              >
                <p
                  className="text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: branch.accentHex }}
                >
                  {group.label}
                </p>
                {group.subtitle && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">{group.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal border-y border-outline-variant/30 bg-surface-low/70 px-4 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-container">
          <h2 className="mb-8 font-display text-2xl font-bold text-navy md:text-3xl">
            Program vurguları
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {branch.highlights.map((item) => (
              <li
                key={item}
                className="rounded-3xl border border-outline-variant/30 bg-white px-6 py-5 text-sm font-medium leading-relaxed text-navy"
              >
                <span className="mr-2" style={{ color: branch.accentHex }} aria-hidden>
                  ●
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center font-display text-xs font-bold uppercase tracking-[0.22em] text-arel/80 md:text-sm">
            {branch.progression.join(" → ")}
          </p>
        </div>
      </section>

      {branch.image && (
        <section className="reveal px-4 py-14 md:px-10">
          <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-3xl border border-outline-variant/30 shadow-xl md:aspect-[4/5]">
            <Image
              src={branch.image}
              alt={branch.imageAlt ?? branch.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          </div>
        </section>
      )}

      <section className="reveal px-4 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-2xl">
          <TrialForm defaultBranch={branch.slug} />
        </div>
      </section>
    </>
  );
}
