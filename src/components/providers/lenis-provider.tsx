"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Site-wide smooth scrolling synced with GSAP ScrollTrigger.
 * Disabled entirely under prefers-reduced-motion; native scroll remains.
 */

/** The live Lenis instance, for components that must scroll programmatically
 *  (native scrollIntoView fights the lerp loop). Null before mount, after
 *  unmount, and under reduced motion — callers fall back to native scroll. */
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger slightly after hydration to ensure exact dimensions
    // are calculated before triggering scroll animations (fixes huge blank sections).
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    // Smoother, weighted feel: lower lerp eases the scroll position in more
    // gradually; gentle wheel multiplier keeps it controlled, not floaty.
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: true,
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
