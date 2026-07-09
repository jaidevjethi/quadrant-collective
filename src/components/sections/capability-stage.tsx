"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";
import {
  capabilityNodes,
  disciplines,
  type CapabilityNodeId,
  type DisciplineId,
} from "@/lib/capabilities";
import { CapabilityStory } from "./capability-story";

gsap.registerPlugin(ScrollTrigger);

/**
 * Beat 3 signature moment as an interactive knowledge-node system. Eight
 * capability chips resolve into the four-discipline grid (entrance ported
 * from the original SVG assembly); clicking one expands its story below the
 * stage. This is the reduced-motion baseline: instant, fully keyboard
 * accessible, works identically on both breakpoints. The frame-filling Flip
 * choreography is a later slice.
 *
 * The markup renders the RESOLVED grid, so no-JS, reduced-motion and the
 * pre-trigger frame all show the finished system (zero CLS). Every story is
 * in the DOM for crawlers; a noscript rule reveals them without JS.
 */

const VW = 720;
const VH = 560;

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
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Both the desktop and mobile chip for each node, keyed `${id}-d` / `${id}-m`.
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [expanded, setExpanded] = useState<CapabilityNodeId | null>(null);

  const focusChip = useCallback((id: CapabilityNodeId) => {
    const candidates = [chipRefs.current[`${id}-d`], chipRefs.current[`${id}-m`]];
    // offsetParent is null for the display:none (off-breakpoint) chip.
    candidates.find((el) => el && el.offsetParent !== null)?.focus();
  }, []);

  const close = useCallback(() => {
    setExpanded((current) => {
      if (current) requestAnimationFrame(() => focusChip(current));
      return null;
    });
  }, [focusChip]);

  const toggle = useCallback((id: CapabilityNodeId) => {
    setExpanded((current) => (current === id ? null : id));
  }, []);

  const jump = useCallback((id: CapabilityNodeId) => setExpanded(id), []);

  // Move focus into the opened story; keep document reflow honest for triggers.
  useEffect(() => {
    if (expanded && headingRef.current) {
      headingRef.current.focus({ preventScroll: true });
    }
    ScrollTrigger.refresh();
  }, [expanded]);

  // Escape closes while a story is open.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, close]);

  // Entrance: scattered chips + scaffold resolve into the grid, once on view.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion()) return;

    const svg = stage.querySelector<SVGSVGElement>(".cap-scaffold");
    const chips = Array.from(stage.querySelectorAll<HTMLElement>(".cap-chip-d"));
    if (!svg || chips.length === 0) return;

    const fields = svg.querySelectorAll<SVGRectElement>(".quad-field");
    const labels = svg.querySelectorAll<SVGTextElement>(".quad-label");
    const gridV = svg.querySelector<SVGLineElement>(".grid-v");
    const gridH = svg.querySelector<SVGLineElement>(".grid-h");
    const frame = svg.querySelector<SVGRectElement>(".frame");
    const center = svg.querySelector<SVGCircleElement>(".center");

    const scale = stage.getBoundingClientRect().width / VW;

    const ctx = gsap.context(() => {
      gsap.set(fields, { opacity: 0 });
      gsap.set(labels, { opacity: 0 });
      gsap.set(frame, { opacity: 0, scale: 3, transformOrigin: "50% 50%" });
      gsap.set(center, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(gridV, { strokeDasharray: GRID_V_LEN, strokeDashoffset: GRID_V_LEN });
      gsap.set(gridH, { strokeDasharray: GRID_H_LEN, strokeDashoffset: GRID_H_LEN });
      chips.forEach((chip) => {
        const { sx, sy, tx, ty, rot } = chip.dataset;
        gsap.set(chip, {
          x: (Number(sx) - Number(tx)) * scale * 2,
          y: (Number(sy) - Number(ty)) * scale * 2,
          rotation: Number(rot) * 3,
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
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: DURATION.choreo, ease: EASE.weighted, stagger: 0.08 },
          "-=0.3",
        )
        .to([gridV, gridH], { strokeDashoffset: 0, duration: DURATION.standard, ease: EASE.precision }, "-=0.5")
        .to(fields, { opacity: 0.1, duration: DURATION.standard, ease: EASE.precision, stagger: 0.05 }, "-=0.35")
        .to(labels, { opacity: 1, duration: DURATION.standard, ease: EASE.precision, stagger: 0.05 }, "-=0.45")
        .to(center, { scale: 1, duration: 0.4, ease: EASE.precision }, "-=0.2");
    }, stage);

    return () => ctx.revert();
  }, []);

  const chipClass =
    "cap-chip flex items-center gap-2 whitespace-nowrap rounded-md border bg-[#14171d] px-3 py-2 text-sm font-medium text-clarity outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-clarity";

  return (
    <div ref={stageRef} className={className}>
      {/* Desktop: the coordinate stage. */}
      <div
        className="relative hidden w-full md:block"
        style={{ aspectRatio: `${VW} / ${VH}` }}
      >
        <svg className="cap-scaffold absolute inset-0 h-full w-full" viewBox={`0 0 ${VW} ${VH}`} aria-hidden="true">
          {QUADRANTS.map((q) => (
            <rect key={`field-${q.id}`} className="quad-field" x={q.x} y={q.y} width={300} height={240} fill={disciplines[q.id].color} opacity={0.1} />
          ))}
          <rect className="frame" x={60} y={40} width={600} height={480} rx={4} fill="none" stroke="rgba(230,230,230,0.16)" strokeWidth={1} />
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
              style={{ fontSize: 11, fontFamily: "var(--font-geist-mono)", fontWeight: 500, letterSpacing: "0.16em" }}
            >
              {disciplines[q.id].label}
            </text>
          ))}
          <circle className="center" cx={360} cy={280} r={5} fill="#e6e6e6" />
        </svg>

        {capabilityNodes.map((n) => (
          <button
            key={n.id}
            type="button"
            ref={(el) => { chipRefs.current[`${n.id}-d`] = el; }}
            onClick={() => toggle(n.id)}
            aria-expanded={expanded === n.id}
            aria-controls={`story-${n.id}`}
            data-sx={n.grid.sx}
            data-sy={n.grid.sy}
            data-tx={n.grid.tx}
            data-ty={n.grid.ty}
            data-rot={n.grid.rot}
            style={{ left: `${(n.grid.tx / VW) * 100}%`, top: `${(n.grid.ty / VH) * 100}%` }}
            className={`cap-chip-d absolute -translate-x-1/2 -translate-y-1/2 ${chipClass} ${expanded === n.id ? "border-clarity" : "border-hairline hover:border-hairline-strong"}`}
          >
            <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: disciplines[n.discipline].color }} />
            {n.label}
          </button>
        ))}
      </div>

      {/* Mobile: readable stacked layout, grouped by discipline. */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {DISCIPLINE_ORDER.map((d) => (
          <div key={d} className="flex flex-col gap-3 rounded-md border border-hairline bg-raised/30 p-4">
            <span className="label-mono" style={{ color: disciplines[d].color }}>
              {disciplines[d].label}
            </span>
            <ul className="flex flex-col gap-2">
              {capabilityNodes.filter((n) => n.discipline === d).map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    ref={(el) => { chipRefs.current[`${n.id}-m`] = el; }}
                    onClick={() => toggle(n.id)}
                    aria-expanded={expanded === n.id}
                    aria-controls={`story-${n.id}`}
                    className={`${chipClass} w-full ${expanded === n.id ? "border-clarity" : "border-hairline"}`}
                  >
                    <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: disciplines[d].color }} />
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Story region: every story in the DOM (crawlable), active one shown. */}
      <noscript>
        <style>{`.capability-story{display:block !important}`}</style>
      </noscript>
      <div className="mt-8">
        {capabilityNodes.map((n) => (
          <div
            key={n.id}
            id={`story-${n.id}`}
            role="region"
            aria-labelledby={`heading-${n.id}`}
            data-active={expanded === n.id ? "true" : undefined}
            className="capability-story overflow-hidden rounded-lg border border-hairline bg-raised/40"
          >
            <CapabilityStory
              node={n}
              onClose={close}
              onJump={jump}
              ref={expanded === n.id ? headingRef : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
