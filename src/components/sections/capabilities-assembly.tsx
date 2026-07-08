"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Beat 3 signature moment (STRATEGY.md — 1 of 3). Scattered capability chips
 * resolve and snap into the four-quadrant grid — the logo's own geometry.
 * The scatter→align motion IS the thesis: disconnected tools become one
 * system. Plays once when it enters view (never scroll-scrubbed); animates
 * transform / opacity / stroke-dashoffset only (compositor-friendly, ~20
 * nodes). The markup renders the RESOLVED state, so no-JS, reduced-motion
 * and the pre-trigger frame all show the finished system — motion is pure
 * enhancement, zero CLS.
 */

const VISION = "#7C3AED";
const SPARK = "#D97706";
const INTELLIGENCE = "#2563EB";
const GROWTH = "#00D1B2";

type Chip = {
  label: string;
  color: string;
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  rot: number;
};

// tx/ty = resolved position inside its quadrant; sx/sy = scattered start.
const CHIPS: Chip[] = [
  { label: "Positioning", color: VISION, tx: 185, ty: 150, sx: 300, sy: 430, rot: -13 },
  { label: "Analytics", color: VISION, tx: 250, ty: 215, sx: 540, sy: 110, rot: 10 },
  { label: "Brand", color: SPARK, tx: 480, ty: 150, sx: 150, sy: 470, rot: -8 },
  { label: "Web design", color: SPARK, tx: 545, ty: 215, sx: 430, sy: 80, rot: 14 },
  { label: "Development", color: INTELLIGENCE, tx: 185, ty: 360, sx: 600, sy: 250, rot: 11 },
  { label: "Automation", color: INTELLIGENCE, tx: 250, ty: 425, sx: 120, sy: 120, rot: -15 },
  { label: "SEO", color: GROWTH, tx: 480, ty: 360, sx: 560, sy: 470, rot: 7 },
  { label: "Content", color: GROWTH, tx: 545, ty: 425, sx: 210, sy: 90, rot: -6 },
];

const QUADRANTS = [
  { label: "STRATEGY", color: VISION, x: 60, y: 40, lx: 80, ly: 66, anchor: "start" },
  { label: "DESIGN", color: SPARK, x: 360, y: 40, lx: 640, ly: 66, anchor: "end" },
  { label: "TECHNOLOGY", color: INTELLIGENCE, x: 60, y: 280, lx: 80, ly: 504, anchor: "start" },
  { label: "GROWTH", color: GROWTH, x: 360, y: 280, lx: 640, ly: 504, anchor: "end" },
] as const;

const GRID_V_LEN = 480;
const GRID_H_LEN = 600;

export function CapabilitiesAssembly({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = svgRef.current;
    if (!root || prefersReducedMotion()) return;

    const chips = Array.from(root.querySelectorAll<SVGGElement>(".chip"));
    const fields = root.querySelectorAll<SVGRectElement>(".quad-field");
    const labels = root.querySelectorAll<SVGTextElement>(".quad-label");
    const gridV = root.querySelector<SVGLineElement>(".grid-v");
    const gridH = root.querySelector<SVGLineElement>(".grid-h");
    const frame = root.querySelector<SVGRectElement>(".frame");
    const center = root.querySelector<SVGCircleElement>(".center");

    gsap.set(fields, { opacity: 0 });
    gsap.set(labels, { opacity: 0 });
    gsap.set(frame, { opacity: 0, scale: 3, transformOrigin: "50% 50%" });
    gsap.set(center, { scale: 0, transformOrigin: "50% 50%" });
    gsap.set(gridV, { strokeDasharray: GRID_V_LEN, strokeDashoffset: GRID_V_LEN });
    gsap.set(gridH, { strokeDasharray: GRID_H_LEN, strokeDashoffset: GRID_H_LEN });
    chips.forEach((chip, i) => {
      const c = CHIPS[i];
      gsap.set(chip, {
        x: (c.sx - c.tx) * 2,
        y: (c.sy - c.ty) * 2,
        rotation: c.rot * 3,
        scale: 4,
        opacity: 0,
        transformOrigin: "50% 50%",
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 72%", once: true },
    });

    tl.to(frame, { opacity: 1, scale: 1, duration: DURATION.standard, ease: EASE.weighted })
      .to(
        chips,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: DURATION.choreo,
          ease: EASE.weighted,
          stagger: 0.08,
        },
        "-=0.3",
      )
      .to(
        [gridV, gridH],
        { strokeDashoffset: 0, duration: DURATION.standard, ease: EASE.precision },
        "-=0.5",
      )
      .to(
        fields,
        { opacity: 0.1, duration: DURATION.standard, ease: EASE.precision, stagger: 0.05 },
        "-=0.35",
      )
      .to(
        labels,
        { opacity: 1, duration: DURATION.standard, ease: EASE.precision, stagger: 0.05 },
        "-=0.45",
      )
      .to(center, { scale: 1, duration: 0.4, ease: EASE.precision }, "-=0.2");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 720 560"
      className={`h-auto w-full ${className ?? ""}`}
      role="img"
      aria-label="The capabilities a business buys piecemeal (brand, build, content, growth and more) resolving into four disciplines: Strategy, Design, Technology and Growth, working as one system."
    >
      {QUADRANTS.map((q) => (
        <rect
          key={`field-${q.label}`}
          className="quad-field"
          x={q.x}
          y={q.y}
          width={300}
          height={240}
          fill={q.color}
          opacity={0.1}
        />
      ))}

      <rect
        className="frame"
        x={60}
        y={40}
        width={600}
        height={480}
        rx={4}
        fill="none"
        stroke="rgba(230,230,230,0.16)"
        strokeWidth={1}
      />

      <line
        className="grid-v"
        x1={360}
        y1={40}
        x2={360}
        y2={520}
        stroke="rgba(230,230,230,0.16)"
        strokeWidth={1}
      />
      <line
        className="grid-h"
        x1={60}
        y1={280}
        x2={660}
        y2={280}
        stroke="rgba(230,230,230,0.16)"
        strokeWidth={1}
      />

      {QUADRANTS.map((q) => (
        <text
          key={`label-${q.label}`}
          className="quad-label"
          x={q.lx}
          y={q.ly}
          textAnchor={q.anchor}
          fill={q.color}
          style={{
            fontSize: 11,
            fontFamily: "var(--font-geist-mono)",
            fontWeight: 500,
            letterSpacing: "0.16em",
          }}
        >
          {q.label}
        </text>
      ))}

      <circle className="center" cx={360} cy={280} r={5} fill="#e6e6e6" />

      {CHIPS.map((c) => (
        <g key={c.label} transform={`translate(${c.tx} ${c.ty})`}>
          <g className="chip">
            <rect
              x={-56}
              y={-17}
              width={112}
              height={34}
              rx={7}
              fill="#14171d"
              stroke="rgba(230,230,230,0.16)"
              strokeWidth={1}
            />
            <circle cx={-40} cy={0} r={3.5} fill={c.color} />
            <text
              x={-28}
              y={4}
              fill="#e6e6e6"
              style={{ fontSize: 13, fontFamily: "var(--font-geist-sans)", fontWeight: 500 }}
            >
              {c.label}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}
