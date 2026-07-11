"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature moment 1 of 3 (STRATEGY.md): the blueprint entry. Between the
 * belief and the capabilities, a construction band draws itself: baseline,
 * coordinate ticks, then a rising guide toward the assembly. Trigger-once,
 * stroke-dashoffset and opacity only. The resolved band renders in SSR.
 */

const BASE_LEN = 1200;
const TICKS = [150, 350, 550, 750, 950, 1050];

export function BlueprintEntry() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;

    const base = svg.querySelector<SVGLineElement>(".bp-base");
    const ticks = svg.querySelectorAll<SVGLineElement>(".bp-tick");
    const labels = svg.querySelectorAll<SVGTextElement>(".bp-label");
    const rise = svg.querySelector<SVGLineElement>(".bp-rise");

    gsap.set(base, { strokeDasharray: BASE_LEN, strokeDashoffset: BASE_LEN });
    gsap.set(ticks, { opacity: 0, scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(labels, { opacity: 0 });
    gsap.set(rise, { strokeDasharray: 80, strokeDashoffset: 80 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: svg, start: "top 82%", once: true },
    });
    tl.to(base, { strokeDashoffset: 0, duration: DURATION.choreo, ease: EASE.weighted })
      .to(ticks, { opacity: 1, scaleY: 1, duration: 0.3, ease: EASE.precision, stagger: 0.06 }, "-=0.7")
      .to(labels, { opacity: 1, duration: 0.4, ease: EASE.precision, stagger: 0.06 }, "-=0.4")
      .to(rise, { strokeDashoffset: 0, duration: DURATION.standard, ease: EASE.precision }, "-=0.2");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div aria-hidden className="px-gutter">
      <svg
        ref={ref}
        viewBox="0 0 1200 90"
        preserveAspectRatio="xMidYMid meet"
        className="mx-auto h-auto w-full max-w-5xl"
      >
        <line
          className="bp-base"
          x1="0"
          y1="70"
          x2="1200"
          y2="70"
          stroke="rgba(230,230,230,0.28)"
          strokeWidth="1"
        />
        {TICKS.map((x, i) => (
          <line
            key={x}
            className="bp-tick"
            x1={x}
            y1={i % 2 === 0 ? 58 : 62}
            x2={x}
            y2="70"
            stroke="rgba(230,230,230,0.45)"
            strokeWidth="1"
          />
        ))}
        <text
          className="bp-label"
          x="150"
          y="46"
          fill="#5c6068"
          style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)", letterSpacing: "0.16em" }}
        >
          X · DISCIPLINES
        </text>
        <text
          className="bp-label"
          x="950"
          y="46"
          textAnchor="end"
          fill="#5c6068"
          style={{ fontSize: 10, fontFamily: "var(--font-geist-mono)", letterSpacing: "0.16em" }}
        >
          Y · COMPOUNDING
        </text>
        <line
          className="bp-rise"
          x1="600"
          y1="70"
          x2="600"
          y2="0"
          stroke="rgba(0,209,178,0.5)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
