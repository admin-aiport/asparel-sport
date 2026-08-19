import Link from "next/link";
import { BrandWordmark } from "@/components/BrandWordmark";
import { ContactChannels } from "@/components/ContactChannels";
import { site } from "@/lib/site";
import { getActiveBranches } from "@/data/branches";

export function Footer() {
  const branches = getActiveBranches();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-outline-variant/35 bg-white pb-10 pt-14">
      <div className="page-shell grid gap-12 md:grid-cols-3">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <BrandWordmark size="lg" className="mb-4" />
          <p className="max-w-xs text-sm leading-relaxed text-muted">{site.description}</p>
        </div>

        <div className="text-center md:text-left">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-arel">
            Branşlar
          </h2>
          <ul className="space-y-2.5">
            {branches.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/branslar/${b.slug}`}
                  className="inline-flex min-h-11 items-center text-sm text-muted transition hover:text-arel"
                >
                  {b.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/iletisim" className="inline-flex min-h-11 items-center text-sm text-muted transition hover:text-arel">
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-arel">
            İletişim
          </h2>
          <ContactChannels variant="footer" />
        </div>
      </div>

      <div className="page-shell mt-12 flex flex-col items-center gap-3 border-t border-outline-variant/25 pt-7 text-center">
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/iletisim#kvkk" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-arel">
            KVKK
          </Link>
          <Link href="/iletisim#kvkk" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-arel">
            Kullanım Koşulları
          </Link>
        </div>
        <p className="text-sm text-muted/70">
          © {year} {site.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
