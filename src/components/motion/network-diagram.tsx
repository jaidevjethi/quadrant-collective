"use client";

import { useState } from "react";

/**
 * Beat 6 — The difference (STRATEGY.md), signature moment 3 of 3: the
 * network. Four disciplines, fully connected. Activating one (hover, focus,
 * or tap) lights its links to every other — "everything affects everything;
 * growth happens at the intersection." Pure CSS transitions on stroke/opacity
 * (cheap, no rAF). Resting state is complete and legible, so no-JS, mobile,
 * and reduced-motion all read fine; interaction is enhancement.
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

export function NetworkDiagram({ className }: { className?: string }) {
  const [active, setActive] = useState<Key | null>(null);

  return (
    <svg
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
            onMouseEnter={() => setActive(k)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(k)}
            onBlur={() => setActive(null)}
            onClick={() => setActive((cur) => (cur === k ? null : k))}
          >
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
