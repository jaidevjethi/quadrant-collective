import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";
import { DeepSpaceBg } from "@/components/motion/deep-space-bg";
import { HeroChoreo } from "@/components/motion/hero-choreo";

/**
 * Beat 1 — Arrival (STRATEGY.md). The arrival is staged as deep space travel,
 * creating a cinematic discovery of the agency.
 * The backdrop uses a pure canvas starfield for 60fps performance on mobile.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-gutter py-section text-center">
      {/* Cinematic Deep Space Field */}
      <DeepSpaceBg />

      {/* Corner registration marks: frames the arrival like a technical drawing */}
      <div aria-hidden className="pointer-events-none absolute inset-5 md:inset-9">
        <span className="absolute left-0 top-0 size-4 border-l border-t border-hairline-strong" />
        <span className="absolute right-0 top-0 size-4 border-r border-t border-hairline-strong" />
        <span className="absolute bottom-0 left-0 size-4 border-b border-l border-hairline-strong" />
        <span className="absolute bottom-0 right-0 size-4 border-b border-r border-hairline-strong" />
      </div>

      <HeroChoreo />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div data-choreo>
          <LogoMark size={140} variant="construction" glow />
        </div>

        <div className="flex flex-col items-center gap-5">
          <span data-choreo className="label-mono text-muted-2">
            Strategy. Design. Technology. Growth.
          </span>
          <h1 className="flex max-w-3xl flex-col items-center gap-3">
            <span
              data-choreo
              className="font-heading text-display font-medium tracking-tight text-clarity"
            >
              Four disciplines.
            </span>
            <span
              data-choreo
              className="font-heading -mr-[0.34em] bg-gradient-to-r from-vision via-intelligence to-growth bg-clip-text text-title font-medium uppercase tracking-[0.34em] text-transparent"
            >
              One system
            </span>
          </h1>
          <span
            data-choreo
            className="mt-4 max-w-lg text-lg text-muted-2"
          >
            For ambitious clinics, practices, and founders who want growth that compounds.
          </span>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div
            data-choreo
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            <Button
              asChild
              size="lg"
              className="h-11 gap-2 rounded-sm border border-hairline-strong bg-transparent px-6 text-clarity shadow-none transition-all duration-200 ease-[var(--ease-precision)] hover:border-clarity hover:bg-raised active:scale-[0.98]"
            >
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="size-4 transition-transform duration-200 ease-[var(--ease-precision)] group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm text-muted-2 transition-colors duration-200 hover:text-clarity"
            >
              See the work
              <ArrowRight className="size-4 transition-transform duration-200 ease-[var(--ease-precision)] group-hover:translate-x-0.5" />
            </Link>
          </div>
          <span data-choreo className="label-mono text-faint">
            Founder-led · Gujarat corridor · India
          </span>
        </div>
      </div>

      {/* Scroll cue with a traveling highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="label-mono text-faint">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-hairline">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-hero-scroll bg-gradient-to-b from-transparent via-clarity/60 to-transparent" />
        </span>
      </div>
    </section>
  );
}
