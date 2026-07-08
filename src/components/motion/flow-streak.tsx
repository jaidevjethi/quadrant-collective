"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * The brand's motion signature (BRAND.md): a full-spectrum streak drawing its
 * path, led by a comet head. Production version of the styleguide demo, used
 * once, along the invitation seam. Trigger-once; dashoffset + attribute
 * updates only. Renders resolved (full path, no comet) without JS.
 */
export function FlowStreak({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot || prefersReducedMotion()) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);

    const state = { p: 0 };
    const tween = gsap.to(state, {
      p: 1,
      duration: DURATION.choreo,
      ease: EASE.weighted,
      scrollTrigger: { trigger: path, start: "top 88%", once: true },
      onUpdate: () => {
        path.style.strokeDashoffset = String(len * (1 - state.p));
        const pt = path.getPointAtLength(len * state.p);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        dot.setAttribute("opacity", state.p < 1 ? "1" : "0");
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <svg
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      aria-hidden
      className={`h-12 w-full ${className ?? ""}`}
    >
      <defs>
        <linearGradient id="invite-streak" gradientUnits="userSpaceOnUse" x1="0" y1="24" x2="1200" y2="24">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.5" stopColor="#2563EB" />
          <stop offset="1" stopColor="#00D1B2" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M0 40 C 300 8, 600 44, 900 18 S 1150 28, 1200 22"
        stroke="url(#invite-streak)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle
        ref={dotRef}
        r="3"
        fill="#00D1B2"
        opacity="0"
        style={{ filter: "drop-shadow(0 0 6px rgba(0, 209, 178, 0.8))" }}
      />
    </svg>
  );
}
