"use client";

import { forwardRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { CornerTicks } from "@/components/ui/corner-ticks";
import {
  disciplines,
  getNode,
  type CapabilityNode,
  type CapabilityNodeId,
} from "@/lib/capabilities";

/**
 * The expanded story for one capability, composed as an editorial spec card:
 * an identity + prose column on the left, a process + before/after column on
 * the right, and the cross-discipline links along the bottom. Solid surfaces
 * throughout (the panel sits over the animated starfield, so any transparency
 * reads as noise). Presentational; the stage owns state, focus and the open
 * animation. Real semantic HTML (h3 / p / ol / dl) keeps it crawlable.
 */

type Props = {
  node: CapabilityNode;
  onClose: () => void;
  onJump: (id: CapabilityNodeId) => void;
};

export const CapabilityStory = forwardRef<HTMLHeadingElement, Props>(
  function CapabilityStory({ node, onClose, onJump }, headingRef) {
    const accent = disciplines[node.discipline].color;

    return (
      <article className="relative flex h-full flex-col gap-5 p-6 md:gap-6 md:p-8">
        {/* Discipline accent: a hairline in the node's colour across the top. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ backgroundColor: accent, opacity: 0.7 }}
        />
        <CornerTicks />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close and return to the system"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-md border border-hairline bg-depth text-muted-2 transition-colors duration-200 hover:border-hairline-strong hover:text-clarity"
        >
          <X className="size-4" />
        </button>

        {/* Identity */}
        <header className="flex flex-col gap-2 pr-12">
          <span className="label-mono flex items-center gap-2" style={{ color: accent }}>
            <span aria-hidden className="size-1.5 rounded-full" style={{ backgroundColor: accent }} />
            {disciplines[node.discipline].label}
          </span>
          <h3
            ref={headingRef}
            id={`heading-${node.id}`}
            tabIndex={-1}
            className="font-heading text-title font-medium tracking-tight text-clarity outline-none"
          >
            {node.label}
          </h3>
          <p className="max-w-3xl text-base leading-relaxed text-muted-2">{node.definition}</p>
        </header>

        {/* Body: prose column + process column, balanced */}
        <div className="grid flex-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-3">
            <span className="label-mono text-faint">How we think</span>
            {node.philosophy.map((p) => (
              <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-muted-2">
                {p}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-4 md:border-l md:border-hairline md:pl-12">
            <span className="label-mono text-faint">{node.framework.name}</span>
            <ol className="flex flex-col gap-3">
              {node.framework.steps.map((step, i) => (
                <li key={step.name} className="flex gap-3">
                  <span aria-hidden className="label-mono w-6 shrink-0 pt-0.5" style={{ color: accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-clarity">{step.name}</span>
                    <span className="text-sm leading-relaxed text-muted-2">{step.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* The shift: one compact full-width row */}
        <dl className="grid grid-cols-1 overflow-hidden rounded-md border border-hairline sm:grid-cols-2">
          <div className="flex items-baseline gap-3 border-hairline p-4 max-sm:border-b sm:border-r">
            <dt className="label-mono shrink-0 text-faint">Before</dt>
            <dd className="text-sm text-muted-2">{node.beforeAfter.before.label}</dd>
          </div>
          <div className="flex items-baseline gap-3 p-4" style={{ boxShadow: `inset 2px 0 0 ${accent}` }}>
            <dt className="label-mono shrink-0" style={{ color: accent }}>After</dt>
            <dd className="text-sm text-clarity">{node.beforeAfter.after.label}</dd>
          </div>
        </dl>

        {/* Cross-discipline links: the exploration affordance */}
        <footer className="flex flex-col gap-3 border-t border-hairline pt-5">
          <span className="label-mono text-faint">Shapes the system</span>
          <ul className="grid gap-3 sm:grid-cols-3">
            {node.influences.map((inf) => {
              const target = getNode(inf.target);
              const targetAccent = disciplines[target.discipline].color;
              return (
                <li key={inf.target}>
                  <button
                    type="button"
                    onClick={() => onJump(inf.target)}
                    className="group flex h-full w-full flex-col gap-1 rounded-md border border-hairline bg-depth p-3 text-left transition-colors duration-200 hover:border-hairline-strong"
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: targetAccent }} />
                      <span className="text-sm font-medium text-clarity">{target.label}</span>
                      <ArrowUpRight className="ml-auto size-3.5 text-faint transition-colors duration-200 group-hover:text-clarity" />
                    </span>
                    <span className="text-xs leading-relaxed text-muted-2">{inf.why}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </footer>
      </article>
    );
  },
);
