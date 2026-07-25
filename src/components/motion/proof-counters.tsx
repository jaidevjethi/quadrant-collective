"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

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
  { value: 100, suffix: "", label: "Best practices", sub: "checked on the production build" },
];

export function ProofCounters({ className }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const nums = root.querySelectorAll<HTMLElement>("[data-num]");
    if (!("IntersectionObserver" in window)) return;

    // Counting a number is the one thing here CSS cannot do, so it stays in
    // JS. It is a single rAF loop that runs for 1.1s once and then stops,
    // which is why this no longer needs GSAP.
    const DURATION_MS = 1100;
    let frame = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const started = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - started) / DURATION_MS);
          // Quartic settle, matching the weighted ease used elsewhere.
          const eased = 1 - Math.pow(1 - t, 4);
          nums.forEach((el) => {
            el.textContent = String(Math.round(Number(el.dataset.num) * eased));
          });
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { rootMargin: "0px 0px -25% 0px" },
    );

    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
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
