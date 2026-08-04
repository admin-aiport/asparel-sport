import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-container flex-col items-center px-4 py-32 text-center md:px-10">
      <p className="text-sm font-bold uppercase tracking-widest text-secondary">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-5xl">
        Sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-secondary-container px-6 py-3 text-sm font-semibold text-on-primary-fixed"
      >
        Ana sayfaya dön
      </Link>
    </section>
  );
}
