import type { Metadata } from "next";

export const site = {
  name: "Asparel Spor Kulübü",
  shortName: "ASPAREL",
  tagline: "Güç, disiplin ve takım ruhu",
  description:
    "İzmir Gaziemir’de basketbol, voleybol ve jimnastik altyapısı. Lisanslı antrenörler, yaşa özel programlar ve ücretsiz deneme dersi.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://asparel.tr",
  phone: "0535 763 69 17",
  phoneE164: "905357636917",
  whatsappUrl: "https://wa.me/905357636917",
  /** BiP has no public wa.me-style chat deep link; web.bip.com opens BiP Web (best available). */
  bipUrl: "https://web.bip.com",
  email: "antrenor@asparel.tr",
  address: {
    line: "Gaziemir / İzmir",
    street: "Gaziemir",
    district: "Gaziemir",
    city: "İzmir",
    region: "İzmir",
    country: "TR",
  },
  geo: {
    latitude: 38.3214,
    longitude: 27.1281,
  },
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Gaziemir+%C4%B0zmir&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Gaziemir+%C4%B0zmir",
  social: {
    instagram: "https://instagram.com/asparelspor",
    nsosyal: "https://nsosyal.com/asparelspor",
    instagramHandle: "@asparelspor",
    nsosyalHandle: "@asparelspor",
    /** Same handle on both platforms, shown once where the icons identify the platform. */
    handle: "@asparelspor",
  },
} as const;

export const ogImage = {
  url: "/brand/og-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — İzmir Gaziemir`,
};

/**
 * Next merges `openGraph` shallowly, so a segment that sets it replaces the whole
 * object from its parent. Every segment must respread these defaults.
 */
export const openGraphDefaults = {
  type: "website",
  locale: "tr_TR",
  siteName: site.name,
  images: [ogImage],
} satisfies NonNullable<Metadata["openGraph"]>;

export function whatsappTrialMessage(params?: {
  name?: string;
  branch?: string;
  ageGroup?: string;
  message?: string;
}) {
  const lines = [
    "Merhaba Asparel Spor Kulübü,",
    "Ücretsiz deneme dersi için başvurmak istiyorum.",
  ];
  if (params?.name) lines.push(`Ad Soyad: ${params.name}`);
  if (params?.branch) lines.push(`Branş: ${params.branch}`);
  if (params?.ageGroup) lines.push(`Yaş grubu: ${params.ageGroup}`);
  if (params?.message) lines.push(`Mesaj: ${params.message}`);
  return `${site.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
}
