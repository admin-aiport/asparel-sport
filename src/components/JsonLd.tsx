import { site } from "@/lib/site";
import { getActiveBranches } from "@/data/branches";

export function JsonLd() {
  const branches = getActiveBranches();
  const data = {
    "@context": "https://schema.org",
    "@type": ["SportsClub", "LocalBusiness"],
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: `+${site.phoneE164}`,
    image: `${site.url}/brand/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.district,
      addressRegion: site.address.city,
      addressCountry: site.address.country,
      streetAddress: site.address.line,
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "Place",
      name: "Maltepe, İstanbul",
    },
    sameAs: [site.whatsappUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Spor Branşları",
      itemListElement: branches.map((b) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${b.name} Eğitimi`,
          description: b.shortDescription,
          url: `${site.url}/branslar/${b.slug}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
