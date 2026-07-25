import type { CSSProperties } from "react";

/**
 * Signature moment 1 of 3 (STRATEGY.md): the blueprint entry. Between the
 * problem and the capabilities, a construction band draws itself: baseline,
 * coordinate ticks, then a rising guide toward the assembly.
 *
 * Driven by a named view timeline declared on the wrapper (see .bp-band in
 * src/app/motion.css); every child reads that one timeline and separates
 * itself with an animation-range offset. That replaces a GSAP timeline and
 * makes this a server component with no client JavaScript.
 *
 * stroke-dashoffset is not a composited property, which is normally a rule
 * against it. It is acceptable here because the subject is one small bounded
 * SVG, 1200x90, rather than a page-length layer.
 */

const TICKS = [150, 350, 550, 750, 950, 1050];

const MONO: CSSProperties = {
  fontSize: 10,
  fontFamily: "var(--font-geist-mono)",
  letterSpacing: "0.16em",
};

export function BlueprintEntry() {
  return (
    <div aria-hidden className="px-gutter">
      <div className="bp-band mx-auto w-full max-w-5xl">
        <svg
          viewBox="0 0 1200 90"
          preserveAspectRatio="xMidYMid meet"
          className="h-auto w-full"
        >
          <line
            className="bp-base"
            x1="0"
            y1="70"
            x2="1200"
            y2="70"
            stroke="rgba(230,230,230,0.28)"
            strokeWidth="1"
          />
          {TICKS.map((x, i) => (
            <line
              key={x}
              className="bp-tick"
              style={
                {
                  "--r0": `${26 + i * 4}%`,
                  "--r1": `${46 + i * 4}%`,
                } as CSSProperties
              }
              x1={x}
              y1={i % 2 === 0 ? 58 : 62}
              x2={x}
              y2="70"
              stroke="rgba(230,230,230,0.45)"
              strokeWidth="1"
            />
          ))}
          <text className="bp-label" x="150" y="46" fill="#5c6068" style={MONO}>
            X · DISCIPLINES
          </text>
          <text
            className="bp-label"
            x="950"
            y="46"
            textAnchor="end"
            fill="#5c6068"
            style={MONO}
          >
            Y · COMPOUNDING
          </text>
          <line
            className="bp-rise"
            x1="600"
            y1="70"
            x2="600"
            y2="0"
            stroke="rgba(0,209,178,0.5)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
