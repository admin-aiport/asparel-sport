type IconProps = {
  className?: string;
};

/** Official WhatsApp logo PNG (rendered from whatsapp-logo.svg) */
export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/whatsapp-logo.png"
      alt=""
      className={`object-contain ${className}`}
      width={32}
      height={32}
      decoding="async"
      aria-hidden
    />
  );
}

/** Official BiP logo PNG (Wikimedia / bip.com) */
export function BipIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/bip-logo.png"
      alt=""
      className={`object-contain ${className}`}
      width={32}
      height={32}
      decoding="async"
      aria-hidden
    />
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/instagram-logo.png"
      alt=""
      className={`object-contain ${className}`}
      width={32}
      height={32}
      decoding="async"
      aria-hidden
    />
  );
}

/** Official NSosyal logo PNG (nsosyal.com) */
export function NsosyalIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/nsosyal-logo.png"
      alt=""
      className={`object-contain ${className}`}
      width={32}
      height={32}
      decoding="async"
      aria-hidden
    />
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5h2.2l1 3.2-1.6 1.1a12.5 12.5 0 005.3 5.3l1.1-1.6 3.2 1v2.2a2 2 0 01-2.1 2A14.5 14.5 0 016.5 6.6a2 2 0 012-2.1z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmailIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/email-icon.png"
      alt=""
      className={`object-contain ${className}`}
      width={32}
      height={32}
      decoding="async"
      aria-hidden
    />
  );
}
