import { Plus_Jakarta_Sans, Syne } from "next/font/google";
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

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | İzmir Gaziemir Spor Kulübü`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | İzmir Gaziemir Basketbol, Voleybol & Jimnastik`,
    description: site.description,
    images: [
      {
        url: "/brand/logo.png",
        width: 512,
        height: 512,
        alt: `${site.name} — İzmir Gaziemir`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | İzmir Gaziemir Spor Kulübü`,
    description: site.description,
    images: ["/brand/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/brand/logo.png", type: "image/png" }],
    apple: [{ url: "/brand/logo.png", type: "image/png" }],
    shortcut: "/brand/logo.png",
  },
  keywords: [
    "İzmir spor kulübü",
    "Gaziemir spor kulübü",
    "Gaziemir basketbol kursu",
    "Gaziemir voleybol kursu",
    "Gaziemir jimnastik kursu",
    "İzmir basketbol kursu",
    "İzmir voleybol kursu",
    "İzmir jimnastik kursu",
    "Asparel Spor Kulübü",
    "çocuk spor akademisi İzmir",
    "ücretsiz deneme dersi",
  ],
  category: "sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${plusJakarta.variable} ${syne.variable} h-full`}>
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
