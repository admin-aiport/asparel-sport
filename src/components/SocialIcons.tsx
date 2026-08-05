type IconProps = {
  className?: string;
};

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.12-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.21 1.3.18 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.11-.26-.18-.55-.32zM12.05 2C6.5 2 2 6.49 2 12.03c0 1.78.47 3.51 1.36 5.03L2 22l5.07-1.33A10 10 0 0012.05 22C17.6 22 22 17.51 22 11.97 22 6.49 17.6 2 12.05 2zm0 18.2c-1.55 0-3.07-.42-4.4-1.2l-.31-.19-3.01.79.8-2.94-.2-.3A8.2 8.2 0 013.8 12.03c0-4.55 3.7-8.24 8.25-8.24s8.25 3.69 8.25 8.24c0 4.55-3.7 8.17-8.25 8.17z" />
    </svg>
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
