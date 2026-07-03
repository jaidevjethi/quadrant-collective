import { useId } from "react";

type LogoMarkProps = {
  /** Rendered size in pixels. */
  size?: number;
  /** "construction" adds the extended crosshair axes with endpoint nodes. */
  variant?: "plain" | "construction";
  /** "mono" renders a single-color version for constrained contexts. */
  tone?: "color" | "mono";
  /** Set when the mark is purely decorative next to visible text. */
  decorative?: boolean;
  className?: string;
};

/**
 * The Quadrant Collective mark (docs/BRAND.md, Appendix — Logo geometry):
 * a circle divided into four quadrants by crosshair axes — top-left filled
 * violet (vision), bottom-right filled blue→cyan (intelligence→growth) —
 * with a diagonal tail completing the Q.
 *
 * Geometry: viewBox 96×96, center (48,48), radius 30, tail at 45°.
 */
export function LogoMark({
  size = 48,
  variant = "plain",
  tone = "color",
  decorative = false,
  className,
}: LogoMarkProps) {
  const gradientId = useId();
  const mono = tone === "mono";

  const quadrantTopLeft = mono ? "var(--clarity, #E6E6E6)" : "var(--vision, #7C3AED)";
  const quadrantBottomRight = mono
    ? "rgba(230, 230, 230, 0.45)"
    : `url(#${gradientId})`;
  const line = "var(--clarity, #E6E6E6)";

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
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="48"
            y1="48"
            x2="90"
            y2="90"
          >
            <stop offset="0" stopColor="var(--intelligence, #2563EB)" />
            <stop offset="1" stopColor="var(--growth, #00D1B2)" />
          </linearGradient>
        </defs>
      )}

      {/* Filled quadrants: top-left (vision), bottom-right (intelligence→growth) */}
      <path d="M48 48 L48 18 A30 30 0 0 0 18 48 Z" fill={quadrantTopLeft} />
      <path d="M48 48 L78 48 A30 30 0 0 1 48 78 Z" fill={quadrantBottomRight} />

      {/* Circle and quadrant axes */}
      <circle cx="48" cy="48" r="30" fill="none" stroke={line} strokeWidth="1.5" />
      <path d="M48 18 V78 M18 48 H78" stroke={line} strokeWidth="1" opacity="0.7" />

      {/* The Q tail: short and stubby, welded to the circle edge at 45° —
          inner corners just inside the rim so it fuses with the quadrant
          fill and reads as a Q, not a handle */}
      <path
        d="M70.6 62.2 L81.9 73.5 L73.5 81.9 L62.2 70.6 Z"
        fill={quadrantBottomRight}
      />

      {variant === "construction" && (
        <g stroke={line} strokeWidth="0.75" opacity="0.35" fill="none">
          {/* Extended construction axes with endpoint nodes */}
          <path d="M48 6 V18 M48 78 V90 M6 48 H18 M78 48 H90" />
          <circle cx="48" cy="6" r="2" />
          <circle cx="48" cy="90" r="2" />
          <circle cx="6" cy="48" r="2" />
          <circle cx="90" cy="48" r="2" />
        </g>
      )}
    </svg>
  );
}
