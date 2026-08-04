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
    slug: "basketbol",
    name: "Basketbol",
    shortDescription:
      "Koordinasyon, takım oyunu ve altyapı takımlarıyla disiplinli basketbol eğitimi.",
    longDescription:
      "Asparel Basketbol branşında çocuklar ve gençler, temel top hakimiyetinden takım taktiklerine kadar aşamalı bir programla gelişir. Lisanslı antrenörler eşliğinde koordinasyon, çeviklik ve maç deneyimi odaklı antrenmanlar sunuyoruz.",
    ageRangeLabel: "8-13 Yaş Grubu",
    ageGroups: [
      { label: "8-10 Yaş Grubu", subtitle: "Temel koordinasyon ve top hakimiyeti" },
      { label: "11-12 Yaş Grubu", subtitle: "Takım oyunları ve temel taktikler" },
      { label: "12-13 Yaş Grubu", subtitle: "Altyapı takımları ve performans" },
    ],
    accent: "basketball",
    accentHex: "#ee9800",
    icon: "basketball",
    highlights: [
      "Koordinasyon ve çeviklik antrenmanları",
      "Altyapı takımı deneyimi",
      "Disiplin ve takım ruhu odaklı gelişim",
    ],
    progression: [
      "Teknik Eğitim",
      "Sağlıklı Gelişim",
      "Başarılı Kariyer",
    ],
    seoTitle: "Maltepe Basketbol Kursu | Asparel Spor Kulübü",
    seoDescription:
      "Maltepe'de 8-13 yaş basketbol kursu. Lisanslı antrenörler, altyapı takımları ve ücretsiz deneme dersi. Asparel Spor Kulübü.",
  },
  {
    slug: "voleybol",
    name: "Voleybol",
    shortDescription:
      "Smaç, pas ve takım içi iletişimle lisanslı sporcu kariyerine ilk adım.",
    longDescription:
      "Voleybol branşımızda smaç ve pas teknikleri, blok çalışmaları ve takım içi iletişim ön plandadır. Yaş gruplarına özel programlarla çocuklar hem teknik hem de sosyal becerilerini geliştirir.",
    ageRangeLabel: "8-13 Yaş Grubu",
    ageGroups: [
      { label: "8-10 Yaş Grubu", subtitle: "Temel voleybol becerileri" },
      { label: "11-12 Yaş Grubu", subtitle: "Pas, smaç ve takım oyunları" },
      { label: "12-13 Yaş Grubu", subtitle: "Teknik derinleşme ve maç hazırlığı" },
    ],
    accent: "volleyball",
    accentHex: "#357df1",
    icon: "volleyball",
    image: "/brand/voleybol-poster.png",
    imageAlt: "Asparel Voleybol — lisanslı sporcu kariyerine başla",
    highlights: [
      "Smaç ve pas teknikleri",
      "Takım içi iletişim",
      "Grup dersleri ve yaşa özel programlar",
    ],
    progression: [
      "Teknik Eğitim",
      "Sağlıklı Gelişim",
      "Başarılı Kariyer",
    ],
    seoTitle: "Maltepe Voleybol Kursu | Asparel Spor Kulübü",
    seoDescription:
      "Maltepe'de 8-13 yaş voleybol kursu. Smaç, pas teknikleri ve lisanslı antrenörler. Ücretsiz deneme dersi için Asparel Spor Kulübü.",
  },
  {
    slug: "jimnastik",
    name: "Jimnastik",
    shortDescription:
      "Erken yaşta motor beceriler, esneklik ve eğlenceli temel spor eğitimi.",
    longDescription:
      "Jimnastik programımız erken yaş spor eğitimiyle temel motor becerileri, esneklik ve dengeyi güçlendirir. Lisanslı antrenörlerle oyun temelli ve güvenli bir ortamda çocuklar spora sevgiyle başlar.",
    ageRangeLabel: "2-5 Yaş Grubu",
    ageGroups: [
      { label: "2-4 Yaş Grubu", subtitle: "Oyun ve Hareket" },
      { label: "4-5 Yaş Grubu", subtitle: "Temel Beceriler" },
    ],
    accent: "gymnastics",
    accentHex: "#e31e24",
    icon: "gymnastics",
    image: "/brand/jimnastik-poster.png",
    imageAlt: "Asparel Jimnastik — lisanslı antrenörlerle sporcu temelleri",
    highlights: [
      "Temel motor beceriler",
      "Esneklik ve denge",
      "Eğlenceli, güvenli erken yaş eğitimi",
    ],
    progression: [
      "Temel Motor Beceriler",
      "Esneklik & Denge",
      "Eğlenceli Eğitim",
    ],
    seoTitle: "Maltepe Jimnastik Kursu | Asparel Spor Kulübü",
    seoDescription:
      "Maltepe'de 2-5 yaş jimnastik kursu. Oyun, hareket ve temel beceriler. Lisanslı antrenörlerle ücretsiz deneme dersi.",
  },
];

export const comingSoonBranches = [
  {
    name: "Yakında Yeni Branşlar",
    subtitle: "Tenis & Futbol Akademisi",
  },
] as const;

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

export function getActiveBranches(): Branch[] {
  return branches.filter((b) => !b.comingSoon);
}
