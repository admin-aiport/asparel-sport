export const site = {
  name: "Asparel Spor Kulübü",
  shortName: "ASPAREL",
  tagline: "Geleceğin Sporcularını Yetiştiriyoruz",
  description:
    "Maltepe'de lisanslı antrenörler eşliğinde basketbol, voleybol ve jimnastik altyapı eğitimi. Ücretsiz deneme dersi için hemen başvurun.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://asparelspor.com",
  phone: "0535 763 69 17",
  phoneE164: "905357636917",
  whatsappUrl: "https://wa.me/905357636917",
  email: "info@asparelspor.com",
  address: {
    line: "Zümrütevler, Maltepe / İstanbul",
    district: "Maltepe",
    city: "İstanbul",
    country: "TR",
  },
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Z%C3%BCmr%C3%BCtevler+Maltepe+%C4%B0stanbul&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Z%C3%BCmr%C3%BCtevler+Maltepe+%C4%B0stanbul",
  social: {
    instagram: "#",
  },
} as const;

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
