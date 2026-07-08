import { Reveal } from "@/components/motion/reveal";
import { MethodTimeline } from "@/components/motion/method-timeline";

/**
 * Beat 4 — The method (STRATEGY.md). How do we work? For a founder-led studio,
 * a clear process signals maturity more than headcount. Four steps on a drawn
 * axis — the credibility engine.
 */
export function MethodSection() {
  return (
    <section
      id="method"
      className="scroll-mt-24 border-y border-hairline bg-raised px-gutter py-section"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-16">
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
