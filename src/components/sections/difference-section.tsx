import { Reveal } from "@/components/motion/reveal";
import { NetworkDiagram } from "@/components/motion/network-diagram";
import { CornerTicks } from "@/components/ui/corner-ticks";
import {
  StructureGlyph,
  FlowGlyph,
  IntersectionGlyph,
} from "@/components/brand/glyphs";

/** One glyph per principle: built like a product → structure; systems over
 *  one-offs → flow; honesty → intersection (where claim and proof meet). */
const PRINCIPLE_GLYPHS = [StructureGlyph, FlowGlyph, IntersectionGlyph];

/**
 * Beat 6 — The difference (STRATEGY.md). Why us? The craft argument: three
 * principles stated plainly, and the network moment that makes the thesis
 * interactive — touch one discipline, the rest respond. Otherwise near-still;
 * restraint is the point.
 */

const PRINCIPLES = [
  {
    n: "01",
    title: "Built like a product, not a campaign",
    body: "Engineering standards, not agency churn. Code and design meant to last five years, not one quarter.",
  },
  {
    n: "02",
    title: "Systems over one-offs",
    body: "Everything is designed to extend and compound. Today's page is tomorrow's platform, not a dead end.",
  },
  {
    n: "03",
    title: "Honesty as a feature",
    body: "No invented proof, no hype adjectives. Claims we can back, and the clarity to say what we won't do.",
  },
];

export function DifferenceSection() {
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <Reveal className="flex flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">
            06 · Why us
          </span>
          <h2
            data-reveal
            className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity"
          >
            Growth happens at the intersection.
          </h2>
          <p data-reveal className="max-w-xl text-lead text-muted-2">
            Not in isolation. Touch one discipline and the others respond. That
            is exactly why we refuse to sell them separately from the system.
          </p>
        </Reveal>

        <Reveal className="flex flex-col items-center gap-6">
          {/* Affordance: same vocabulary as the capability ring; the only
              reliable cue on touch, where hover never fires. */}
          <p data-reveal className="label-mono flex items-center gap-2 text-muted-2">
            <span
              aria-hidden
              className="size-1.5 animate-pulse rounded-full bg-clarity"
            />
            Tap a discipline. Watch the others respond.
          </p>
          <div data-reveal className="mx-auto w-full max-w-2xl">
            <NetworkDiagram />
          </div>
        </Reveal>

        {/* One data-reveal on the grid, not per card: staggering cells of a
            gap-px table briefly shows empty slots that read as broken. */}
        <Reveal className="group relative">
          <CornerTicks />
          <div data-reveal className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-3">
            {PRINCIPLES.map((p, i) => {
              const Glyph = PRINCIPLE_GLYPHS[i];
              return (
                <div key={p.n} className="relative flex flex-col gap-4 overflow-hidden bg-depth p-8">
                  {/* The brand's own visual language, ghosted as card texture. */}
                  <Glyph className="pointer-events-none absolute -bottom-5 -right-4 w-28 opacity-[0.14]" />
                  <span className="label-mono text-muted-2">{p.n}</span>
                  <h3 className="text-title font-medium text-clarity">{p.title}</h3>
                  <p className="text-lead text-muted-2">{p.body}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
