import { Reveal } from "@/components/motion/reveal";

/**
 * Beat 2 — The belief (STRATEGY.md). What do we believe? Names the problem
 * the audience already feels, then turns. Emphasis comes from value contrast
 * (muted problem → clarity stance), not a second accent colour — restraint
 * between the hero and Capabilities makes both land harder. The gradient
 * registration rule ties the section to the brand system (cf. BrandTagline).
 */
export function BeliefSection() {
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto flex max-w-4xl gap-6 lg:gap-10">
        <span
          aria-hidden
          className="w-px shrink-0 self-stretch bg-gradient-to-b from-vision via-intelligence to-growth opacity-60"
        />
        <Reveal className="flex flex-col gap-8">
          <span data-reveal className="label-mono text-muted-2">
            02 · What we believe
          </span>
          <p
            data-reveal
            className="text-headline font-medium tracking-tight text-muted-2"
          >
            Most businesses don&apos;t have a marketing problem.{" "}
            <span className="text-clarity">
              They have a systems problem.
            </span>
          </p>
          <p data-reveal className="max-w-xl text-lead text-muted-2">
            Good tools, working in isolation, quietly cancel each other out. We
            build the system that makes them compound instead.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
