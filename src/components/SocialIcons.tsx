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
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 7.2A4.8 4.8 0 1016.8 12 4.81 4.81 0 0012 7.2zm0 7.92A3.12 3.12 0 1115.12 12 3.13 3.13 0 0112 15.12z" />
      <circle cx="17.34" cy="6.72" r="1.12" />
      <path d="M12 2.16c-2.68 0-3.01.01-4.07.06a7.12 7.12 0 00-2.35.45 4.74 4.74 0 00-1.71 1.11 4.74 4.74 0 00-1.11 1.71 7.12 7.12 0 00-.45 2.35c-.05 1.06-.06 1.39-.06 4.07s.01 3.01.06 4.07a7.12 7.12 0 00.45 2.35 4.74 4.74 0 001.11 1.71 4.74 4.74 0 001.71 1.11 7.12 7.12 0 002.35.45c1.06.05 1.39.06 4.07.06s3.01-.01 4.07-.06a7.12 7.12 0 002.35-.45 4.94 4.94 0 002.82-2.82 7.12 7.12 0 00.45-2.35c.05-1.06.06-1.39.06-4.07s-.01-3.01-.06-4.07a7.12 7.12 0 00-.45-2.35 4.74 4.74 0 00-1.11-1.71 4.74 4.74 0 00-1.71-1.11 7.12 7.12 0 00-2.35-.45c-1.06-.05-1.39-.06-4.07-.06zm0 1.62c2.63 0 2.94.01 3.98.06a5.5 5.5 0 011.83.34 3.12 3.12 0 011.79 1.79 5.5 5.5 0 01.34 1.83c.05 1.04.06 1.35.06 3.98s-.01 2.94-.06 3.98a5.5 5.5 0 01-.34 1.83 3.12 3.12 0 01-1.79 1.79 5.5 5.5 0 01-1.83.34c-1.04.05-1.35.06-3.98.06s-2.94-.01-3.98-.06a5.5 5.5 0 01-1.83-.34 3.12 3.12 0 01-1.79-1.79 5.5 5.5 0 01-.34-1.83c-.05-1.04-.06-1.35-.06-3.98s.01-2.94.06-3.98a5.5 5.5 0 01.34-1.83 3.12 3.12 0 011.79-1.79 5.5 5.5 0 011.83-.34c1.04-.05 1.35-.06 3.98-.06z" />
    </svg>
  );
}

/** Stylized N for Nsosyal */
export function NsosyalIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 4.5h3.2l4.6 9.4V4.5h3.2v15h-3.2l-4.6-9.4v9.4H6.5v-15z" />
    </svg>
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
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M4.5 7.5L12 13l7.5-5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
