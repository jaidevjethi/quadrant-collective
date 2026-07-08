import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";
import { HeroField } from "./hero-field";

/**
 * Beat 1 — Arrival (STRATEGY.md). The arrival is staged as engineered space,
 * not a flat void: an ambient coordinate field (grid + light + vignette),
 * corner registration marks (the brand's signature detail), then the mark and
 * headline with presence. Two tiers of action (contact + see the work) and an
 * honest, specific credibility line. The backdrop is static CSS: no JS, no CLS,
 * no cost to the LCP headline.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-gutter py-section text-center">
      {/* Ambient engineered field (cursor parallax, reduced-motion safe) */}
      <HeroField />

      {/* Corner registration marks: frames the arrival like a technical drawing */}
      <div aria-hidden className="pointer-events-none absolute inset-5 md:inset-9">
        <span className="absolute left-0 top-0 size-4 border-l border-t border-hairline-strong" />
        <span className="absolute right-0 top-0 size-4 border-r border-t border-hairline-strong" />
        <span className="absolute bottom-0 left-0 size-4 border-b border-l border-hairline-strong" />
        <span className="absolute bottom-0 right-0 size-4 border-b border-r border-hairline-strong" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <LogoMark size={140} variant="construction" glow />

        <div className="flex flex-col items-center gap-5">
          <span className="label-mono text-muted-2">
            Strategy. Design. Technology. Growth.
          </span>
          <h1 className="flex max-w-3xl flex-col items-center gap-3">
            <span className="font-heading text-display font-medium tracking-tight text-clarity">
              Four disciplines.
            </span>
            <span className="font-heading -mr-[0.34em] bg-gradient-to-r from-vision via-intelligence to-growth bg-clip-text text-title font-medium uppercase tracking-[0.34em] text-transparent">
              One system
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button
              asChild
              size="lg"
              className="h-11 gap-2 rounded-sm border border-hairline-strong bg-transparent px-6 text-clarity shadow-none transition-colors duration-200 ease-[var(--ease-precision)] hover:border-clarity hover:bg-raised"
            >
              <a href="#contact">
                Start a conversation
                <ArrowRight className="size-4 transition-transform duration-200 ease-[var(--ease-precision)] group-hover/button:translate-x-0.5" />
              </a>
            </Button>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm text-muted-2 transition-colors duration-200 hover:text-clarity"
            >
              See the work
              <ArrowRight className="size-4 transition-transform duration-200 ease-[var(--ease-precision)] group-hover:translate-x-0.5" />
            </Link>
          </div>
          <span className="label-mono text-faint">
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
