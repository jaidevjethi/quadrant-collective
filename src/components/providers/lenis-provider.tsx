"use client";

import { useEffect, type ReactNode } from "react";
import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Smooth wheel scrolling.
 *
 * Desktop only (founder decision 2026-07-25). Touch devices keep native
 * scrolling: it is faster, kinder to battery, never fights the browser's own
 * gesture handling, and Lenis's own documentation flags `syncTouch` as
 * experimental. On a phone-led market running mid-range Android that tradeoff
 * is not close. Disabled entirely under prefers-reduced-motion.
 *
 * Stepped from its own requestAnimationFrame rather than the GSAP ticker.
 * That was the last thing importing GSAP into the root layout, and therefore
 * the last thing forcing GSAP and ScrollTrigger into the bundle shared by
 * every route, including pages with no animation at all.
 *
 * Lenis scrolls natively under the hood (it calls wrapper.scrollTo), so CSS
 * scroll-driven timelines track it with no glue code, and anything still
 * listening for native scroll events keeps working.
 */

/** The live Lenis instance, for components that must scroll programmatically
 *  (native scrollIntoView fights the lerp loop). Null before mount, after
 *  unmount, on touch devices, and under reduced motion — callers fall back to
 *  native scroll, which honours scroll-margin-top for nav clearance. */
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Imported dynamically so the library is a separate chunk that only
    // desktop pointers ever download. Phones and anyone on reduced motion
    // return above without fetching it at all.
    let lenis: Lenis | null = null;
    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      // Smoother, weighted feel: lower lerp eases the scroll position in more
      // gradually; gentle wheel multiplier keeps it controlled, not floaty.
      lenis = new LenisCtor({
        lerp: 0.085,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
      });
      lenisInstance = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenisInstance = null;
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
