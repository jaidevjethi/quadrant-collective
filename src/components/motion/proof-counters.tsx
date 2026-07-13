"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Beat 5 — Proof (STRATEGY.md). The measurement-counter motion. These are the
 * standards every build is held to (the CLAUDE.md quality bars) — stated as
 * commitments, not client results, so nothing is faked (constitution: claims
 * are either provable or not made). Numbers render in markup as the resolved
 * value; JS only counts up from zero when in view.
 */

const STATS = [
  { value: 95, suffix: "+", label: "Performance", sub: "Lighthouse, on every build" },
  { value: 100, suffix: "", label: "Accessibility", sub: "WCAG AA, non-negotiable" },
  { value: 100, suffix: "", label: "Best practices", sub: "the bar we hold, not hope for" },
];

export function ProofCounters({ className }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const nums = root.querySelectorAll<HTMLElement>("[data-num]");

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top 75%",
      once: true,
      onEnter: () => {
        nums.forEach((el) => {
          const target = Number(el.dataset.num);
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: DURATION.choreo,
            ease: EASE.weighted,
            onUpdate: () => {
              el.textContent = String(Math.round(state.v));
            },
          });
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={scope}
      className={`grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3 ${className ?? ""}`}
    >
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col gap-4 bg-depth p-8">
          {/* A measured value: growth is the metrics accent (BRAND.md). */}
          <span aria-hidden className="h-px w-8 bg-growth/60" />
          <span className="font-heading text-display font-medium tracking-tight text-clarity tabular-nums">
            <span data-num={s.value}>{s.value}</span>
            <span className="text-growth">{s.suffix}</span>
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-title font-medium text-clarity">{s.label}</span>
            <span className="label-mono text-muted-2">{s.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
