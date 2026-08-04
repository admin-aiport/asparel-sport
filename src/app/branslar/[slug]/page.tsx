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
              className="object-cover object-top opacity-35"
              sizes="100vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, ${branch.accentHex}33 50%, #eef2f8 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        </div>

        <div className="mx-auto max-w-container px-4 pb-16 pt-28 md:px-10 md:pb-20 md:pt-36">
          <Link
            href="/#branslar"
            className="mb-6 inline-block text-sm font-semibold text-muted hover:text-secondary"
          >
            ← Tüm branşlar
          </Link>
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span
                className="mb-3 inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{
                  borderColor: `${branch.accentHex}55`,
                  backgroundColor: `${branch.accentHex}22`,
                  color: branch.accentHex,
                }}
              >
                {branch.ageRangeLabel}
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
                {branch.name}
              </h1>
              <p className="mt-4 text-base text-muted md:text-lg">{branch.longDescription}</p>
            </div>
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white md:h-20 md:w-20"
              style={{ backgroundColor: branch.accentHex }}
            >
              <SportIcon name={branch.icon} className="h-8 w-8 md:h-10 md:w-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="reveal px-4 pb-16 md:px-10">
        <div className="mx-auto max-w-container">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Yaş Grupları</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branch.ageGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-outline-variant/30 bg-surface-high p-5"
              >
                <p className="text-sm font-bold uppercase tracking-wide" style={{ color: branch.accentHex }}>
                  {group.label}
                </p>
                {group.subtitle && (
                  <p className="mt-2 text-sm text-muted">{group.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal bg-surface-low px-4 py-16 md:px-10">
        <div className="mx-auto max-w-container">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Program Vurguları</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {branch.highlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl bg-surface-high px-5 py-4 text-sm font-medium text-foreground"
              >
                <span className="mr-2" style={{ color: branch.accentHex }} aria-hidden>
                  ●
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm font-semibold uppercase tracking-widest text-muted">
            {branch.progression.join(" → ")}
          </p>
        </div>
      </section>

      {branch.image && (
        <section className="reveal px-4 py-12 md:px-10">
          <div className="relative mx-auto aspect-[4/5] max-w-lg overflow-hidden rounded-2xl md:aspect-[3/4]">
            <Image
              src={branch.image}
              alt={branch.imageAlt ?? branch.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
            />
          </div>
        </section>
      )}

      <section className="reveal px-4 pb-20 md:px-10">
        <div className="mx-auto max-w-2xl">
          <TrialForm defaultBranch={branch.slug} />
        </div>
      </section>
    </>
  );
}
