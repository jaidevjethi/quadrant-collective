import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { caseStudies, KIND_LABEL } from "@/lib/work";
import { CornerTicks } from "@/components/ui/corner-ticks";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { VelocitySkew } from "@/components/motion/velocity-skew";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Quadrant Collective. Case studies across dental, travel, wellness and healthcare, built for real businesses in India.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const hasWork = caseStudies.length > 0;

  return (
    <main className="flex flex-1 flex-col px-gutter py-section">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16">
        <div className="flex flex-col gap-6">
          <span className="label-mono text-muted-2">Work</span>
          <h1 className="max-w-3xl font-heading text-display font-medium tracking-tight text-clarity">
            Built for real businesses.
          </h1>
          <p className="max-w-2xl text-lead text-muted-2">
            A selection of recent projects across dental, travel, wellness and
            healthcare. Every one was made for a real client with a real market
            to win. Full, results-led write-ups are in progress.
          </p>
        </div>

        {hasWork ? (
          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((c) => (
              <VelocitySkew key={c.slug}>
                <SpotlightCard as="div" className="h-full">
                  <CornerTicks />
                  <Link
                    href={`/work/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden transition-all duration-300 ease-[var(--ease-precision)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-depth">
                      <Image
                        src={c.image}
                        alt={`${c.client} project by Quadrant Collective`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 ease-[var(--ease-precision)] group-hover:scale-[1.05]"
                      />
                      <span className="label-mono absolute left-4 top-4 rounded-sm border border-hairline-strong bg-depth/80 px-2.5 py-1 text-clarity backdrop-blur-sm shadow-xl">
                        {KIND_LABEL[c.kind]}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex flex-col gap-1">
                        <span className="label-mono text-muted-2">
                          {c.client} A {c.year}
                        </span>
                        <span className="label-mono text-faint">
                          {c.industry}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-auto pt-2 text-clarity opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="text-sm font-medium">Read case study</span>
                        <ArrowRight className="size-4" />
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </VelocitySkew>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[40svh] items-center justify-center rounded-lg border border-dashed border-hairline-strong bg-raised/20">
            <p className="label-mono text-muted-2">
              Case studies compiling...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
