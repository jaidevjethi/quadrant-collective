import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProofCounters } from "@/components/motion/proof-counters";
import { caseStudies, KIND_LABEL } from "@/lib/work";
import { CornerTicks } from "@/components/ui/corner-ticks";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { WorkImage } from "@/components/ui/work-image";

/**
 * Beat 5 — Proof (STRATEGY.md). Why trust us? Real client work leads, exactly
 * as this section's original note promised once real projects were ready.
 * The two strongest case studies are featured with their real screenshots;
 * the build standards stay as the second layer every project is held to.
 */

const FEATURED_SLUGS = ["pramukh-dental", "divyam-tours"];

export function ProofSection() {
  const featured = caseStudies.filter((c) => FEATURED_SLUGS.includes(c.slug));

  return (
    <section className="px-gutter py-section">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <Reveal className="flex flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">
            05 · Proof
          </span>
          <div
            data-reveal
            className="flex flex-wrap items-end justify-between gap-6"
          >
            <h2 className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity">
              The work, and what it changed.
            </h2>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 pb-1.5 text-sm text-muted-2 underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-clarity"
            >
              All work
              <ArrowRight className="size-4 transition-transform duration-200 ease-[var(--ease-precision)] group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p data-reveal className="max-w-xl text-lead text-muted-2">
            Two recent builds. Each case study says what we found, what we
            chose, and what happened afterwards, with the numbers attributed to
            the client who reported them.
          </p>
        </Reveal>

        <Reveal className="grid gap-8 md:grid-cols-2">
          {featured.map((c) => (
            <div key={c.slug} data-reveal className="h-full">
              <SpotlightCard as="div" lift className="h-full">
                <CornerTicks />
                <Link
                  href={`/work/${c.slug}`}
                  className="flex h-full flex-col overflow-hidden"
                >
                  <WorkImage
                    src={c.image}
                    alt={`${c.client} project by Quadrant Collective`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    interactive
                    className="aspect-[16/10] border-b border-hairline"
                  >
                    <span className="label-mono absolute left-4 top-4 z-[2] rounded-sm border border-hairline-strong bg-depth/80 px-2.5 py-1 text-clarity backdrop-blur-sm">
                      {KIND_LABEL[c.kind]}
                    </span>
                  </WorkImage>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="label-mono text-muted-2">
                      {c.client} · {c.year}
                    </span>
                    <h3 className="text-title font-medium text-clarity">
                      {c.title}
                    </h3>
                  </div>
                </Link>
              </SpotlightCard>
            </div>
          ))}
        </Reveal>

        {/* A client quote sat here and was pulled 2026-07-25: it was attributed
            to a name that did not match the clinic's actual founder. The
            constitution allows no invented proof, and a quote a visitor can
            disprove against the client's own site is worse than no quote. It
            returns when the founder supplies a verified one. */}

        <Reveal className="flex flex-col gap-5 mt-6">
          <span data-reveal className="label-mono text-faint">
            The standard every build is measured against
          </span>
          <div data-reveal className="group relative">
            <CornerTicks />
            <ProofCounters />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
