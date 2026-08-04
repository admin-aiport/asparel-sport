import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { RevealObserver } from "@/components/RevealObserver";
import { KineticBackground } from "@/components/KineticBackground";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/brand/logo.png", width: 512, height: 512, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/brand/logo.png", type: "image/png" }],
    apple: [{ url: "/brand/logo.png", type: "image/png" }],
    shortcut: "/brand/logo.png",
  },
  keywords: [
    "Maltepe basketbol kursu",
    "Maltepe voleybol kursu",
    "Maltepe jimnastik kursu",
    "Asparel Spor Kulübü",
    "çocuk spor akademisi",
    "ücretsiz deneme dersi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${plusJakarta.variable} h-full`}>
      <body className="relative flex min-h-full flex-col font-sans antialiased pb-24 md:pb-0">
        <KineticBackground />
        <JsonLd />
        <RevealObserver />
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <div className="relative z-10">
          <Footer />
        </div>
        <WhatsAppFab />
        <BottomNav />
      </body>
    </html>
  );
}
