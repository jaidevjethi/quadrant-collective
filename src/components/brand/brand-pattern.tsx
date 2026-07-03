import { useId } from "react";

/**
 * The brand pattern: tiled Q-construction geometry at whisper opacity,
 * for section backgrounds and brand surfaces. Purely decorative.
 */
export function BrandPattern({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg aria-hidden className={className} width="100%" height="100%">
      <defs>
        <pattern id={id} width="96" height="96" patternUnits="userSpaceOnUse">
          <g stroke="rgba(230, 230, 230, 0.05)" fill="none" strokeWidth="1">
            <circle cx="48" cy="48" r="28" />
            <path d="M48 8 V88 M8 48 H88" />
          </g>
          <path
            d="M48 48 L48 20 A28 28 0 0 0 20 48 Z"
            fill="rgba(230, 230, 230, 0.028)"
          />
          <path
            d="M48 48 L76 48 A28 28 0 0 1 48 76 Z"
            fill="rgba(230, 230, 230, 0.02)"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
