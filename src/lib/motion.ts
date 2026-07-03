/**
 * Motion tokens — single source of truth for durations and easing in JS/GSAP.
 * Mirrors the CSS custom properties in globals.css; keep both in sync.
 *
 * Constitution (docs/BRAND.md): slow, intentional, weighted, precise.
 * Never bouncy, never elastic, never overshooting.
 */
export const DURATION = {
  /** Hover, focus, small state changes. */
  micro: 0.2,
  /** Element reveals. */
  standard: 0.6,
  /** Section-level choreography. */
  choreo: 1.1,
} as const;

/**
 * GSAP built-in eases approximating the brand curves:
 * precision ≈ cubic-bezier(0.16, 1, 0.3, 1) — decisive start, engineered settle
 * weighted  ≈ cubic-bezier(0.7, 0, 0.3, 1) — heavy machinery in-out
 */
export const EASE = {
  precision: "power4.out",
  weighted: "power3.inOut",
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
