"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";
import {
  capabilityNodes,
  disciplines,
  type DisciplineId,
} from "@/lib/capabilities";

gsap.registerPlugin(ScrollTrigger);

/**
 * Beat 3 signature moment, rebuilt as an HTML stage (was one inline SVG).
 * A decorative SVG underlay keeps the frame, grid, quadrant fields, labels
 * and center dot (so their line-draw entrance ports verbatim); the eight
 * capability chips are now positioned HTML, which sets up the interactive
 * knowledge-node expansion in the slices that follow.
 *
 * The markup renders the RESOLVED state, so no-JS, reduced-motion and the
 * pre-trigger frame all show the finished four-discipline system: motion is
 * pure enhancement, zero CLS. Below md the stage becomes a readable stacked
 * layout (the scaled SVG text was near-unreadable on phones).
 */

const VW = 720;
const VH = 560;

// Quadrant field + label geometry, unchanged from the original SVG.
const QUADRANTS: {
  id: DisciplineId;
  x: number;
  y: number;
  lx: number;
  ly: number;
  anchor: "start" | "end";
}[] = [
  { id: "strategy", x: 60, y: 40, lx: 80, ly: 66, anchor: "start" },
  { id: "design", x: 360, y: 40, lx: 640, ly: 66, anchor: "end" },
  { id: "technology", x: 60, y: 280, lx: 80, ly: 504, anchor: "start" },
  { id: "growth", x: 360, y: 280, lx: 640, ly: 504, anchor: "end" },
];

const GRID_V_LEN = 480;
const GRID_H_LEN = 600;

const DISCIPLINE_ORDER: DisciplineId[] = [
  "strategy",
  "design",
  "technology",
  "growth",
];

export function CapabilityStage({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion()) return;

    const svg = stage.querySelector<SVGSVGElement>(".cap-scaffold");
    const chips = Array.from(
      stage.querySelectorAll<HTMLElement>(".cap-chip"),
    );
    if (!svg || chips.length === 0) return;

    const fields = svg.querySelectorAll<SVGRectElement>(".quad-field");
    const labels = svg.querySelectorAll<SVGTextElement>(".quad-label");
    const gridV = svg.querySelector<SVGLineElement>(".grid-v");
    const gridH = svg.querySelector<SVGLineElement>(".grid-h");
    const frame = svg.querySelector<SVGRectElement>(".frame");
    const center = svg.querySelector<SVGCircleElement>(".center");

    // Scatter distance is measured in the same 720x560 units as the SVG,
    // then converted to on-screen pixels via the stage's current width.
    const scale = stage.getBoundingClientRect().width / VW;

    const ctx = gsap.context(() => {
      gsap.set(fields, { opacity: 0 });
      gsap.set(labels, { opacity: 0 });
      gsap.set(frame, { opacity: 0, scale: 3, transformOrigin: "50% 50%" });
      gsap.set(center, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(gridV, { strokeDasharray: GRID_V_LEN, strokeDashoffset: GRID_V_LEN });
      gsap.set(gridH, { strokeDasharray: GRID_H_LEN, strokeDashoffset: GRID_H_LEN });
      chips.forEach((chip) => {
        const sx = Number(chip.dataset.sx);
        const sy = Number(chip.dataset.sy);
        const tx = Number(chip.dataset.tx);
        const ty = Number(chip.dataset.ty);
        const rot = Number(chip.dataset.rot);
        gsap.set(chip, {
          x: (sx - tx) * scale * 2,
          y: (sy - ty) * scale * 2,
          rotation: rot * 3,
          scale: 4,
          opacity: 0,
          transformOrigin: "50% 50%",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: stage, start: "top 72%", once: true },
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
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={stageRef} className={className}>
      {/* Desktop: the coordinate stage. Chips positioned in 720x560 space. */}
      <div
        className="relative hidden w-full md:block"
        style={{ aspectRatio: `${VW} / ${VH}` }}
      >
        <svg
          className="cap-scaffold absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VW} ${VH}`}
          aria-hidden="true"
        >
          {QUADRANTS.map((q) => (
            <rect
              key={`field-${q.id}`}
              className="quad-field"
              x={q.x}
              y={q.y}
              width={300}
              height={240}
              fill={disciplines[q.id].color}
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
          <line className="grid-v" x1={360} y1={40} x2={360} y2={520} stroke="rgba(230,230,230,0.16)" strokeWidth={1} />
          <line className="grid-h" x1={60} y1={280} x2={660} y2={280} stroke="rgba(230,230,230,0.16)" strokeWidth={1} />

          {QUADRANTS.map((q) => (
            <text
              key={`label-${q.id}`}
              className="quad-label"
              x={q.lx}
              y={q.ly}
              textAnchor={q.anchor}
              fill={disciplines[q.id].color}
              style={{
                fontSize: 11,
                fontFamily: "var(--font-geist-mono)",
                fontWeight: 500,
                letterSpacing: "0.16em",
              }}
            >
              {disciplines[q.id].label}
            </text>
          ))}

          <circle className="center" cx={360} cy={280} r={5} fill="#e6e6e6" />
        </svg>

        {capabilityNodes.map((n) => (
          <div
            key={n.id}
            className="cap-chip absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-md border border-hairline bg-[#14171d] px-3 py-2 text-sm font-medium text-clarity"
            style={{ left: `${(n.grid.tx / VW) * 100}%`, top: `${(n.grid.ty / VH) * 100}%` }}
            data-sx={n.grid.sx}
            data-sy={n.grid.sy}
            data-tx={n.grid.tx}
            data-ty={n.grid.ty}
            data-rot={n.grid.rot}
          >
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: disciplines[n.discipline].color }}
            />
            {n.label}
          </div>
        ))}
      </div>

      {/* Mobile: readable stacked layout, grouped by discipline. */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {DISCIPLINE_ORDER.map((d) => (
          <div
            key={d}
            className="flex flex-col gap-3 rounded-md border border-hairline bg-raised/30 p-4"
          >
            <span
              className="label-mono"
              style={{ color: disciplines[d].color }}
            >
              {disciplines[d].label}
            </span>
            <ul className="flex flex-col gap-2">
              {capabilityNodes
                .filter((n) => n.discipline === d)
                .map((n) => (
                  <li key={n.id} className="flex items-center gap-2 text-sm font-medium text-clarity">
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: disciplines[d].color }}
                    />
                    {n.label}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
