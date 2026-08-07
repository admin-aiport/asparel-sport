import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BrandWordmark } from "@/components/BrandWordmark";
import { BranchCard, ComingSoonCard } from "@/components/BranchCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { TrialForm } from "@/components/TrialForm";
import { comingSoonBranches, getActiveBranches } from "@/data/branches";
import { faqs } from "@/data/faq";
import { openGraphDefaults, site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} | İzmir Gaziemir Spor Kulübü`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...openGraphDefaults,
    title: `${site.name} | İzmir Gaziemir Spor Kulübü`,
    description: site.description,
    url: site.url,
  },
};

export default function HomePage() {
  const branches = getActiveBranches();

  return (
    <>
      {/* Hero — brand-led, full-bleed photo */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <Image
            src="/brand/hero-academy.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[72%_center]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/25 md:via-white/88 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
        </div>

        <div className="mx-auto flex min-h-[100svh] max-w-container flex-col justify-center px-4 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
          <div className="max-w-xl lg:max-w-2xl">
            <div className="reveal reveal-delay-1 mb-8 md:mb-10">
              <BrandWordmark size="hero" href={null} showLogo className="!items-start gap-4 md:gap-6" />
            </div>
            <p className="reveal reveal-delay-2 max-w-md text-lg leading-relaxed text-muted md:text-xl">
              Gaziemir’de lisanslı antrenörlerle basketbol, voleybol ve jimnastik.
              Disiplinli altyapı, güvenli salon, ücretsiz deneme dersi.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/iletisim#basvuru"
                className="cta-lift inline-flex items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-base font-semibold text-white"
              >
                Ücretsiz Deneme Dersi Al
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/#branslar"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-arel transition hover:text-navy"
              >
                Branşları incele
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section id="branslar" className="reveal px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-container">
          <SectionHeading
            eyebrow="Eğitimlerimiz"
            title="Branşlarımız"
            description="Yaşa özel programlar. İleride yeni branşlar grid’e eklenmeye hazır."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {branches.map((branch) => (
              <BranchCard key={branch.slug} branch={branch} />
            ))}
            {comingSoonBranches.map((item) => (
              <ComingSoonCard key={item.name} name={item.name} subtitle={item.subtitle} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Asparel — typography-led */}
      <section className="reveal border-y border-outline-variant/30 bg-surface-low/80 px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-container">
          <SectionHeading
            eyebrow="Neden Asparel"
            title="Sadece kulüp değil, gelişim yolu"
            description="Velilerin güveneceği net bir yapı: lisans, güvenlik, takip."
          />
          <div className="grid gap-0 md:grid-cols-3 md:divide-x md:divide-outline-variant/40">
            <WhyItem
              index="01"
              title="Lisanslı antrenörler"
              body="Branşında uzman, çocuk gelişimine hakim eğitmen kadrosu."
            />
            <WhyItem
              index="02"
              title="Güvenli tesis"
              body="Hijyenik salonlar, kontrollü alanlar ve veli için rahat bekleme."
            />
            <WhyItem
              index="03"
              title="Gelişim takibi"
              body="Fiziksel ve mental ilerleme düzenli gözlemle desteklenir."
            />
          </div>
        </div>
      </section>

      {/* Progression strip */}
      <section className="reveal overflow-hidden border-b border-outline-variant/25 py-8" aria-label="Gelişim yolu">
        <div className="progress-marquee font-display text-sm font-bold uppercase tracking-[0.25em] text-arel/80 md:text-base">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex shrink-0 gap-8">
              <span>Teknik Eğitim</span>
              <span className="text-coral">→</span>
              <span>Sağlıklı Gelişim</span>
              <span className="text-coral">→</span>
              <span>Başarılı Kariyer</span>
              <span className="text-asp">·</span>
              <span>Gaziemir İzmir</span>
              <span className="text-coral">→</span>
              <span>Ücretsiz Deneme</span>
              <span className="text-asp">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* FAQ + Location */}
      <section className="reveal px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-container gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="SSS"
              title="Merak ettikleriniz"
              description="Deneme dersi, yaş ve konum — kısa cevaplar."
            />
            <FaqAccordion items={faqs.slice(0, 4)} />
            <Link
              href="/iletisim"
              className="mt-8 inline-block text-sm font-semibold text-arel hover:text-navy"
            >
              Tüm sorular ve iletişim →
            </Link>
          </div>
          <div>
            <SectionHeading eyebrow="Lokasyon" title="Gaziemir’deyiz" />
            <div className="overflow-hidden rounded-3xl border border-outline-variant/35 bg-white">
              <div className="relative h-56 md:h-72">
                <iframe
                  title="Asparel Spor Kulübü harita"
                  src={site.mapsEmbedUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-muted">{site.address.line}</p>
                <a
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-arel hover:text-navy"
                >
                  Yol tarifi al
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trial form */}
      <section className="reveal px-4 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-2xl">
          <TrialForm />
        </div>
      </section>
    </>
  );
}

function WhyItem({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="px-0 py-8 md:px-8 md:py-2 first:md:pl-0 last:md:pr-0">
      <p className="font-display text-xs font-bold tracking-[0.2em] text-asp">{index}</p>
      <h3 className="mt-3 font-display text-xl font-bold text-navy md:text-2xl">{title}</h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
