export type AgeGroup = {
  label: string;
  subtitle?: string;
};

export type Branch = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  ageRangeLabel: string;
  ageGroups: AgeGroup[];
  accent: "basketball" | "volleyball" | "gymnastics";
  accentHex: string;
  icon: "basketball" | "volleyball" | "gymnastics";
  image?: string;
  imageAlt?: string;
  highlights: string[];
  progression: string[];
  seoTitle: string;
  seoDescription: string;
  comingSoon?: boolean;
};

export const branches: Branch[] = [
  {
    slug: "voleybol",
    name: "Voleybol",
    shortDescription:
      "Pas, smaç ve iletişimle sahada özgüvenli bir oyun anlayışı.",
    longDescription:
      "Voleybol branşımızda teknik (pas, manşet, smaç) ile takım içi iletişim birlikte çalışılır. Grup derslerinde çocuklar hem motor hem sosyal becerilerini güçlendirir.",
    ageRangeLabel: "8-13 Yaş",
    ageGroups: [
      { label: "8-10 Yaş Grubu", subtitle: "Temel voleybol becerileri" },
      { label: "11-12 Yaş Grubu", subtitle: "Pas, smaç ve takım oyunu" },
      { label: "12-13 Yaş Grubu", subtitle: "Teknik derinleşme ve maç ritmi" },
    ],
    accent: "volleyball",
    accentHex: "#357df1",
    icon: "volleyball",
    image: "/brand/voleybol-poster.jpg",
    imageAlt: "Asparel Voleybol — lisanslı sporcu kariyerine başla",
    highlights: [
      "Smaç ve pas teknikleri",
      "Takım içi iletişim ve oyun okuma",
      "Yaş gruplarına özel grup dersleri",
    ],
    progression: ["Teknik Eğitim", "Sağlıklı Gelişim", "Başarılı Kariyer"],
    seoTitle: "Gaziemir Voleybol Kursu | Asparel Spor Kulübü İzmir",
    seoDescription:
      "Gaziemir İzmir’de 8–13 yaş voleybol kursu. Smaç, pas ve lisanslı antrenörler. Ücretsiz deneme dersi için Asparel.",
  },
  {
    slug: "jimnastik",
    name: "Jimnastik",
    shortDescription:
      "2–11 yaş motor beceri, esneklik, denge ve eğlenceli hareket eğitimi.",
    longDescription:
      "Jimnastik programımız 2–11 yaş arası çocuklara yöneliktir. Oyun ve hareketle başlar; koordinasyon, temel hareketler, esneklik, denge ve teknik beceriler yaş gruplarına göre güvenli bir ortamda gelişir. Lisanslı antrenörlerle spor sevgisi erken yaşta kök salar.",
    ageRangeLabel: "2-11 Yaş",
    ageGroups: [
      { label: "2-3 Yaş Grubu", subtitle: "Oyun ve Hareket" },
      { label: "4-5 Yaş Grubu", subtitle: "Koordinasyon" },
      { label: "6-7 Yaş Grubu", subtitle: "Temel Hareketler" },
      { label: "8-9 Yaş Grubu", subtitle: "Esneklik ve Denge" },
      { label: "10-11 Yaş Grubu", subtitle: "Teknik Beceriler" },
    ],
    accent: "gymnastics",
    accentHex: "#e85a7a",
    icon: "gymnastics",
    image: "/brand/jimnastik-poster.jpg",
    imageAlt: "Asparel Jimnastik — lisanslı antrenörlerle sporcu temelleri",
    highlights: [
      "Temel motor beceriler",
      "Esneklik ve denge",
      "Eğlenceli, güvenli erken yaş eğitimi",
    ],
    progression: ["Temel Motor Beceriler", "Esneklik & Denge", "Eğlenceli Eğitim"],
    seoTitle: "Gaziemir Jimnastik Kursu | Asparel Spor Kulübü İzmir",
    seoDescription:
      "Gaziemir İzmir’de 2–11 yaş jimnastik. Oyun, koordinasyon, esneklik ve teknik beceriler. Lisanslı antrenörlerle ücretsiz deneme dersi.",
  },
  {
    slug: "basketbol",
    name: "Basketbol",
    shortDescription:
      "Top hakimiyeti, takım oyunu ve disiplinle lisanslı sporcu adımları.",
    longDescription:
      "Asparel Basketbol’da çocuklar yaş grubuna göre ilerler: temel koordinasyondan takım taktiklerine. Lisanslı antrenörlerle çeviklik, pas ve maç bilinci birlikte gelişir.",
    ageRangeLabel: "8-13 Yaş",
    ageGroups: [
      { label: "8-10 Yaş Grubu", subtitle: "Koordinasyon ve top hakimiyeti" },
      { label: "11-12 Yaş Grubu", subtitle: "Takım oyunları ve temel taktik" },
      { label: "12-13 Yaş Grubu", subtitle: "Performans ve maç hazırlığı" },
    ],
    accent: "basketball",
    accentHex: "#ee9800",
    icon: "basketball",
    highlights: [
      "Yaşa özel teknik ve koordinasyon",
      "Takım ruhu ve disiplin odaklı antrenman",
      "Lisanslı sporcu kariyerine sağlam temel",
    ],
    progression: ["Teknik Eğitim", "Sağlıklı Gelişim", "Başarılı Kariyer"],
    seoTitle: "Gaziemir Basketbol Kursu | Asparel Spor Kulübü İzmir",
    seoDescription:
      "Gaziemir İzmir’de 8–13 yaş basketbol kursu. Lisanslı antrenörler, yaş grupları ve ücretsiz deneme dersi — Asparel Spor Kulübü.",
  },
];

export const comingSoonBranches = [
  {
    name: "Yakında",
    subtitle: "Yüzme",
  },
] as const;

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

export function getActiveBranches(): Branch[] {
  return branches.filter((b) => !b.comingSoon);
}
