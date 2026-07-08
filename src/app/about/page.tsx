import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CornerTicks } from "@/components/ui/corner-ticks";
import { IntroField } from "@/components/ui/intro-field";

export const metadata: Metadata = {
  title: "About",
  description:
    "Quadrant Collective is an independent, founder-led digital studio in the Gujarat corridor. We bring strategy, design, technology and growth together as one system.",
  alternates: { canonical: "/about" },
};

/**
 * /about is the honest solo-studio story as a trust signal (STRATEGY.md). All
 * copy here is drawn from documented brand facts. The founder's name, photo,
 * and personal note are intentionally left for the founder to supply (marked
 * below) rather than invented. No fake team, no invented history.
 */

const PRINCIPLES = [
  {
    n: "01",
    title: "Built like a product, not a campaign",
    body: "Engineering standards over agency churn. Work meant to last five years, not one quarter.",
  },
  {
    n: "02",
    title: "Systems over one-offs",
    body: "Everything is designed to extend and compound. Today's page is tomorrow's platform.",
  },
  {
    n: "03",
    title: "Honesty as a feature",
    body: "No invented proof, no hype. Claims we can back, and the clarity to say what we won't do.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Intro */}
      <section className="relative overflow-hidden px-gutter pb-24 pt-24">
        <IntroField />
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <span className="label-mono text-muted-2">About</span>
          <h1 className="max-w-3xl font-heading text-display font-medium tracking-tight text-clarity">
            A studio that behaves like a product team.
          </h1>
          <p className="max-w-2xl text-lead text-muted-2">
            Quadrant Collective is an independent, founder-led studio. We bring in
            specialists per engagement, so every project has exactly the right
            people, without the overhead that makes agencies slow. The
            &ldquo;collective&rdquo; is the disciplines working as one: strategy,
            design, technology, growth.
          </p>
        </div>
      </section>

      {/* The model, honest solo framing */}
      <section className="border-t border-hairline px-gutter py-24">
        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="label-mono text-muted-2">The model</span>
            <h2 className="font-heading text-headline font-medium tracking-tight text-clarity">
              Small on purpose.
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-lead text-muted-2">
            <p>
              We don&apos;t pretend to be bigger than we are. A lean, founder-led
              studio means the person who understands your business is the same
              person shaping the work. No account layer, no hand-off to a junior
              team you never met.
            </p>
            <p>
              Some projects need a specialist: a particular engineer, a motion
              designer, a paid-media lead. We bring in someone we trust for that
              exact problem. You get senior work, scoped to what you actually
              need.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-hairline px-gutter py-24">
        <div className="mx-auto flex max-w-4xl flex-col gap-12">
          <div className="flex flex-col gap-4">
            <span className="label-mono text-muted-2">What we hold to</span>
            <h2 className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity">
              Three things we don&apos;t compromise.
            </h2>
          </div>
          <div className="group relative">
            <CornerTicks />
            <div className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-3">
              {PRINCIPLES.map((p) => (
                <div key={p.n} className="flex flex-col gap-4 bg-depth p-8">
                  <span className="label-mono text-muted-2">{p.n}</span>
                  <h3 className="text-title font-medium text-clarity">{p.title}</h3>
                  <p className="text-lead text-muted-2">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder: placeholder for founder-supplied content */}
      <section className="border-t border-hairline px-gutter py-24">
        <div className="mx-auto max-w-4xl">
          <div className="group relative rounded-lg border border-hairline bg-raised p-8 md:p-12">
            <CornerTicks />
            {/* TODO(founder): supply name, photo, and a short personal note.
                Do not invent these. The portrait slots into this card. */}
            <div className="flex flex-col gap-6">
              <span className="label-mono text-muted-2">Who&apos;s behind it</span>
              <h2 className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity">
                Founder-led, and hands-on across every engagement.
              </h2>
              <p className="max-w-2xl text-lead text-muted-2">
                The studio is based in the Gujarat corridor: Mehsana, Ahmedabad
                and Vadodara. It works with founders and professional-service
                leaders across India who value quality over the lowest price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline px-gutter py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6">
          <h2 className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity">
            If that&apos;s the kind of partner you want, let&apos;s talk.
          </h2>
          <Button
            asChild
            size="lg"
            className="h-11 gap-2 rounded-sm border border-hairline-strong bg-transparent px-6 text-clarity shadow-none transition-colors duration-200 hover:border-clarity hover:bg-raised"
          >
            <Link href="/contact">
              Start a conversation
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
