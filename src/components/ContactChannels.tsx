import Link from "next/link";
import {
  BipIcon,
  EmailIcon,
  InstagramIcon,
  NsosyalIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/SocialIcons";
import { site } from "@/lib/site";

type ContactChannelsProps = {
  /** Compact icon row (footer) vs fuller action buttons (contact page) */
  variant?: "footer" | "page";
};

export function ContactChannels({ variant = "footer" }: ContactChannelsProps) {
  if (variant === "page") {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:+${site.phoneE164}`}
            className="cta-lift inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
          <Link
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-lift inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </Link>
          <Link
            href={site.bipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-lift inline-flex items-center gap-2 rounded-full border border-outline-variant/40 bg-white px-5 py-3 text-sm font-semibold text-navy"
          >
            <BipIcon className="h-6 w-6" />
            BiP
          </Link>
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-outline-variant/50 px-5 py-3 text-sm font-semibold text-navy transition hover:border-arel hover:text-arel"
          >
            Yol Tarifi
          </a>
        </div>

        <ul className="flex flex-col gap-2.5 text-sm">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-medium text-navy transition hover:text-arel"
            >
              <EmailIcon className="h-4 w-4 text-muted" />
              {site.email}
            </a>
          </li>
          <li>
            <Link
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-navy transition hover:text-arel"
            >
              <InstagramIcon className="h-4 w-4 text-muted" />
              Instagram {site.social.instagramHandle}
            </Link>
          </li>
          <li>
            <Link
              href={site.social.nsosyal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-navy transition hover:text-arel"
            >
              <NsosyalIcon className="h-4 w-4 text-muted" />
              Nsosyal {site.social.nsosyalHandle}
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">{site.address.line}</p>
      <a
        href={`tel:+${site.phoneE164}`}
        className="block font-display text-xl font-bold text-navy hover:text-arel"
      >
        {site.phone}
      </a>

      <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
        <Link
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-white transition hover:opacity-90"
          aria-label="WhatsApp ile yazın"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </Link>
        <Link
          href={site.bipUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-outline-variant/40 transition hover:opacity-90"
          aria-label="BiP ile yazın"
        >
          <BipIcon className="h-8 w-8" />
        </Link>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition hover:opacity-90"
          aria-label={`E-posta: ${site.email}`}
        >
          <EmailIcon className="h-4 w-4" />
        </a>
        <Link
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E1306C] text-white transition hover:opacity-90"
          aria-label={`Instagram ${site.social.instagramHandle}`}
        >
          <InstagramIcon className="h-4 w-4" />
        </Link>
        <Link
          href={site.social.nsosyal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-arel text-white transition hover:opacity-90"
          aria-label={`Nsosyal ${site.social.nsosyalHandle}`}
        >
          <NsosyalIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-1 text-sm text-muted">
        <a href={`mailto:${site.email}`} className="block hover:text-arel">
          {site.email}
        </a>
        <Link
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-arel"
        >
          Instagram {site.social.instagramHandle}
        </Link>
        <Link
          href={site.social.nsosyal}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-arel"
        >
          Nsosyal {site.social.nsosyalHandle}
        </Link>
      </div>
    </div>
  );
}
