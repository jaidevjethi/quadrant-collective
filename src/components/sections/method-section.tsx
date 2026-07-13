import { Reveal } from "@/components/motion/reveal";
import { MethodTimeline } from "@/components/motion/method-timeline";
import { LogoMark } from "@/components/brand/logo-mark";

/**
 * Beat 4 — The method (STRATEGY.md). How do we work? For a founder-led studio,
 * a clear process signals maturity more than headcount. Four steps on a drawn
 * axis — the credibility engine.
 */
export function MethodSection() {
  return (
    <section
      id="method"
      className="relative scroll-mt-24 overflow-hidden border-y border-hairline bg-raised px-gutter py-section"
    >
      {/* The empty right half of the timeline balanced by the mark as an
          engineering drawing: the process, literally under construction. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[3%] top-1/2 hidden -translate-y-1/2 opacity-[0.06] lg:block"
      >
        <LogoMark size={360} variant="construction" tone="mono" decorative />
      </div>
      <div className="relative mx-auto flex max-w-4xl flex-col gap-16">
        <Reveal className="flex flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">
            04 · How we work
          </span>
          <h2
            data-reveal
            className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity"
          >
            A process you can see coming.
          </h2>
          <p data-reveal className="max-w-xl text-lead text-muted-2">
            No black box, no surprises. Every engagement moves through the same
            four stages, so you always know where the work is and why.
          </p>
        </Reveal>
        <MethodTimeline />
      </div>
    </section>
  );
}
