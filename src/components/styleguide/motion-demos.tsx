"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";

/**
 * Interactive demos of the brand motion vocabulary (docs/BRAND.md).
 * Each demo maps to one primitive: plot-in, axis draw, counter,
 * grid emergence. Crosshair hover is pure CSS and lives in the page.
 */

function DemoFrame({
  label,
  onReplay,
  children,
}: {
  label: string;
  onReplay: () => void;
  children: ReactNode;
}) {
  return (
    <div className="relative rounded-lg border border-hairline bg-raised p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="label-mono text-muted-2">{label}</span>
        <button
          type="button"
          onClick={onReplay}
          className="label-mono cursor-pointer text-faint transition-colors duration-200 hover:text-clarity"
        >
          Replay
        </button>
      </div>
      {children}
    </div>
  );
}

/** Elements translate in along the axes to their plotted position. */
export function PlotRevealDemo() {
  const scope = useRef<HTMLDivElement>(null);

  const play = () => {
    const items = scope.current?.querySelectorAll("[data-plot]");
    if (!items?.length) return;
    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, x: 0, y: 0 });
      return;
    }
    gsap.fromTo(
      items,
      {
        opacity: 0,
        x: (i: number) => (i % 2 === 0 ? -24 : 24),
        y: (i: number) => (i < 2 ? -24 : 24),
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: DURATION.standard,
        ease: EASE.precision,
        stagger: 0.08,
      },
    );
  };

  useEffect(() => {
    play();
    const items = scope.current?.querySelectorAll("[data-plot]");
    return () => {
      if (items?.length) gsap.killTweensOf(items);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DemoFrame label="01 / Plot-in reveal" onReplay={play}>
      <div ref={scope} className="grid grid-cols-2 gap-3">
        {["Strategy", "Design", "Technology", "Growth"].map((d) => (
          <div
            key={d}
            data-plot
            className="rounded-md border border-hairline bg-balance px-4 py-6 text-center text-sm text-clarity opacity-0"
          >
            {d}
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}

/** Axes draw themselves, then the point plots at the intersection. */
export function AxisDrawDemo() {
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const play = () => {
    if (!hRef.current || !vRef.current || !dotRef.current) return;
    tl.current?.kill();
    if (prefersReducedMotion()) {
      gsap.set([hRef.current, vRef.current], { scaleX: 1, scaleY: 1 });
      gsap.set(dotRef.current, { opacity: 1, scale: 1 });
      return;
    }
    tl.current = gsap
      .timeline()
      .fromTo(
        hRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: DURATION.standard, ease: EASE.weighted },
      )
      .fromTo(
        vRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: DURATION.standard, ease: EASE.weighted },
        "-=0.35",
      )
      .fromTo(
        dotRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.3, ease: EASE.precision },
        "-=0.1",
      );
  };

  useEffect(() => {
    play();
    return () => {
      tl.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DemoFrame label="02 / Axis draw" onReplay={play}>
      <div className="relative h-44">
        <div
          ref={hRef}
          className="absolute left-0 top-1/2 h-px w-full origin-left bg-hairline-strong"
        />
        <div
          ref={vRef}
          className="absolute left-1/2 top-0 h-full w-px origin-top bg-hairline-strong"
        />
        <div
          ref={dotRef}
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-growth opacity-0"
        />
      </div>
    </DemoFrame>
  );
}

/** Values count up like an instrument taking a measurement. */
export function CounterDemo() {
  const numRef = useRef<HTMLSpanElement>(null);
  const target = 97;

  const play = () => {
    if (!numRef.current) return;
    if (prefersReducedMotion()) {
      numRef.current.textContent = String(target);
      return;
    }
    const state = { v: 0 };
    gsap.to(state, {
      v: target,
      duration: DURATION.choreo,
      ease: EASE.weighted,
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(state.v));
      },
    });
  };

  useEffect(() => {
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DemoFrame label="03 / Measurement counter" onReplay={play}>
      <div className="flex h-44 flex-col items-center justify-center gap-2">
        <span className="font-mono text-6xl font-medium tabular-nums text-clarity">
          <span ref={numRef}>0</span>
          <span className="text-growth">+</span>
        </span>
        <span className="label-mono text-muted-2">Lighthouse / Performance</span>
      </div>
    </DemoFrame>
  );
}

/** The grid emerges from the center — order from complexity. */
export function GridEmergeDemo() {
  const scope = useRef<HTMLDivElement>(null);

  const play = () => {
    const cells = scope.current?.querySelectorAll("[data-cell]");
    if (!cells?.length) return;
    if (prefersReducedMotion()) {
      gsap.set(cells, { opacity: 1 });
      return;
    }
    gsap.fromTo(
      cells,
      { opacity: 0 },
      {
        opacity: 1,
        duration: DURATION.standard,
        ease: EASE.precision,
        stagger: { grid: [4, 8], from: "center", amount: 0.7 },
      },
    );
  };

  useEffect(() => {
    play();
    const cells = scope.current?.querySelectorAll("[data-cell]");
    return () => {
      if (cells?.length) gsap.killTweensOf(cells);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DemoFrame label="04 / Grid emergence" onReplay={play}>
      <div ref={scope} className="grid h-44 grid-cols-8 grid-rows-4 gap-px">
        {Array.from({ length: 32 }, (_, i) => (
          <div
            key={i}
            data-cell
            className="border border-hairline bg-depth opacity-0"
          />
        ))}
      </div>
    </DemoFrame>
  );
}
