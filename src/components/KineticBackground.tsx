import type { CSSProperties } from "react";

export function KineticBackground() {
  return (
    <div className="kinetic-stage" aria-hidden>
      <div className="kinetic-orb kinetic-orb--amber" />
      <div className="kinetic-orb kinetic-orb--blue" />
      <div className="kinetic-orb kinetic-orb--red" />
      <div className="kinetic-grid" />
      <div className="kinetic-beams">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="kinetic-particles">
        {Array.from({ length: 18 }, (_, i) => (
          <i key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
      <div className="kinetic-vignette" />
    </div>
  );
}
