import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BranchCard } from "@/components/BranchCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { TrialForm } from "@/components/TrialForm";
import { MemberAccess } from "@/components/MemberAccess";
import { getActiveBranches } from "@/data/branches";
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
      <section className="relative min-h-[70svh] overflow-hidden md:min-h-[80svh]">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <Image
            src="/brand/hero-academy.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[center_32%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/25 md:via-white/88 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
        </div>

        <div className="relative mx-auto flex min-h-[70svh] max-w-container flex-col justify-start px-4 pb-12 pt-28 md:min-h-[80svh] md:px-10 md:pb-16 md:pt-32">
          <div className="max-w-5xl lg:max-w-6xl">
            <p className="reveal reveal-delay-2 max-w-5xl text-lg leading-relaxed text-muted md:max-w-6xl md:text-xl">
              Gaziemir’de lisanslı antrenörlerle basketbol, voleybol, jimnastik ve yüzme.
              Disiplinli altyapı, güvenli salon, ücretsiz deneme dersi.
            </p>
          </div>

          <section id="branslar" className="reveal relative z-10 mt-4 md:mt-5">
            <SectionHeading
              eyebrow="Eğitimlerimiz"
              title="Branşlarımız"
              description="Yaşa özel programlar. Sertifikalı antrenörler ile temel ve teknik eğitimler, lisanslı sporcu takımları."
              className="!mb-3 md:!mb-4"
            />
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {branches.map((branch) => (
                <BranchCard key={branch.slug} branch={branch} />
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* Why Asparel — typography-led */}
      <section className="reveal border-y border-outline-variant/30 bg-surface-low/80 px-4 py-12 md:px-10 md:py-16">
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
      <section className="reveal overflow-hidden border-b border-outline-variant/25 py-5" aria-label="Gelişim yolu">
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
      <section className="reveal px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="SSS"
              title="Merak ettikleriniz"
              description="Deneme dersi, yaş ve konum — kısa cevaplar."
            />
            <FaqAccordion items={faqs.slice(0, 4)} />
            <Link
              href="/iletisim"
              className="mt-6 inline-block text-sm font-semibold text-arel hover:text-navy"
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
      <section className="reveal px-4 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto max-w-2xl">
          <TrialForm />
        </div>
      </section>

      <MemberAccess />
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
    <div className="px-0 py-5 md:px-8 md:py-1 first:md:pl-0 last:md:pr-0">
      <p className="font-display text-xs font-bold tracking-[0.2em] text-asp">{index}</p>
      <h3 className="mt-2 font-display text-xl font-bold text-navy md:text-2xl">{title}</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
