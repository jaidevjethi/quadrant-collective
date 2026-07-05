import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";

/**
 * Beat 1 — Arrival (STRATEGY.md). Who are we? The disciplines eyebrow over
 * "Four disciplines." with "ONE SYSTEM" as the tracked-caps gradient line
 * that mirrors the COLLECTIVE wordmark. One CTA, generous silence. The
 * headline is the page's LCP element — text only, no image.
 */
export function HeroSection() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-10 px-gutter py-section text-center">
      <LogoMark size={140} variant="construction" glow />
      <h1 className="flex max-w-3xl flex-col items-center gap-3">
        <span className="label-mono text-muted-2">
          Strategy. Design. Technology. Growth.
        </span>
        <span className="flex flex-col items-center gap-4">
          <span className="font-heading text-display font-medium tracking-tight text-clarity">
            Four disciplines.
          </span>
          <span className="font-heading -mr-[0.34em] bg-gradient-to-r from-vision via-intelligence to-growth bg-clip-text text-title font-medium uppercase tracking-[0.34em] text-transparent">
            One system
          </span>
        </span>
      </h1>
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
    </section>
  );
}
