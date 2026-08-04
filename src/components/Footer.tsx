import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getActiveBranches } from "@/data/branches";

export function Footer() {
  const branches = getActiveBranches();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-outline-variant/40 bg-white px-4 pb-8 pt-12 md:px-10">
      <div className="mx-auto grid max-w-container gap-10 md:grid-cols-3">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-3 flex items-center gap-2">
            <Image
              src="/brand/logo.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-extrabold italic tracking-tighter text-foreground">
              {site.shortName}
            </span>
          </div>
          <p className="max-w-xs text-sm text-muted">{site.description}</p>
        </div>

        <div className="text-center md:text-left">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-secondary">
            Branşlar
          </h2>
          <ul className="space-y-2">
            {branches.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/branslar/${b.slug}`}
                  className="text-sm text-muted transition hover:text-secondary"
                >
                  {b.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/iletisim" className="text-sm text-muted transition hover:text-secondary">
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-secondary">
            İletişim
          </h2>
          <p className="text-sm text-muted">{site.address.line}</p>
          <a
            href={`tel:+${site.phoneE164}`}
            className="mt-2 block text-lg font-bold text-foreground hover:text-secondary"
          >
            {site.phone}
          </a>
          <Link
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-whatsapp hover:opacity-80"
          >
            WhatsApp ile yazın
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-container flex-col items-center gap-3 border-t border-outline-variant/20 pt-6 text-center">
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/iletisim#kvkk" className="text-sm text-muted hover:text-secondary">
            KVKK
          </Link>
          <Link href="/iletisim#kvkk" className="text-sm text-muted hover:text-secondary">
            Kullanım Koşulları
          </Link>
        </div>
        <p className="text-sm text-muted opacity-60">
          © {year} {site.name}. Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
}
