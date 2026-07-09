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
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
