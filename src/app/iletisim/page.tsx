import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { TrialForm } from "@/components/TrialForm";
import { faqs } from "@/data/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim & Ücretsiz Deneme Dersi",
  description: `Asparel Spor Kulübü iletişim — ${site.address.line}. Telefon ${site.phone}. Ücretsiz deneme dersi için hemen başvurun.`,
  alternates: {
    canonical: "/iletisim",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="px-4 pb-10 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-container">
          <SectionHeading
            eyebrow="İletişim"
            title="Bize Ulaşın"
            description="Ücretsiz deneme dersi, branş seçimi veya salon ziyareti için formu doldurun ya da WhatsApp’tan yazın."
          />
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:+${site.phoneE164}`}
              className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {site.phone}
            </a>
            <Link
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              WhatsApp
            </Link>
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-outline-variant/50 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-secondary hover:text-secondary"
            >
              Yol Tarifi
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-10">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2">
          <TrialForm />
          <div className="space-y-6">
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="mb-3 text-xl font-bold">Şube Bilgisi</h2>
              <p className="text-sm text-muted">{site.address.line}</p>
              <p className="mt-2 text-sm text-muted">
                Basketbol, voleybol ve jimnastik branşlarında altyapı eğitimi.
              </p>
              <div className="relative mt-4 h-56 overflow-hidden rounded-xl bg-surface-highest md:h-72">
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
            <div id="kvkk" className="rounded-2xl border border-outline-variant/30 bg-surface-high p-6 text-sm text-muted">
              <h2 className="mb-2 text-base font-bold text-foreground">KVKK &amp; Gizlilik</h2>
              <p>
                İletişim formunda paylaştığınız ad, telefon ve mesaj bilgileri yalnızca deneme
                dersi ve bilgilendirme amacıyla kullanılır. Verileriniz üçüncü taraflarla
                ticari amaçla paylaşılmaz. Talepleriniz için WhatsApp veya telefon hattımızdan
                bize ulaşabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-low px-4 py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="SSS"
            title="Sıkça Sorulan Sorular"
          />
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
