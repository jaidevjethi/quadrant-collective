import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CapabilitiesAssembly } from "./capabilities-assembly";

/**
 * Beat 3 — Capabilities (STRATEGY.md). What do we solve? Outcomes, not a
 * service menu: the four disciplines are the answer, and the assembly moment
 * below makes the thesis move. Copy stays short — the diagram does the work.
 */
export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="scroll-mt-24 px-gutter py-section">
      <div className="mx-auto max-w-4xl">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <span data-reveal className="label-mono text-muted-2">
            03 · What we solve
          </span>
          <h2
            data-reveal
            className="font-heading text-headline font-medium tracking-tight text-clarity"
          >
            Not a stack of tools. One system.
          </h2>
          <p data-reveal className="max-w-xl text-lead text-muted-2">
            The capabilities most businesses buy piecemeal only compound when
            they reinforce each other. Four disciplines, one connected operation.
          </p>
        </Reveal>
        <CapabilitiesAssembly className="mt-16" />
        <Reveal className="mt-12 flex justify-center">
          <Link
            data-reveal
            href="/services"
            className="group inline-flex items-center gap-2 text-sm text-muted-2 transition-colors duration-200 hover:text-clarity"
          >
            See services and pricing
            <ArrowRight className="size-4 transition-transform duration-200 ease-[var(--ease-precision)] group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
