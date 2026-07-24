import type { ReactNode } from "react";

/**
 * The site's one scroll-reveal primitive (STRATEGY.md: one choreographed idea
 * per beat). Children marked with `data-reveal` plot in as the section enters
 * view.
 *
 * There is no JavaScript here at all. The animation is a CSS scroll-driven
 * timeline defined in src/app/motion.css, which runs on the compositor and
 * cannot stutter when the main thread is busy. This is a server component, so
 * it also ships no client bytes.
 *
 * Content is fully visible without CSS or JS, so there is nothing to
 * index-block, and only transform and opacity animate, so there is no CLS.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
