import type { Metadata } from "next";
import { ContactChannels } from "@/components/ContactChannels";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { TrialForm } from "@/components/TrialForm";
import { faqs } from "@/data/faq";
import { openGraphDefaults, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "İzmir Gaziemir İletişim & Ücretsiz Deneme Dersi",
  description: `Asparel Spor Kulübü İzmir Gaziemir iletişim — ${site.address.line}. ${site.phone}. Basketbol, voleybol, jimnastik ve yüzme için ücretsiz deneme dersi randevusu alın.`,
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
    ...openGraphDefaults,
    title: "İzmir Gaziemir İletişim & Ücretsiz Deneme Dersi | Asparel",
    description: `Asparel Spor Kulübü — ${site.address.line}. Ücretsiz deneme dersi için takvimden randevu alın.`,
    url: `${site.url}/iletisim`,
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="px-4 pb-16 pt-28 md:px-10 md:pb-20 md:pt-36">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="İletişim"
              title="Hemen başlayalım"
              description="Ücretsiz deneme için takvimden randevu alın; sorularınız için WhatsApp veya BiP’ten yazın."
            />
            <TrialForm />
          </div>
          <div className="space-y-6">
            <ContactChannels variant="page" />
            <div className="overflow-hidden rounded-3xl border border-outline-variant/35 bg-white">
              <div className="flex items-start justify-between gap-4 p-6 pb-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-navy">Şube</h2>
                  <p className="mt-2 text-sm text-muted">{site.address.line}</p>
                  <p className="mt-1 text-sm text-muted">
                    Basketbol, voleybol, jimnastik ve yüzme altyapı eğitimi.
                  </p>
                </div>
                <a
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full border border-outline-variant/50 px-4 py-2 text-sm font-semibold text-navy transition hover:border-arel hover:text-arel"
                >
                  Yol Tarifi
                </a>
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
                Randevu için paylaştığınız bilgiler Calendly ve Asparel tarafından yalnızca
                deneme dersi planlaması ve bilgilendirme amacıyla kullanılır; ticari amaçla
                üçüncü taraflarla paylaşılmaz.
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
