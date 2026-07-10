"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";
import {
  capabilityNodes,
  disciplines,
  getNode,
  type CapabilityNode,
  type CapabilityNodeId,
  type DisciplineId,
} from "@/lib/capabilities";
import { CapabilityStory } from "./capability-story";

gsap.registerPlugin(ScrollTrigger);

/**
 * Beat 3 — the capability system drawn as the brand mark itself. The four
 * discipline arcs of the Quadrant "Q" (docs/BRAND.md logo geometry) become
 * the stage; the eight capabilities orbit their discipline's arc as buttons.
 * On scroll the Q assembles (arcs draw, chips fly out from the center);
 * hovering a capability lights its arc; clicking crossfades the ring out and
 * the story in, inside a fixed frame so nothing jumps. Reduced-motion / no-JS
 * render the resolved mark and stories (zero CLS, fully crawlable).
 */

// Geometry in a square 720 viewBox, mirroring the logo's four-arc ring.
const VB = 720;
const C = 360;
const RING_R = 184;
const BAND = 52;
const CHIP_R = 282;
const GAP = 7; // degrees cut at each cardinal point, like the logo's gaps

const rad = (d: number) => (d * Math.PI) / 180;
const ptOn = (deg: number, r: number): [number, number] => [
  C + r * Math.cos(rad(deg)),
  C + r * Math.sin(rad(deg)),
];
const arcPath = (d1: number, d2: number, r = RING_R) => {
  const [x1, y1] = ptOn(d1, r);
  const [x2, y2] = ptOn(d2, r);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};

// Each discipline owns one 90-degree arc, coloured and placed as in the mark.
const ARCS: { id: DisciplineId; d: string }[] = [
  { id: "strategy", d: arcPath(180 + GAP, 270 - GAP) },
  { id: "design", d: arcPath(270 + GAP, 360 - GAP) },
  { id: "growth", d: arcPath(0 + GAP, 90 - GAP) },
  { id: "technology", d: arcPath(90 + GAP, 180 - GAP) },
];

// Midpoint angle of each discipline's arc; the two chips sit either side of it.
const SECTOR_MID: Record<DisciplineId, number> = {
  strategy: 225,
  design: 315,
  growth: 45,
  technology: 135,
};
const CHIP_SPREAD = 24;

type Placed = {
  node: CapabilityNode;
  x: number;
  y: number;
  flyx: number;
  flyy: number;
};

const LAYOUT: Placed[] = (() => {
  const byDisc = new Map<DisciplineId, CapabilityNode[]>();
  for (const n of capabilityNodes) {
    const arr = byDisc.get(n.discipline) ?? [];
    arr.push(n);
    byDisc.set(n.discipline, arr);
  }
  return capabilityNodes.map((n) => {
    const peers = byDisc.get(n.discipline)!;
    const i = peers.indexOf(n);
    const angle = SECTOR_MID[n.discipline] + (i === 0 ? -CHIP_SPREAD : CHIP_SPREAD);
    const [x, y] = ptOn(angle, CHIP_R);
    return { node: n, x, y, flyx: C - x, flyy: C - y };
  });
})();

// Discipline labels inside the ring, one per quadrant.
const LABELS = (Object.keys(SECTOR_MID) as DisciplineId[]).map((id) => {
  const [x, y] = ptOn(SECTOR_MID[id], 96);
  return { id, x, y };
});

const CENTER_PCT = (v: number) => `${(v / VB) * 100}%`;

export function CapabilityStage({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const deepLinkedRef = useRef(false);
  const firstWrite = useRef(true);
  const [expanded, setExpanded] = useState<CapabilityNodeId | null>(null);
  const [hovered, setHovered] = useState<CapabilityNodeId | null>(null);

  // Which discipline's arc is lit: the hovered chip's, else the open node's.
  const activeDisc: DisciplineId | null = hovered
    ? getNode(hovered).discipline
    : expanded
      ? getNode(expanded).discipline
      : null;

  const focusChip = useCallback((id: CapabilityNodeId) => {
    const candidates = [chipRefs.current[`${id}-d`], chipRefs.current[`${id}-m`]];
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

  // Move focus into the opened story; keep triggers honest after the swap.
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

  // Deep link: open #capabilities/<id> on load and bring the section into view.
  useEffect(() => {
    const match = window.location.hash.match(/^#capabilities\/([a-z-]+)$/);
    const id = match?.[1];
    if (id && capabilityNodes.some((n) => n.id === id)) {
      deepLinkedRef.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpanded(id as CapabilityNodeId);
      requestAnimationFrame(() =>
        stageRef.current?.closest("section")?.scrollIntoView({ block: "start" }),
      );
    }
  }, []);

  // Reflect the open node in the URL (replaceState, skip the mount write).
  useEffect(() => {
    if (firstWrite.current) {
      firstWrite.current = false;
      return;
    }
    const base = window.location.pathname + window.location.search;
    window.history.replaceState(
      null,
      "",
      expanded ? `${base}#capabilities/${expanded}` : `${base}#capabilities`,
    );
  }, [expanded]);

  // Entrance: the Q assembles. Arcs draw, chips fly out from center to orbit.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion() || deepLinkedRef.current) return;

    const svg = stage.querySelector<SVGSVGElement>(".cap-ring");
    const chips = Array.from(stage.querySelectorAll<HTMLElement>(".cap-chip-d"));
    if (!svg || chips.length === 0) return;

    const arcs = svg.querySelectorAll<SVGPathElement>(".cap-arc");
    const cross = svg.querySelectorAll<SVGPathElement>(".cap-cross");
    const tail = svg.querySelector<SVGPathElement>(".cap-tail");
    const dot = svg.querySelector<SVGCircleElement>(".cap-center");
    const labels = svg.querySelectorAll<SVGTextElement>(".cap-label");

    // Chips live in the square ring box, so px-per-viewBox-unit is measured
    // from the SVG, not the full-width stage.
    const scale = svg.getBoundingClientRect().width / VB;

    const ctx = gsap.context(() => {
      gsap.set([arcs, tail, cross], { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { opacity: 0 });
      chips.forEach((chip) => {
        gsap.set(chip, {
          x: Number(chip.dataset.flyx) * scale,
          y: Number(chip.dataset.flyy) * scale,
          scale: 0.4,
          opacity: 0,
          transformOrigin: "50% 50%",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: stage, start: "top 72%", once: true },
      });

      tl.to(cross, { strokeDashoffset: 0, duration: DURATION.standard, ease: EASE.precision })
        .to(arcs, { strokeDashoffset: 0, duration: DURATION.choreo, ease: EASE.precision, stagger: 0.12 }, "-=0.3")
        .to(dot, { scale: 1, duration: 0.4, ease: EASE.precision }, "-=0.7")
        .to(tail, { strokeDashoffset: 0, duration: 0.4, ease: EASE.precision }, "-=0.5")
        .to(
          chips,
          { x: 0, y: 0, scale: 1, opacity: 1, duration: DURATION.choreo, ease: EASE.weighted, stagger: 0.07 },
          "-=0.8",
        )
        .to(labels, { opacity: 1, duration: DURATION.standard, ease: EASE.precision, stagger: 0.05 }, "-=0.6");
    }, stage);

    return () => ctx.revert();
  }, []);

  // A short rise-in on the opening story (desktop crossfade is CSS-driven).
  useEffect(() => {
    if (!expanded || prefersReducedMotion()) return;
    const panel = stageRef.current?.querySelector(`#story-${expanded} .cap-story-inner`);
    if (panel) {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: DURATION.standard, ease: EASE.precision },
      );
    }
  }, [expanded]);

  const chipClass =
    "cap-chip flex items-center gap-2 whitespace-nowrap rounded-md border bg-[#14171d] px-3 py-2 text-sm font-medium text-clarity outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-clarity";

  const arcOpacity = (id: DisciplineId) =>
    activeDisc && activeDisc !== id ? 0.22 : 1;

  return (
    <div
      ref={stageRef}
      data-open={expanded ? "" : undefined}
      className={`cap-stage relative md:h-[640px] ${className ?? ""}`}
    >
      {/* Desktop: the Q mark. Ring + orbiting chips, faded out when a story opens. */}
      <div className="cap-ring-layer hidden md:absolute md:inset-0 md:flex md:items-center md:justify-center">
        <div className="relative aspect-square h-full max-h-[640px]">
          <svg className="cap-ring absolute inset-0 h-full w-full" viewBox={`0 0 ${VB} ${VB}`} aria-hidden="true">
            <path className="cap-cross" pathLength={1} d={`M${C} 70 V${VB - 70}`} stroke="rgba(230,230,230,0.14)" strokeWidth={1} fill="none" />
            <path className="cap-cross" pathLength={1} d={`M70 ${C} H${VB - 70}`} stroke="rgba(230,230,230,0.14)" strokeWidth={1} fill="none" />

            {ARCS.map((a) => (
              <path
                key={a.id}
                className="cap-arc"
                pathLength={1}
                d={a.d}
                stroke={disciplines[a.id].color}
                strokeWidth={BAND}
                strokeLinecap="butt"
                fill="none"
                opacity={arcOpacity(a.id)}
                style={{ transition: "opacity 0.3s var(--ease-precision)" }}
              />
            ))}

            {/* Q tail: welds out of the growth arc at 45 degrees */}
            <path
              className="cap-tail"
              pathLength={1}
              d={`M${ptOn(45, RING_R)[0].toFixed(2)} ${ptOn(45, RING_R)[1].toFixed(2)} L${ptOn(45, RING_R + BAND)[0].toFixed(2)} ${ptOn(45, RING_R + BAND)[1].toFixed(2)}`}
              stroke={disciplines.growth.color}
              strokeWidth={BAND}
              strokeLinecap="butt"
              fill="none"
              opacity={arcOpacity("growth")}
              style={{ transition: "opacity 0.3s var(--ease-precision)" }}
            />

            {LABELS.map((l) => (
              <text
                key={l.id}
                className="cap-label"
                x={l.x}
                y={l.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={disciplines[l.id].color}
                opacity={arcOpacity(l.id)}
                style={{ fontSize: 12, fontFamily: "var(--font-geist-mono)", fontWeight: 500, letterSpacing: "0.14em", transition: "opacity 0.3s var(--ease-precision)" }}
              >
                {disciplines[l.id].label}
              </text>
            ))}

            <circle className="cap-center" cx={C} cy={C} r={4} fill="#e6e6e6" opacity={0.9} />
          </svg>

          {LAYOUT.map(({ node, x, y, flyx, flyy }) => (
            <div
              key={node.id}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: CENTER_PCT(x), top: CENTER_PCT(y) }}
            >
              <button
                type="button"
                ref={(el) => { chipRefs.current[`${node.id}-d`] = el; }}
                onClick={() => toggle(node.id)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.id)}
                onBlur={() => setHovered(null)}
                aria-expanded={expanded === node.id}
                aria-controls={`story-${node.id}`}
                data-flyx={flyx}
                data-flyy={flyy}
                className={`cap-chip-d pointer-events-auto ${chipClass} ${expanded === node.id ? "border-clarity" : "border-hairline hover:border-hairline-strong"}`}
              >
                <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: disciplines[node.discipline].color }} />
                {node.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: readable stacked layout, grouped by discipline. */}
      <div className="cap-mobile-layer grid grid-cols-2 gap-4 md:hidden">
        {(["strategy", "design", "technology", "growth"] as DisciplineId[]).map((d) => (
          <div key={d} className="flex flex-col gap-3 rounded-md border border-hairline bg-raised/30 p-4">
            <span className="label-mono" style={{ color: disciplines[d].color }}>{disciplines[d].label}</span>
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

      {/* Story region: every story in the DOM (crawlable); the active one is
          shown, as a crossfaded overlay on desktop and in flow on mobile. */}
      <noscript>
        <style>{`.cap-story-overlay,.capability-story{display:block !important;opacity:1 !important;position:static !important}`}</style>
      </noscript>
      <div className="cap-story-overlay">
        {capabilityNodes.map((n) => (
          <div
            key={n.id}
            id={`story-${n.id}`}
            role="region"
            aria-labelledby={`heading-${n.id}`}
            data-active={expanded === n.id ? "true" : undefined}
            className="capability-story group overflow-hidden rounded-lg border border-hairline bg-balance shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)] md:h-full"
          >
            <div className="cap-story-inner md:h-full md:overflow-y-auto" data-lenis-prevent>
              <CapabilityStory
                node={n}
                onClose={close}
                onJump={jump}
                ref={expanded === n.id ? headingRef : undefined}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
