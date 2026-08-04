import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-container flex-col items-center px-4 py-36 text-center md:px-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-asp">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-navy md:text-6xl">
        Sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
      </p>
      <Link
        href="/"
        className="cta-lift mt-8 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white"
      >
        Ana sayfaya dön
      </Link>
    </section>
  );
}
