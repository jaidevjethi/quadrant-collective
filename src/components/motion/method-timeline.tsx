"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Beat 4 — The method (STRATEGY.md). The axis-draw motion from the brand
 * language: a vertical gradient axis draws top→bottom, then each step's node
 * and content plot in along it. Trigger-once, transform/opacity only. Static
 * markup is the resolved state (axis full, steps visible) — motion enhances.
 */

const STEPS = [
  {
    n: "01",
    title: "Map",
    body: "We map the business, the market, and the gap before anything is designed.",
  },
  {
    n: "02",
    title: "Design the system",
    body: "Positioning, structure, and interface designed as one decision, not three.",
  },
  {
    n: "03",
    title: "Build with craft",
    body: "Production-grade engineering: fast, accessible, and measured against real numbers.",
  },
  {
    n: "04",
    title: "Compound",
    body: "We ship, measure, and refine so the results build on each other.",
  },
];

export function MethodTimeline({ className }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const axis = root.querySelector<HTMLElement>("[data-axis]");
    const dots = root.querySelectorAll<HTMLElement>("[data-dot]");
    const rows = root.querySelectorAll<HTMLElement>("[data-row]");

    gsap.set(axis, { scaleY: 0, transformOrigin: "50% 0%" });
    gsap.set(dots, { scale: 0, transformOrigin: "50% 50%" });
    gsap.set(rows, { autoAlpha: 0, rotationX: -60, z: -200, y: 50, transformPerspective: 1000 });

    const tl = gsap.timeline({
      scrollTrigger: { 
        trigger: root, 
        start: "top 80%", 
        end: "bottom 40%", 
        scrub: 1 
      },
    });

    tl.to(axis, { scaleY: 1, duration: 2, ease: "none" }, 0)
      .to(
        dots,
        { scale: 1, duration: 0.2, stagger: 0.5, ease: "back.out(1.7)" },
        0
      )
      .to(
        rows,
        {
          autoAlpha: 1,
          rotationX: 0,
          z: 0,
          y: 0,
          duration: 0.8,
          stagger: 0.5,
          ease: "power2.out",
        },
        0
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={scope} className={`relative overflow-x-clip ${className ?? ""}`}>
      <span
        data-axis
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-vision via-intelligence to-growth"
      />
      <ol className="flex flex-col gap-12">
        {STEPS.map((s) => (
          <li key={s.n} data-row className="relative flex gap-6 pl-8">
            <span
              data-dot
              aria-hidden
              className="absolute left-0 top-1.5 size-[15px] rounded-full border border-hairline-strong bg-depth"
            >
              <span className="absolute inset-[3px] rounded-full bg-clarity" />
            </span>
            <div className="flex flex-col gap-2">
              <span className="label-mono text-muted-2">{s.n}</span>
              <h3 className="text-title font-medium text-clarity">{s.title}</h3>
              <p className="max-w-md text-lead text-muted-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
