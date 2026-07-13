"use client";

import { useId } from "react";

/**
 * The brand's motion signature (BRAND.md): the full-spectrum streak at the
 * invitation seam. The wave itself is always present but faint; a single pulse
 * of light travels along it on a slow loop, flowing toward the ask on the
 * right ("ideas move, systems connect"). Pure CSS (see globals.css
 * .flow-streak-light) so there is no getPointAtLength distortion; the stroke
 * is non-scaling so it stays crisp at any width. The pulse is disabled under
 * prefers-reduced-motion, leaving the static wave.
 */
const WAVE = "M0 40 C 300 8, 600 44, 900 18 S 1150 28, 1200 22";

export function FlowStreak({ className }: { className?: string }) {
  const id = useId();
  const grad = `${id}-flow`;
  return (
    <svg
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      aria-hidden
      className={`h-12 w-full overflow-visible ${className ?? ""}`}
    >
      <defs>
        <linearGradient id={grad} gradientUnits="userSpaceOnUse" x1="0" y1="24" x2="1200" y2="24">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.5" stopColor="#2563EB" />
          <stop offset="1" stopColor="#00D1B2" />
        </linearGradient>
      </defs>

      {/* The wave, always present, quiet. */}
      <path
        d={WAVE}
        stroke={`url(#${grad})`}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.3"
      />

      {/* The pulse of light flowing along it. */}
      <path
        className="flow-streak-light"
        d={WAVE}
        pathLength={100}
        stroke={`url(#${grad})`}
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
