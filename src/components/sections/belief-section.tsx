import { Reveal } from "@/components/motion/reveal";

/**
 * Beat 2 — The belief (STRATEGY.md). What do we believe? The hero states the
 * thesis (a systems problem); this beat advances it with the felt pain: most
 * business websites are expenses wearing an asset's clothes. Emphasis comes
 * from value contrast (muted problem → clarity stance), not a second accent
 * colour — restraint between the hero and Capabilities makes both land
 * harder. The gradient registration rule ties the section to the brand system.
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
            Most business websites are expenses dressed up as assets.{" "}
            <span className="text-clarity">We build the opposite.</span>
          </p>
          <p data-reveal className="max-w-xl text-lead text-muted-2">
            An expense sits there and costs money. An asset earns more the
            longer it runs. The difference is whether the pieces behind it
            work as one system or quietly cancel each other out.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
