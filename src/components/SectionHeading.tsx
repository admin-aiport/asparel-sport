import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  children,
  className = "",
}: Props) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`mb-6 flex flex-col gap-2 md:mb-8 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-asp">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-navy md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">{description}</p>
      )}
      {children}
    </div>
  );
}
