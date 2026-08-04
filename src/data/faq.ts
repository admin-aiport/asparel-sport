export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Deneme dersi ücretli mi?",
    answer:
      "Hayır. Ücretsiz deneme dersi ile branşımızı ve antrenörlerimizi tanıyabilirsiniz. Form veya WhatsApp üzerinden kolayca randevu alın.",
  },
  {
    question: "Hangi yaş grupları kabul ediliyor?",
    answer:
      "Jimnastik 2–5 yaş, voleybol 8–13 yaş, basketbol 8–13 yaş aralıklarında eğitim veriyoruz. Detaylar her branş sayfasında yer alır.",
  },
  {
    question: "Servis imkanı var mı?",
    answer:
      "Servis durumu dönemsel olarak değişiklik gösterebilir. Güncel bilgi için WhatsApp hattımızdan veya iletişim formundan bize ulaşın.",
  },
  {
    question: "Antrenörler lisanslı mı?",
    answer:
      "Evet. Tüm eğitmenlerimiz kendi branşlarında lisanslı ve alanında deneyimli spor insanlarıdır.",
  },
  {
    question: "Salon nerede?",
    answer:
      "Zümrütevler, Maltepe / İstanbul konumundayız. Yol tarifi için iletişim sayfasındaki haritayı kullanabilir veya WhatsApp’tan adres isteyebilirsiniz.",
  },
];
