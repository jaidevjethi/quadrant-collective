"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";

/**
 * Beat 1 load choreography (STRATEGY.md): the arrival plays once on page
 * load. The mark settles, then eyebrow, headline, actions and the credibility
 * line plot in. Targets [data-choreo] in DOM order inside the hero. Content
 * is SSR-visible without JS; this only enhances. Transform/opacity only.
 */
export function HeroChoreo() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const items = document.querySelectorAll<HTMLElement>("[data-choreo]");
    if (!items.length) return;

    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      items[0],
      { autoAlpha: 0, scale: 0.92 },
      { autoAlpha: 1, scale: 1, duration: DURATION.choreo, ease: EASE.precision },
    ).fromTo(
      Array.from(items).slice(1),
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1,
        y: 0,
        duration: DURATION.standard,
        ease: EASE.precision,
        stagger: 0.09,
      },
      "-=0.75",
    );

    return () => {
      tl.kill();
      gsap.set(items, { clearProps: "all" });
    };
  }, []);

  return null;
}
