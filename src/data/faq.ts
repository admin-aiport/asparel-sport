export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Deneme dersi ücretli mi?",
    answer:
      "Hayır — ücretsizdir. Takvimden (Calendly) randevu alıp branşı ve antrenörü yerinde deneyebilirsiniz.",
  },
  {
    question: "Hangi yaş grupları kabul ediliyor?",
    answer:
      "Jimnastik 2–11, basketbol ve voleybol 8–13 yaş. Detaylar her branş sayfasında.",
  },
  {
    question: "Servis var mı?",
    answer:
      "Döneme göre değişebilir. Güncel bilgi için WhatsApp’tan sorun.",
  },
  {
    question: "Antrenörler lisanslı mı?",
    answer:
      "Evet. Eğitmenlerimiz branşlarında lisanslı ve çocuk gelişimine hakim.",
  },
  {
    question: "Salon nerede?",
    answer:
      "Gaziemir / İzmir. Harita ve yol tarifi iletişim sayfasında.",
  },
];
