import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies, KIND_LABEL } from "@/lib/work";
import { CornerTicks } from "@/components/ui/corner-ticks";

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
              <div key={c.slug} className="group relative">
                <CornerTicks />
                <Link
                  href={`/work/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-raised/40 backdrop-blur-md transition-all duration-300 ease-[var(--ease-precision)] hover:-translate-y-2 hover:border-clarity hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)]"
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
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-col gap-1">
                    <span className="label-mono text-muted-2">
                      {c.client} · {c.year}
                    </span>
                    <span className="label-mono text-faint">
                      {c.industry}
                      {c.location ? ` · ${c.location}` : ""}
                    </span>
                  </div>
                  <h2 className="text-title font-medium text-clarity">{c.title}</h2>
                  <p className="text-lead text-muted-2">{c.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {c.services.map((s) => (
                      <span
                        key={s}
                        className="label-mono rounded-sm border border-hairline px-2.5 py-1 text-faint"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-6 rounded-lg border border-hairline bg-raised/40 backdrop-blur-md p-10">
            <span className="label-mono text-faint">In preparation</span>
            <p className="max-w-xl text-lead text-muted-2">
              Case studies are being written up now. We&apos;d rather show you
              real, measurable work than fill this page with filler, so it goes
              live the moment the first project is ready to be shown properly.
            </p>
            <Button
              asChild
              size="lg"
              className="h-11 gap-2 rounded-sm border border-hairline-strong bg-transparent px-6 text-clarity shadow-none transition-colors duration-200 hover:border-clarity hover:bg-raised"
            >
              <Link href="/contact">
                Ask about relevant work
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
