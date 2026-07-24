"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Smooth wheel scrolling, synced with GSAP ScrollTrigger.
 *
 * Desktop only (founder decision 2026-07-25). Touch devices keep native
 * scrolling: it is faster, kinder to battery, never fights the browser's own
 * gesture handling, and Lenis's own documentation flags `syncTouch` as
 * experimental. On a phone-led market running mid-range Android that tradeoff
 * is not close. Disabled entirely under prefers-reduced-motion.
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

    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger slightly after hydration so triggers measure the
    // final layout (fixes huge blank sections). Needed on every device,
    // independent of whether smooth scrolling runs.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    if (window.matchMedia("(pointer: coarse)").matches) {
      return () => clearTimeout(timer);
    }

    // Smoother, weighted feel: lower lerp eases the scroll position in more
    // gradually; gentle wheel multiplier keeps it controlled, not floaty.
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(raf);
      lenisInstance = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
