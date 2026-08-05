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
    email: site.email,
    image: `${site.url}/brand/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.district,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Gaziemir",
      },
      {
        "@type": "City",
        name: "İzmir",
      },
    ],
    sameAs: [
      site.whatsappUrl,
      site.bipUrl,
      site.social.instagram,
      site.social.nsosyal,
    ],
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
          areaServed: {
            "@type": "Place",
            name: "Gaziemir, İzmir",
          },
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
