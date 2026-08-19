import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";
import { openGraphDefaults, site } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Üye girişi",
  description: "Asparel sporcu ve antrenör girişi.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/giris" },
  openGraph: {
    ...openGraphDefaults,
    title: "Üye girişi | Asparel",
    url: `${site.url}/giris`,
  },
};

export default function LoginPage() {
  return (
    <section className="pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="page-shell">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-asp">
          Üye alanı
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
          Hesaplar kulüp tarafından açılır. Henüz üye değilseniz ana sayfadan görüşme randevusu
          alın; üyeliğiniz randevu sonrası oluşturulur.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-80 rounded-3xl bg-white" />}>
            <LoginForm configured={isSupabaseConfigured()} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
