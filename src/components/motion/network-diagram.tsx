"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Beat 6 — The difference (STRATEGY.md), signature moment 3 of 3: the
 * network. Four disciplines, fully connected. Activating one (hover, focus,
 * or tap) lights its links to every other — "everything affects everything;
 * growth happens at the intersection." Pure CSS transitions on stroke/opacity
 * (cheap, no rAF). Resting state is complete and legible, so no-JS, mobile,
 * and reduced-motion all read fine; interaction is enhancement.
 *
 * Touch users never hover, so the diagram demonstrates itself once on scroll
 * into view: each node lights its connections in turn, then the graph settles
 * to neutral. Any real interaction cancels the demo instantly (the visitor's
 * gesture always wins). Skipped under reduced motion. Each node also carries
 * an invisible enlarged hit rect so taps land on a phone (the visible pill is
 * ~74x23px at 360px wide, well under the 44px minimum).
 */

const VISION = "#7C3AED";
const SPARK = "#D97706";
const INTELLIGENCE = "#2563EB";
const GROWTH = "#00D1B2";
const HAIRLINE = "rgba(230,230,230,0.16)";

type Key = "strategy" | "design" | "technology" | "growth";

const NODES: Record<Key, { x: number; y: number; color: string; label: string }> = {
  strategy: { x: 300, y: 78, color: VISION, label: "Strategy" },
  design: { x: 474, y: 235, color: SPARK, label: "Design" },
  technology: { x: 300, y: 392, color: INTELLIGENCE, label: "Technology" },
  growth: { x: 126, y: 235, color: GROWTH, label: "Growth" },
};

const KEYS = Object.keys(NODES) as Key[];
const EDGES: [Key, Key][] = [
  ["strategy", "design"],
  ["strategy", "technology"],
  ["strategy", "growth"],
  ["design", "technology"],
  ["design", "growth"],
  ["technology", "growth"],
];

/** Milliseconds each node stays lit during the self-demo. */
const DEMO_STEP = 750;
/** Beat before the demo starts, once the diagram is in view. */
const DEMO_LEAD = 400;

export function NetworkDiagram({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const demoTimers = useRef<number[]>([]);
  const interactedRef = useRef(false);
  const [active, setActive] = useState<Key | null>(null);

  // The visitor's gesture always beats the demo.
  const cancelDemo = () => {
    demoTimers.current.forEach(clearTimeout);
    demoTimers.current = [];
    interactedRef.current = true;
  };

  const activate = (k: Key | null) => {
    cancelDemo();
    setActive(k);
  };

  // Self-demonstrating entrance: light each node's connections once, in
  // reading order, then settle. Runs once when the diagram scrolls into view.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const svg = svgRef.current;
    if (!svg || !("IntersectionObserver" in window)) return;

    // The demo is a sequence of state changes, not a tween, so it needs
    // nothing more than timers. This is what used to pin GSAP here.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        if (interactedRef.current) return;
        KEYS.forEach((k, i) => {
          demoTimers.current.push(
            window.setTimeout(() => setActive(k), DEMO_LEAD + i * DEMO_STEP),
          );
        });
        demoTimers.current.push(
          window.setTimeout(
            () => setActive(null),
            DEMO_LEAD + KEYS.length * DEMO_STEP,
          ),
        );
      },
      { rootMargin: "0px 0px -28% 0px" },
    );

    io.observe(svg);
    return () => {
      io.disconnect();
      demoTimers.current.forEach(clearTimeout);
      demoTimers.current = [];
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 470"
      className={`h-auto w-full ${className ?? ""}`}
      role="img"
      aria-label="The four disciplines (Strategy, Design, Technology and Growth) fully connected: activating any one reinforces every other."
    >
      {EDGES.map(([a, b]) => {
        const incident = active === a || active === b;
        const color = active ? NODES[active].color : HAIRLINE;
        return (
          <line
            key={`${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke={incident ? color : HAIRLINE}
            strokeWidth={incident ? 1.5 : 1}
            style={{
              opacity: active ? (incident ? 1 : 0.25) : 0.55,
              transition: "opacity 200ms ease, stroke 200ms ease",
            }}
          />
        );
      })}

      <circle cx={300} cy={235} r={3} fill={active ? NODES[active].color : "#5c6068"} style={{ transition: "fill 200ms ease" }} />

      {KEYS.map((k) => {
        const n = NODES[k];
        const isActive = active === k;
        const dim = active && !isActive;
        return (
          <g
            key={k}
            transform={`translate(${n.x} ${n.y})`}
            tabIndex={0}
            role="button"
            aria-label={n.label}
            style={{ cursor: "pointer", outline: "none", opacity: dim ? 0.5 : 1, transition: "opacity 200ms ease" }}
            onMouseEnter={() => activate(k)}
            onMouseLeave={() => activate(null)}
            onFocus={() => activate(k)}
            onBlur={() => activate(null)}
            onClick={() => {
              cancelDemo();
              setActive((cur) => (cur === k ? null : k));
            }}
          >
            {/* Invisible enlarged hit area: >=44px tall at phone widths. */}
            <rect x={-85} y={-38} width={170} height={76} rx={12} fill="rgba(0,0,0,0)" stroke="none" />
            <rect
              x={-62}
              y={-19}
              width={124}
              height={38}
              rx={8}
              fill="#14171d"
              stroke={isActive ? n.color : HAIRLINE}
              strokeWidth={isActive ? 1.5 : 1}
              style={{ transition: "stroke 200ms ease" }}
            />
            <circle cx={-42} cy={0} r={4} fill={n.color} />
            <text
              x={-28}
              y={5}
              fill="#e6e6e6"
              style={{ fontSize: 14, fontFamily: "var(--font-geist-sans)", fontWeight: 500 }}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
