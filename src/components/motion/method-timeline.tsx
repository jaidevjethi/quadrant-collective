import type { CSSProperties } from "react";

/**
 * Beat 4 — The method (STRATEGY.md). The axis-draw motion from the brand
 * language: a vertical gradient axis draws top to bottom, then each step's
 * node and content plot in along it.
 *
 * Driven by one named view timeline on the wrapper (see .mt-band in
 * src/app/motion.css); the axis, dots and rows separate themselves with
 * animation-range offsets. Rise and fade only, no 3D and no overshoot
 * (constitution: never bouncy, never exaggerated). Replaces a GSAP timeline,
 * so this is now a server component with no client JavaScript. Static markup
 * is the resolved state; motion only enhances.
 */

const STEPS = [
  {
    n: "01",
    title: "Map",
    body: "We map the business, the market, and the gap before anything is designed.",
  },
  {
    n: "02",
    title: "Design the system",
    body: "Positioning, structure, and interface designed as one decision, not three.",
  },
  {
    n: "03",
    title: "Build with craft",
    body: "Production-grade engineering: fast, accessible, and measured against real numbers.",
  },
  {
    n: "04",
    title: "Compound",
    body: "We ship, measure, and refine so the results build on each other.",
  },
];

export function MethodTimeline({ className }: { className?: string }) {
  return (
    <div className={`mt-band relative overflow-x-clip ${className ?? ""}`}>
      <span
        data-axis
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-vision via-intelligence to-growth"
      />
      <ol className="flex flex-col gap-12">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            data-row
            style={
              {
                "--r0": `${22 + i * 9}%`,
                "--r1": `${52 + i * 9}%`,
              } as CSSProperties
            }
            className="relative flex gap-6 pl-8"
          >
            <span
              data-dot
              aria-hidden
              className="absolute left-0 top-1.5 size-[15px] rounded-full border border-hairline-strong bg-depth"
            >
              <span className="absolute inset-[3px] rounded-full bg-clarity" />
            </span>
            <div className="flex flex-col gap-2">
              <span className="label-mono text-muted-2">{s.n}</span>
              <h3 className="text-title font-medium text-clarity">{s.title}</h3>
              <p className="max-w-md text-lead text-muted-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
