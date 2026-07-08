import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";
import { HeroChoreo } from "@/components/motion/hero-choreo";
import { Magnetic } from "@/components/motion/magnetic";

/**
 * Beat 1 — Arrival (STRATEGY.md). The arrival is staged as deep space travel,
 * creating a cinematic discovery of the agency.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-gutter text-center">

      {/* Corner registration marks: frames the arrival like a technical drawing */}
      <div aria-hidden className="pointer-events-none absolute inset-5 md:inset-9">
        <div className="absolute left-0 top-0 size-3 border-l border-t border-hairline-strong" />
        <div className="absolute right-0 top-0 size-3 border-r border-t border-hairline-strong" />
        <div className="absolute bottom-0 left-0 size-3 border-b border-l border-hairline-strong" />
        <div className="absolute bottom-0 right-0 size-3 border-b border-r border-hairline-strong" />
      </div>

      <HeroChoreo />

      {/* Top spacer to center content visually */}
      <div className="flex-1" />

      <div className="flex flex-col items-center justify-center py-section z-10">
        {/* Step 1: The signal (logo mark) */}
        <div data-choreo className="mb-12 flex justify-center text-clarity">
          <LogoMark className="w-16 md:w-20" />
        </div>

        {/* Step 2: The thesis */}
        <div data-choreo className="flex max-w-4xl flex-col items-center gap-6">
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
        <div data-choreo className="mt-12 flex flex-col items-center gap-6 sm:flex-row">
          <Magnetic strength={0.2}>
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden h-14 rounded-sm bg-clarity px-10 text-depth shadow-[0_0_40px_rgba(230,230,230,0.15)] transition-all hover:scale-105 hover:bg-white hover:shadow-[0_0_60px_rgba(230,230,230,0.3)] sm:w-auto"
            >
              <Link href="/services">
                <span className="relative z-10 flex items-center gap-2">
                  Examine the system
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Link>
            </Button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden h-14 rounded-sm border border-hairline-strong bg-raised/30 backdrop-blur-sm px-10 text-clarity transition-all hover:scale-105 hover:border-clarity hover:bg-transparent sm:w-auto"
            >
              <Link href="/contact">
                <span className="relative z-10">Start a conversation</span>
              </Link>
            </Button>
          </Magnetic>
        </div>
      </div>

      {/* Bottom spacer to push scroll indicator down */}
      <div className="flex-1" />

      {/* Scroll indicator (document flow, bottom) */}
      <div
        data-choreo
        aria-hidden="true"
        className="mb-10 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="label-mono text-faint">Initiate</span>
        <div className="h-12 w-px overflow-hidden bg-grid-line">
          <div className="h-full w-full animate-hero-scroll bg-clarity" />
        </div>
      </div>
    </section>
  );
}
