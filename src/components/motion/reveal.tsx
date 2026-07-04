"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * The site's one scroll-reveal primitive (STRATEGY.md — one choreographed
 * idea per beat). Children marked with `data-reveal` plot in — a short
 * translate + fade, once, when the section enters view. Content is fully
 * visible without JS; the animation is progressive enhancement, so there
 * is nothing to index-block and no CLS (transform/opacity only).
 */
export function Reveal({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = scope.current?.querySelectorAll("[data-reveal]");
    if (!items?.length || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      items,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: DURATION.standard,
        ease: EASE.precision,
        stagger,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
          once: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
