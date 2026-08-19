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
  /** Footer centers on mobile and shows the phone as plain text; the page uses a CTA pill. */
  variant?: "footer" | "page";
};

/** Every brand logo PNG is full-bleed square art, so one shared size keeps them uniform. */
const iconButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white p-1.5 shadow-sm ring-1 ring-outline-variant/40 transition hover:opacity-90";
const iconClass = "h-7 w-7";
const textClass = "ml-1 text-sm text-muted";

function ChannelRows({
  phone,
  centerOnMobile,
}: {
  phone: React.ReactNode;
  centerOnMobile?: boolean;
}) {
  const rowClass = `flex flex-wrap items-center gap-2${
    centerOnMobile ? " justify-center md:justify-start" : ""
  }`;

  return (
    <ul className="space-y-3">
      <li className={rowClass}>
        <Link
          href={site.bipUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={iconButtonClass}
          aria-label="BiP ile yazın"
        >
          <BipIcon className={iconClass} />
        </Link>
        <Link
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={iconButtonClass}
          aria-label="WhatsApp ile yazın"
        >
          <WhatsAppIcon className={iconClass} />
        </Link>
        {phone}
      </li>

      <li className={rowClass}>
        <Link
          href={site.social.nsosyal}
          target="_blank"
          rel="noopener noreferrer"
          className={iconButtonClass}
          aria-label={`Nsosyal ${site.social.nsosyalHandle}`}
        >
          <NsosyalIcon className={iconClass} />
        </Link>
        <Link
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={iconButtonClass}
          aria-label={`Instagram ${site.social.instagramHandle}`}
        >
          <InstagramIcon className={iconClass} />
        </Link>
        <span className={textClass}>{site.social.handle}</span>
      </li>

      <li className={rowClass}>
        <a
          href={`mailto:${site.email}`}
          className={iconButtonClass}
          aria-label={`E-posta: ${site.email}`}
        >
          <EmailIcon className={iconClass} />
        </a>
        <a href={`mailto:${site.email}`} className={`${textClass} break-all hover:text-arel`}>
          {site.email}
        </a>
      </li>
    </ul>
  );
}

export function ContactChannels({ variant = "footer" }: ContactChannelsProps) {
  if (variant === "page") {
    return (
      <ChannelRows
        phone={
          <a
            href={`tel:+${site.phoneE164}`}
            className="cta-lift ml-0 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white sm:ml-1 sm:w-auto"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">{site.address.line}</p>
      <ChannelRows
        centerOnMobile
        phone={
          <a
            href={`tel:+${site.phoneE164}`}
            className="ml-1 font-display text-xl font-bold text-navy hover:text-arel"
          >
            {site.phone}
          </a>
        }
      />
    </div>
  );
}
