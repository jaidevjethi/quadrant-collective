import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProofCounters } from "@/components/motion/proof-counters";
import { caseStudies, KIND_LABEL } from "@/lib/work";
import { CornerTicks } from "@/components/ui/corner-ticks";
import { SpotlightCard } from "@/components/ui/spotlight-card";

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
              The proof is the work.
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
            Selected projects for real businesses, from a live bilingual dental
            practice to an editorial tourism site. Every build is held to the
            standards below.
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
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-depth">
                    <Image
                      src={c.image}
                      alt={`${c.client} project by Quadrant Collective`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 ease-[var(--ease-precision)] group-hover:scale-[1.03]"
                    />
                    <span className="label-mono absolute left-4 top-4 rounded-sm border border-hairline-strong bg-depth/80 px-2.5 py-1 text-clarity backdrop-blur-sm">
                      {KIND_LABEL[c.kind]}
                    </span>
                  </div>
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

        {/* One client voice, kept quiet on purpose: a short verbatim fragment,
            attributed, linking to the full case where the details live.
            Restraint here reads as confidence; the work above carries the sell. */}
        <Reveal className="mt-6">
          <figure
            data-reveal
            className="flex flex-col gap-4 border-l border-hairline-strong pl-6 md:pl-8"
          >
            <blockquote className="max-w-2xl text-lead text-muted-2">
              &ldquo;They re-engineered how patients find us and book
              treatments.&rdquo;
            </blockquote>
            <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-sm font-medium text-clarity">
                Dr. Akshar Patel
              </span>
              <span className="label-mono text-faint">
                Founder, Pramukh Dental Clinic
              </span>
              <Link
                href="/work/pramukh-dental"
                className="group inline-flex items-center gap-1.5 text-sm text-muted-2 underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-clarity"
              >
                Read the case
                <ArrowRight className="size-3.5 transition-transform duration-200 ease-[var(--ease-precision)] group-hover:translate-x-0.5" />
              </Link>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="flex flex-col gap-5 mt-6">
          <span data-reveal className="label-mono text-faint">
            Held to these standards, on every build
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
