import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProofCounters } from "@/components/motion/proof-counters";
import { caseStudies, KIND_LABEL } from "@/lib/work";
import { CornerTicks } from "@/components/ui/corner-ticks";

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
              className="group inline-flex items-center gap-2 pb-1.5 text-sm text-muted-2 transition-colors duration-200 hover:text-clarity"
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
            <div key={c.slug} data-reveal className="group relative">
              <CornerTicks />
              <Link
                href={`/work/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-raised transition-all duration-300 ease-[var(--ease-precision)] hover:-translate-y-2 hover:border-clarity hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)]"
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
            </div>
          ))}
        </Reveal>

        <Reveal className="group relative mt-6 rounded-lg border border-hairline bg-depth p-8 md:p-10 transition-colors hover:border-hairline-strong">
          <CornerTicks />
          <div className="flex flex-col gap-6">
            <blockquote className="text-xl text-clarity font-medium">
              "They didn't just build a website, they re-engineered how patients find us and book treatments. Our organic traffic and clinic revenue compounded far beyond what we thought possible."
            </blockquote>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-clarity">Dr. Akshar Patel</span>
              <span className="label-mono text-faint">Founder, Pramukh Dental Clinic</span>
            </div>
          </div>
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
