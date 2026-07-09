"use client";

import { forwardRef } from "react";
import { ArrowRight, X } from "lucide-react";
import {
  disciplines,
  getNode,
  type CapabilityNode,
  type CapabilityNodeId,
} from "@/lib/capabilities";

/**
 * The expanded story for one capability node: definition, how we think, a
 * named framework, a before/after, and the cross-discipline links that let a
 * visitor keep exploring. Presentational; the stage owns state and focus.
 * Content is real HTML (h3 / p / ol / dl) so it is crawlable and answers
 * engines can extract it. Heading receives focus on open (ref forwarded).
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
      <div className="relative flex flex-col gap-8 p-6 md:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close and return to the system"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-md border border-hairline text-muted-2 transition-colors duration-200 hover:border-hairline-strong hover:text-clarity"
        >
          <X className="size-4" />
        </button>

        <header className="flex flex-col gap-3 pr-12">
          <span
            className="label-mono"
            style={{ color: accent }}
          >
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
          <p className="max-w-2xl text-lead text-muted-2">{node.definition}</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* How we think */}
          <div className="flex flex-col gap-3">
            <span className="label-mono text-faint">How we think</span>
            {node.philosophy.map((p) => (
              <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-muted-2">
                {p}
              </p>
            ))}
          </div>

          {/* The framework */}
          <div className="flex flex-col gap-4">
            <span className="label-mono text-faint">{node.framework.name}</span>
            <ol className="flex flex-col gap-4">
              {node.framework.steps.map((step, i) => (
                <li key={step.name} className="flex gap-4">
                  <span
                    aria-hidden
                    className="label-mono shrink-0 pt-0.5"
                    style={{ color: accent }}
                  >
                    0{i + 1}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-clarity">
                      {step.name}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-2">
                      {step.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Before / after */}
        <dl className="grid gap-px overflow-hidden rounded-md border border-hairline sm:grid-cols-2">
          <div className="flex flex-col gap-1 bg-raised/30 p-5">
            <dt className="label-mono text-faint">Before</dt>
            <dd className="text-sm font-medium text-muted-2">
              {node.beforeAfter.before.label}
            </dd>
            <dd className="text-sm text-faint">{node.beforeAfter.before.note}</dd>
          </div>
          <div className="flex flex-col gap-1 bg-raised/50 p-5">
            <dt className="label-mono" style={{ color: accent }}>
              After
            </dt>
            <dd className="text-sm font-medium text-clarity">
              {node.beforeAfter.after.label}
            </dd>
            <dd className="text-sm text-muted-2">{node.beforeAfter.after.note}</dd>
          </div>
          {node.beforeAfter.caption && (
            <p className="label-mono border-t border-hairline bg-depth/40 p-3 text-center text-faint sm:col-span-2">
              {node.beforeAfter.caption}
            </p>
          )}
        </dl>

        {/* Cross-discipline links: the exploration affordance */}
        <div className="flex flex-col gap-4">
          <span className="label-mono text-faint">How it shapes the system</span>
          <ul className="flex flex-col gap-2">
            {node.influences.map((inf) => {
              const target = getNode(inf.target);
              const targetAccent = disciplines[target.discipline].color;
              return (
                <li key={inf.target}>
                  <button
                    type="button"
                    onClick={() => onJump(inf.target)}
                    className="group flex w-full items-center gap-3 rounded-md border border-hairline bg-raised/20 p-3 text-left transition-colors duration-200 hover:border-hairline-strong"
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: targetAccent }}
                    />
                    <span className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                      <span className="text-sm font-medium text-clarity">
                        {target.label}
                      </span>
                      <span className="text-sm text-muted-2">{inf.why}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-faint transition-all duration-200 ease-[var(--ease-precision)] group-hover:translate-x-0.5 group-hover:text-clarity" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  },
);
