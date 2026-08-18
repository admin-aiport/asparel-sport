type Props = {
  name: "basketball" | "volleyball" | "gymnastics" | "swimming";
  className?: string;
};

export function SportIcon({ name, className = "h-6 w-6" }: Props) {
  if (name === "basketball") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 3c2.5 3 2.5 15 0 18M3.5 9.5c6 1.5 11 1.5 17 0M3.5 14.5c6-1.5 11-1.5 17 0"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }
  if (name === "volleyball") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M5 8c3 2 8 3 14 1M4 14c4-1 10 0 15 3M12 3c1 4 0 10-3 15"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }
  if (name === "swimming") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 16.5c1.4-1 2.8-1 4.2 0s2.8 1 4.2 0 2.8-1 4.2 0 2.8 1 4.2 0M3 20c1.4-1 2.8-1 4.2 0s2.8 1 4.2 0 2.8-1 4.2 0 2.8 1 4.2 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="16.5" cy="6.5" r="1.6" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M14.8 9.2c-1.6 1-3.2 2.2-3.8 4.2M11.2 10.4c1.4.3 2.6 0 4.2-.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v4M8 21l2-8 2 3 2-3 2 8M6 9c2-2 10-2 12 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
