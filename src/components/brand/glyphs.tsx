import { useId } from "react";

/**
 * The visual-language glyph set from the brand board. Monoline, geometric,
 * engineered — each glyph names one brand idea:
 * Intersection · Flow · Structure · Growth.
 * All are decorative; pair them with visible captions.
 */

type GlyphProps = { className?: string };

const frame = {
  viewBox: "0 0 120 96",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

/** Where ideas align. */
export function IntersectionGlyph({ className }: GlyphProps) {
  const id = useId();
  return (
    <svg {...frame} className={className}>
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0" stopColor="#A78BFA" stopOpacity="0.7" />
          <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="var(--clarity, #E6E6E6)" strokeWidth="0.75" opacity="0.4">
        <path d="M60 6 V90 M18 48 H102" />
      </g>
      <g stroke="var(--clarity, #E6E6E6)" strokeWidth="0.75" opacity="0.25">
        <path d="M48 36 L42 30 M72 60 L78 66 M72 36 L78 30 M48 60 L42 66" />
      </g>
      <circle cx="60" cy="48" r="9" fill={`url(#${id}-halo)`} />
      <circle cx="60" cy="48" r="2.4" fill="#A78BFA" />
    </svg>
  );
}

/** Ideas move. Systems connect. */
export function FlowGlyph({ className }: GlyphProps) {
  const id = useId();
  return (
    <svg {...frame} className={className}>
      <defs>
        <linearGradient id={`${id}-f`} gradientUnits="userSpaceOnUse" x1="8" y1="48" x2="112" y2="48">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.5" stopColor="#2563EB" />
          <stop offset="1" stopColor="#00D1B2" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id}-f)`} strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M8 62 C 38 14, 70 78, 112 28" opacity="0.9" />
        <path d="M8 72 C 40 26, 72 88, 112 40" opacity="0.55" />
        <path d="M8 82 C 42 38, 74 96, 112 52" opacity="0.3" />
      </g>
      <circle cx="112" cy="28" r="1.8" fill="#00D1B2" />
      <circle cx="112" cy="40" r="1.5" fill="#00D1B2" opacity="0.6" />
    </svg>
  );
}

/** Built on strategy. Backed by systems. */
export function StructureGlyph({ className }: GlyphProps) {
  const id = useId();
  return (
    <svg {...frame} className={className}>
      <defs>
        <linearGradient id={`${id}-s`} gradientUnits="userSpaceOnUse" x1="46" y1="20" x2="74" y2="52">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <g stroke="var(--clarity, #E6E6E6)" strokeWidth="0.75" fill="none" opacity="0.5">
        {/* Base cubes */}
        <path d="M46 44 L60 52 L46 60 L32 52 Z M32 52 V68 L46 76 V60 M60 52 V68 L46 76" />
        <path d="M74 44 L88 52 L74 60 L60 52 Z M60 52 V68 L74 76 V60 M88 52 V68 L74 76" />
      </g>
      {/* Top cube carries the gradient */}
      <g stroke={`url(#${id}-s)`} strokeWidth="0.9" fill="none">
        <path d="M60 20 L74 28 L60 36 L46 28 Z M46 28 V44 L60 52 V36 M74 28 V44 L60 52" />
      </g>
    </svg>
  );
}

/** From clarity comes scale. */
export function GrowthGlyph({ className }: GlyphProps) {
  const id = useId();
  return (
    <svg {...frame} className={className}>
      <defs>
        <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1="14" y1="80" x2="102" y2="18">
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#00D1B2" />
        </linearGradient>
      </defs>
      <g stroke="var(--clarity, #E6E6E6)" strokeWidth="0.5" opacity="0.12">
        <path d="M30 12 V84 M50 12 V84 M70 12 V84 M90 12 V84 M14 30 H106 M14 48 H106 M14 66 H106" />
      </g>
      <path
        d="M14 80 C 46 80, 66 60, 100 20"
        stroke={`url(#${id}-g)`}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M100 20 L90 21.5 M100 20 L97 29.5"
        stroke="#00D1B2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="80" r="1.8" fill="#2563EB" />
    </svg>
  );
}
