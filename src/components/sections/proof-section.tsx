import { Reveal } from "@/components/motion/reveal";
import { ProofCounters } from "@/components/motion/proof-counters";

/**
 * Beat 5 — Proof (STRATEGY.md). Why trust us? At launch there are no case
 * studies yet, and the constitution forbids inventing them. So the proof is
 * the page itself — the site is the strongest sales asset (VISION.md). Real,
 * defensible build standards stand in until real client work is ready to be
 * shown properly, at which point it slots in above the standards.
 */
export function ProofSection() {
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto flex max-w-4xl flex-col gap-12">
        <Reveal className="flex flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">
            05 · Proof
          </span>
          <h2
            data-reveal
            className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity"
          >
            The proof is the page you&apos;re on.
          </h2>
          <p data-reveal className="max-w-xl text-lead text-muted-2">
            We could list credentials. Instead, look at how this site performs,
            reads, and holds together. Every client build is held to the same
            standard.
          </p>
        </Reveal>
        <Reveal>
          <div data-reveal>
            <ProofCounters />
          </div>
        </Reveal>
        <Reveal>
          <p data-reveal className="max-w-xl text-sm text-faint">
            Selected client work joins this section as each project is ready to
            be shown properly. Results first, no filler.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
