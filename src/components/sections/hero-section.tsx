import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";
import { HeroChoreo } from "@/components/motion/hero-choreo";

/**
 * Beat 1 — Arrival (STRATEGY.md). The arrival is staged as deep space travel,
 * creating a cinematic discovery of the agency.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-gutter py-section text-center">

      {/* Corner registration marks: frames the arrival like a technical drawing */}
      <div aria-hidden className="pointer-events-none absolute inset-5 md:inset-9">
        <div className="absolute left-0 top-0 size-3 border-l border-t border-hairline-strong" />
        <div className="absolute right-0 top-0 size-3 border-r border-t border-hairline-strong" />
        <div className="absolute bottom-0 left-0 size-3 border-b border-l border-hairline-strong" />
        <div className="absolute bottom-0 right-0 size-3 border-b border-r border-hairline-strong" />
      </div>

      <HeroChoreo>
        {/* Step 1: The signal (logo mark) */}
        <div data-hero-signal className="mb-12 flex justify-center text-clarity">
          <LogoMark className="w-16 md:w-20" />
        </div>

        {/* Step 2: The thesis */}
        <div data-hero-text className="flex max-w-4xl flex-col items-center gap-6">
          <h1 className="font-heading text-display-xl font-medium tracking-tight text-clarity">
            Four disciplines.<br />One system.
          </h1>
          <p className="max-w-2xl text-lead text-muted-2">
            Most businesses don&apos;t have a marketing problem. They have a systems problem. 
            We engineer strategy, design, technology and growth into a single architecture 
            built to compound.
          </p>
        </div>

        {/* Step 3: The call to action */}
        <div data-hero-action className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 w-full gap-2 rounded-sm bg-clarity px-8 text-depth transition-colors hover:bg-clarity/90 sm:w-auto"
          >
            <Link href="/services">
              Examine the system
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="h-12 w-full gap-2 rounded-sm border border-hairline-strong bg-transparent px-8 text-clarity shadow-none transition-colors hover:border-clarity hover:bg-raised sm:w-auto"
          >
            <Link href="/contact">Start a conversation</Link>
          </Button>
        </div>
      </HeroChoreo>

      {/* Scroll indicator (absolute bottom) */}
      <div
        data-hero-scroll
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
      >
        <span className="label-mono text-faint">Initiate</span>
        <div className="h-12 w-px overflow-hidden bg-grid-line">
          <div className="h-full w-full animate-hero-scroll bg-clarity" />
        </div>
      </div>
    </section>
  );
}
