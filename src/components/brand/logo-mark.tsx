import { useId } from "react";

type LogoMarkProps = {
  /** Rendered size in pixels. */
  size?: number;
  /** "construction" adds the outer ring, crosshair axes, and endpoint nodes. */
  variant?: "plain" | "construction";
  /** "mono" renders a single-tone version for constrained contexts. */
  tone?: "color" | "mono";
  /** Soft colored halo behind the filled arcs — hero/brand moments only. */
  glow?: boolean;
  /** Set when the mark is purely decorative next to visible text. */
  decorative?: boolean;
  className?: string;
};

/**
 * The Quadrant Collective mark (docs/BRAND.md, Appendix — Logo geometry):
 * a segmented ring — four 90° arcs with a small engineered gap at each
 * cardinal point — where only the top-left (vision) and bottom-right
 * (intelligence → growth) arcs carry color. The other two arcs stay
 * neutral: "only one or two accents visible at a time" (Constitution,
 * Color Philosophy). A short stub, welded flush into the bottom-right
 * arc and extending past the rim at 45°, completes the Q.
 *
 * Geometry: viewBox 96×96, center (48,48), ring radius 28, band width 18
 * (inner r=19, outer r=37). Each arc is dashed (39.98 / 100, offset -2)
 * to cut a ~2px gap at both of its own ends — reproducible only at this
 * radius/viewBox; resizing the geometry means recomputing the dash values.
 */
export function LogoMark({
  size = 96,
  variant = "plain",
  tone = "color",
  glow = false,
  decorative = false,
  className,
}: LogoMarkProps) {
  const id = useId();
  const mono = tone === "mono";
  const line = "var(--clarity, #E6E6E6)";

  const vision = mono ? "var(--clarity, #E6E6E6)" : `url(#${id}-vision)`;
  const spectrum = mono ? "var(--clarity, #E6E6E6)" : `url(#${id}-spectrum)`;
  const ghostOpacity = mono ? 0.12 : 0.14;
  const halo = glow && !mono ? `url(#${id}-glow)` : undefined;

  const arc = {
    strokeWidth: 18,
    strokeLinecap: "butt" as const,
    strokeDasharray: "39.98 100",
    strokeDashoffset: "-2",
    fill: "none",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Quadrant Collective"}
      aria-hidden={decorative || undefined}
      className={className}
    >
      {!mono && (
        <defs>
          <linearGradient id={`${id}-vision`} gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="48" y2="48">
            <stop offset="0" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id={`${id}-spectrum`} gradientUnits="userSpaceOnUse" x1="48" y1="48" x2="84" y2="84">
            <stop offset="0" stopColor="#3B82F6" />
            <stop offset="0.55" stopColor="#2563EB" />
            <stop offset="1" stopColor="#00D1B2" />
          </linearGradient>
          {glow && (
            <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="halo" />
              <feMerge>
                <feMergeNode in="halo" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>
      )}

      {variant === "construction" && (
        <g stroke={line} fill="none">
          <circle cx="48" cy="48" r="44" strokeWidth="0.5" opacity="0.16" />
          <path d="M48 2 V94 M2 48 H94" strokeWidth="0.5" opacity="0.24" />
          <g strokeWidth="0.75" opacity="0.5">
            <circle cx="48" cy="4" r="1.8" />
            <circle cx="48" cy="92" r="1.8" />
            <circle cx="4" cy="48" r="1.8" />
            <circle cx="92" cy="48" r="1.8" />
          </g>
        </g>
      )}

      {/* Neutral arcs — top-right, bottom-left: structure without accent */}
      <path d="M48 20 A28 28 0 0 1 76 48" stroke={line} opacity={ghostOpacity} {...arc} />
      <path d="M48 76 A28 28 0 0 1 20 48" stroke={line} opacity={ghostOpacity} {...arc} />

      {/* Colored arcs — top-left (vision), bottom-right (intelligence→growth) */}
      <g filter={halo}>
        <path d="M20 48 A28 28 0 0 1 48 20" stroke={vision} {...arc} />
        <path d="M76 48 A28 28 0 0 1 48 76" stroke={spectrum} {...arc} />

        {/* Q tail: starts inside the ring band (radius 30) so it welds with
            zero gap, extends to radius 46 — a short stub past the rim at 45° */}
        <path
          d="M69.21 69.21 L80.53 80.53"
          stroke={spectrum}
          strokeWidth="18"
          strokeLinecap="butt"
        />
      </g>

      <circle cx="48" cy="48" r="2.2" fill={line} opacity={mono ? 0.5 : 0.9} />
    </svg>
  );
}
