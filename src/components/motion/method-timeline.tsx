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

/** `needsYou` marks the two stages that cost the client time. The section
 *  heading claims they are needed in two of four; showing which two makes the
 *  claim checkable at a glance instead of asking for trust. */
const STEPS = [
  {
    n: "01",
    title: "Map",
    body: "A call where you tell us how the business actually works: who your best customers are, and where they come from today.",
    needsYou: true,
  },
  {
    n: "02",
    title: "Decide",
    body: "We come back with the plan. What to build, in what order, and what we are leaving alone for now, with the reason for each.",
    needsYou: false,
  },
  {
    n: "03",
    title: "Build",
    body: "We design and engineer it. You see it as it comes together, and nothing goes live until you have signed it off.",
    needsYou: true,
  },
  {
    n: "04",
    title: "Compound",
    body: "It ships, we measure what it actually does, and we strengthen the parts that are working.",
    needsYou: false,
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
              <span className="label-mono flex items-center gap-2.5 text-muted-2">
                {s.n}
                {s.needsYou && (
                  <span className="text-growth">Your time</span>
                )}
              </span>
              <h3 className="text-title font-medium text-clarity">{s.title}</h3>
              <p className="max-w-md text-lead text-muted-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
