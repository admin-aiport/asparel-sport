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
  accent: "basketball" | "volleyball" | "gymnastics" | "swimming";
  accentHex: string;
  icon: "basketball" | "volleyball" | "gymnastics" | "swimming";
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
    ageRangeLabel: "6-15 Yaş",
    ageGroups: [
      { label: "6-7 Yaş Grubu", subtitle: "Koordinasyon ve top tanışması" },
      { label: "8-9 Yaş Grubu", subtitle: "Top hakimiyeti ve temel teknik" },
      { label: "10-11 Yaş Grubu", subtitle: "Takım oyunu ve pas ritmi" },
      { label: "12-13 Yaş Grubu", subtitle: "Taktik ve maç hazırlığı" },
      { label: "14-15 Yaş Grubu", subtitle: "Performans ve lisanslı sporcu adımları" },
    ],
    accent: "basketball",
    accentHex: "#ee9800",
    icon: "basketball",
    image: "/brand/basketbol-poster.png",
    imageAlt: "Asparel Basketbol — lisanslı sporcu kariyerine başla",
    highlights: [
      "Yaşa özel teknik ve koordinasyon",
      "Takım ruhu ve disiplin odaklı antrenman",
      "Lisanslı sporcu kariyerine sağlam temel",
    ],
    progression: ["Teknik Eğitim", "Sağlıklı Gelişim", "Başarılı Kariyer"],
    seoTitle: "Gaziemir Basketbol Kursu | Asparel Spor Kulübü İzmir",
    seoDescription:
      "Gaziemir İzmir’de 6–15 yaş basketbol kursu. Lisanslı antrenörler, yaş grupları ve ücretsiz deneme dersi — Asparel Spor Kulübü.",
  },
  {
    slug: "yuzme",
    name: "Yüzme",
    shortDescription:
      "2’den 70’e her yaşa uygun, sertifikalı antrenörlerle teknik yüzme.",
    longDescription:
      "Asparel Yüzme’de 2–70 yaş arası herkes için temel ve teknik yüzme eğitimi verilir. Sertifikalı antrenörlerle suya alışma, teknik gelişim, performans ve yarışma hazırlığı birlikte ilerler.",
    ageRangeLabel: "2-70 Yaş",
    ageGroups: [
      { label: "2-5 Yaş Grubu", subtitle: "Suya alışma ve temel güvenlik" },
      { label: "6-11 Yaş Grubu", subtitle: "Temel yüzme eğitimi" },
      { label: "12-17 Yaş Grubu", subtitle: "Teknik ve performans gelişimi" },
      { label: "18-70 Yaş", subtitle: "Yetişkin teknik yüzme ve kondisyon" },
    ],
    accent: "swimming",
    accentHex: "#00a3d9",
    icon: "swimming",
    image: "/brand/yuzme-poster.png",
    imageAlt: "Asparel Yüzme — sertifikalı antrenörlerle teknik yüzme öğren",
    highlights: [
      "Temel yüzme eğitimi",
      "Teknik ve performans gelişimi",
      "Sağlıklı ve disiplinli yaşam",
      "Yarışma hazırlığı",
    ],
    progression: ["Teknik Eğitim", "Sağlıklı Gelişim", "Başarılı Kariyer"],
    seoTitle: "Gaziemir Yüzme Kursu | Asparel Spor Kulübü İzmir",
    seoDescription:
      "Gaziemir İzmir’de 2–70 yaş yüzme kursu. Sertifikalı antrenörlerle temel ve teknik yüzme, ücretsiz deneme dersi — Asparel Spor Kulübü.",
  },
];

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

export function getActiveBranches(): Branch[] {
  return branches.filter((b) => !b.comingSoon);
}
