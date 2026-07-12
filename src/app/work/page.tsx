import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { caseStudies, KIND_LABEL } from "@/lib/work";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Button } from "@/components/ui/button";
import { CornerTicks } from "@/components/ui/corner-ticks";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Quadrant Collective. Case studies across dental, travel, wellness and healthcare, built for real businesses in India.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const hasWork = caseStudies.length > 0;

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden px-gutter py-section">
      {/* The constellations: built things, looked back on. Blue-violet star
          cluster over the arrival screen only (the Atmosphere System). */}
      <Atmosphere
        src="/space/constellations.jpg"
        edge="top"
        opacity={70}
        span="viewport"
        priority
      />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16">
        <Reveal className="flex flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">Work</span>
          <h1 data-reveal className="max-w-3xl font-heading text-display font-medium tracking-tight text-clarity">
            Built for real businesses.
          </h1>
          <p data-reveal className="max-w-2xl text-lead text-muted-2">
            A selection of recent projects across dental, travel, wellness and
            healthcare. Every one was made for a real client with a real market
            to win.
          </p>
        </Reveal>

        {hasWork ? (
          <Reveal className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((c, i) => (
              <div key={c.slug} data-reveal className="h-full">
                <SpotlightCard as="div" lift className="h-full">
                  <CornerTicks />
                  <Link
                    href={`/work/${c.slug}`}
                    className="flex h-full flex-col overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-depth">
                      <Image
                        src={c.image}
                        alt={`${c.client} project by Quadrant Collective`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 ease-[var(--ease-precision)] group-hover:scale-[1.05]"
                        priority={i < 2}
                      />
                      <span className="label-mono absolute left-4 top-4 rounded-sm border border-hairline-strong bg-depth/80 px-2.5 py-1 text-clarity backdrop-blur-sm shadow-xl">
                        {KIND_LABEL[c.kind]}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <span className="label-mono text-muted-2">
                        {c.client} · {c.year}
                      </span>
                      <h2 className="text-title font-medium text-clarity">
                        {c.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-2">
                        {c.summary}
                      </p>
                      {c.results && c.results.length > 0 && (
                        <p className="flex gap-2 text-sm text-muted-2">
                          <span
                            aria-hidden
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-growth"
                          />
                          {c.results[0]}
                        </p>
                      )}
                      {/* Always visible: a hover-only affordance is invisible on
                          touch, where most Indian B2B visitors browse. */}
                      <div className="flex items-center gap-2 mt-auto pt-2 text-muted-2 transition-colors duration-300 group-hover:text-clarity">
                        <span className="text-sm font-medium">Read case study</span>
                        <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-precision)] group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </div>
            ))}
          </Reveal>
        ) : (
          <div className="flex min-h-[40svh] items-center justify-center rounded-lg border border-dashed border-hairline-strong bg-raised/20">
            <p className="label-mono text-muted-2">
              Case studies compiling...
            </p>
          </div>
        )}

        {/* The ask, after the proof */}
        <Reveal className="flex flex-col items-start gap-5 border-t border-hairline pt-12">
          <h2
            data-reveal
            className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity"
          >
            Have a project like these in mind?
          </h2>
          <p data-reveal className="max-w-xl text-lead text-muted-2">
            Tell us about the business and what you need. We reply within one
            business day.
          </p>
          <div data-reveal className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button
              asChild
              size="lg"
              className="group gap-2 rounded-sm bg-clarity px-8 text-depth transition-colors hover:bg-clarity/90"
            >
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                Start on WhatsApp
              </a>
            </Button>
            <Link
              href="/contact"
              className="text-sm text-muted-2 underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-clarity"
            >
              Start a conversation
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
