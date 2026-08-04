import Image from "next/image";
import Link from "next/link";
import { BranchCard, ComingSoonCard } from "@/components/BranchCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { TrialForm } from "@/components/TrialForm";
import { comingSoonBranches, getActiveBranches } from "@/data/branches";
import { faqs } from "@/data/faq";
import { site } from "@/lib/site";

export default function HomePage() {
  const branches = getActiveBranches();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(238,152,0,0.18), transparent), radial-gradient(ellipse 60% 40% at 90% 20%, rgba(53,125,241,0.12), transparent)",
          }}
        />
        <div className="mx-auto flex max-w-container flex-col items-center text-center">
          <div className="reveal mb-6 md:mb-8">
            <Image
              src="/brand/logo.png"
              alt={site.name}
              width={140}
              height={140}
              priority
              className="mx-auto h-28 w-auto drop-shadow-2xl md:h-36"
            />
          </div>
          <p className="reveal mb-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {site.name}
          </p>
          <h1 className="reveal max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Geleceğin Sporcularını{" "}
            <span className="text-secondary">Yetiştiriyoruz</span>
          </h1>
          <p className="reveal mt-5 max-w-xl text-base text-muted md:text-lg">
            Lisanslı antrenörler eşliğinde profesyonel altyapı eğitimi. Sporu sevdiriyor,
            disiplin aşılıyoruz.
          </p>
          <div className="reveal mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/iletisim#basvuru"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-base font-semibold text-white transition hover:scale-105"
            >
              Ücretsiz Deneme Dersi Al
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#branslar"
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant/50 px-8 py-4 text-base font-semibold text-foreground transition hover:border-secondary hover:text-secondary"
            >
              Branşları İncele
            </Link>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section id="branslar" className="reveal px-4 pb-20 md:px-10">
        <div className="mx-auto max-w-container">
          <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
            <SectionHeading eyebrow="Eğitimlerimiz" title="Branşlarımız" className="mb-0 md:mb-0" />
            <Link
              href="/iletisim"
              className="hidden shrink-0 pb-1 text-sm font-semibold text-primary hover:text-secondary sm:block"
            >
              Tümünü Gör
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <BranchCard key={branch.slug} branch={branch} />
            ))}
            {comingSoonBranches.map((item) => (
              <ComingSoonCard key={item.name} name={item.name} subtitle={item.subtitle} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="reveal bg-surface-low px-4 py-20 md:px-10">
        <div className="mx-auto max-w-container">
          <SectionHeading
            align="center"
            title="Neden Asparel?"
            description="Sadece bir kulüp değil, büyük bir aileyiz."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <WhyCard
              title="Lisanslı Antrenörler"
              body="Tüm hocalarımız kendi alanında uzman ve lisanslı spor insanlarıdır."
              border="border-primary"
              iconBg="bg-navy"
              icon="coaches"
            />
            <WhyCard
              title="Modern Tesisler"
              body="Hijyenik, güvenli spor alanları ve veli bekleme salonu imkanı."
              border="border-secondary-container"
              iconBg="bg-secondary-container/20"
              icon="facility"
            />
            <WhyCard
              title="Gelişim Takibi"
              body="Sporcularımızın fiziksel ve mental gelişimi düzenli olarak takip edilir."
              border="border-tertiary-strong"
              iconBg="bg-tertiary-strong/20"
              icon="growth"
            />
          </div>
        </div>
      </section>

      {/* FAQ + Location */}
      <section className="reveal px-4 py-20 md:px-10">
        <div className="mx-auto grid max-w-container gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Sıkça Sorulanlar"
              title="Merak Ettikleriniz"
              description="Deneme dersi, yaş grupları ve servis hakkında hızlı cevaplar."
            />
            <FaqAccordion items={faqs.slice(0, 4)} />
            <Link
              href="/iletisim"
              className="mt-6 inline-block text-sm font-semibold text-secondary hover:underline"
            >
              Tüm sorular ve iletişim →
            </Link>
          </div>
          <div>
            <SectionHeading eyebrow="Lokasyon" title="Konumumuz" />
            <div className="glass-panel overflow-hidden rounded-2xl p-4 md:p-6">
              <div className="relative h-56 overflow-hidden rounded-xl bg-surface-highest md:h-64">
                <iframe
                  title="Asparel Spor Kulübü harita"
                  src={site.mapsEmbedUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-sm text-muted">{site.address.line}</p>
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-secondary hover:underline"
              >
                Yol tarifi al
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA form teaser */}
      <section className="reveal px-4 pb-20 md:px-10">
        <div className="mx-auto max-w-2xl">
          <TrialForm />
        </div>
      </section>
    </>
  );
}

function WhyCard({
  title,
  body,
  border,
  iconBg,
  icon,
}: {
  title: string;
  body: string;
  border: string;
  iconBg: string;
  icon: "coaches" | "facility" | "growth";
}) {
  return (
    <div className={`rounded-2xl border-l-4 ${border} bg-surface-high p-6`}>
      <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}>
        <WhyIcon name={icon} />
      </div>
      <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-foreground">{title}</h3>
      <p className="text-sm text-muted">{body}</p>
    </div>
  );
}

function WhyIcon({ name }: { name: "coaches" | "facility" | "growth" }) {
  if (name === "coaches") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 14a4 4 0 118 0M4 20a5 5 0 0110 0M14 11a3.5 3.5 0 015.5 2.5M16 20a4 4 0 014 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "facility") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19l5-8 4 4 7-10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
