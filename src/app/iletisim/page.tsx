import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { TrialForm } from "@/components/TrialForm";
import { faqs } from "@/data/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "İzmir Gaziemir İletişim & Ücretsiz Deneme Dersi",
  description: `Asparel Spor Kulübü İzmir Gaziemir iletişim — ${site.address.line}. ${site.phone}. Basketbol, voleybol ve jimnastik için ücretsiz deneme dersi randevusu alın.`,
  keywords: [
    "Asparel Spor Kulübü iletişim",
    "Gaziemir deneme dersi",
    "İzmir spor kulübü iletişim",
    "Gaziemir basketbol deneme",
  ],
  alternates: {
    canonical: "/iletisim",
  },
  openGraph: {
    title: "İzmir Gaziemir İletişim & Ücretsiz Deneme Dersi | Asparel",
    description: `Asparel Spor Kulübü — ${site.address.line}. Ücretsiz deneme dersi için hemen yazın.`,
    url: `${site.url}/iletisim`,
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="px-4 pb-8 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-container">
          <SectionHeading
            eyebrow="İletişim"
            title="Hemen başlayalım"
            description="Ücretsiz deneme, branş seçimi veya salon ziyareti için formu doldurun ya da WhatsApp’tan yazın."
          />
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:+${site.phoneE164}`}
              className="cta-lift rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white"
            >
              {site.phone}
            </a>
            <Link
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-lift rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white"
            >
              WhatsApp
            </Link>
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-outline-variant/50 px-6 py-3 text-sm font-semibold text-navy transition hover:border-arel hover:text-arel"
            >
              Yol Tarifi
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2 lg:gap-14">
          <TrialForm />
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-outline-variant/35 bg-white">
              <div className="p-6 pb-4">
                <h2 className="font-display text-xl font-bold text-navy">Şube</h2>
                <p className="mt-2 text-sm text-muted">{site.address.line}</p>
                <p className="mt-1 text-sm text-muted">
                  Basketbol, voleybol ve jimnastik altyapı eğitimi.
                </p>
              </div>
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
            </div>
            <div
              id="kvkk"
              className="rounded-3xl border border-outline-variant/35 bg-surface-low p-6 text-sm leading-relaxed text-muted"
            >
              <h2 className="mb-2 font-display text-base font-bold text-navy">
                KVKK &amp; Gizlilik
              </h2>
              <p>
                Formdaki ad, telefon ve mesaj yalnızca deneme dersi ve bilgilendirme için
                kullanılır; ticari amaçla üçüncü taraflarla paylaşılmaz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant/30 bg-surface-low/60 px-4 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading align="center" eyebrow="SSS" title="Sıkça sorulan sorular" />
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
