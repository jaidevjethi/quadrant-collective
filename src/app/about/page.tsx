import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Atmosphere } from "@/components/ui/atmosphere";
import { CornerTicks } from "@/components/ui/corner-ticks";
import {
  StructureGlyph,
  FlowGlyph,
  IntersectionGlyph,
} from "@/components/brand/glyphs";
import { IntroField } from "@/components/ui/intro-field";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Quadrant Collective is an independent, founder-led digital studio in the Gujarat corridor. We bring strategy, design, technology and growth together as one system.",
  alternates: { canonical: "/about" },
};

/**
 * /about is the honest solo-studio story as a trust signal (STRATEGY.md).
 * Founder content is real and founder-supplied (2026-07-06): name, portrait,
 * and biography facts (Ganpat University, Canada, Microsoft). No fake team,
 * no invented history.
 */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jaidev Jethi",
  jobTitle: "Founder",
  worksFor: {
    "@type": "Organization",
    name: "Quadrant Collective",
    url: SITE_URL,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Ganpat University",
    address: "Mehsana, Gujarat, India",
  },
  image: `${SITE_URL}/founder/jaidev-jethi.webp`,
  url: `${SITE_URL}/about/`,
};

/** One glyph per principle, ghosted as card texture (matches Beat 6). */
const PRINCIPLE_GLYPHS = [StructureGlyph, FlowGlyph, IntersectionGlyph];

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
      <section className="relative isolate overflow-hidden px-gutter pb-24 pt-24">
        {/* The observatory: the calmest violet drift for the page about the
            people behind the glass (the Atmosphere System). */}
        <Atmosphere src="/space/vision.jpg" edge="top" opacity={70} priority />
        <IntroField />
        <Reveal className="mx-auto flex max-w-4xl flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">About</span>
          <TextReveal
            as="h1"
            className="max-w-3xl font-heading text-display font-medium tracking-tight text-clarity"
          >
            A studio that behaves like a product team.
          </TextReveal>
          <p data-reveal className="max-w-2xl text-lead text-muted-2">
            Quadrant Collective is an independent, founder-led studio. We bring in
            specialists per engagement, so every project has exactly the right
            people, without the overhead that makes agencies slow. The
            &ldquo;collective&rdquo; is the disciplines working as one: strategy,
            design, technology, growth.
          </p>
        </Reveal>
      </section>

      {/* The model, honest solo framing */}
      <section className="border-t border-hairline px-gutter py-24">
        <Reveal className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <div data-reveal className="flex flex-col gap-4">
            <span className="label-mono text-muted-2">The model</span>
            <h2 className="font-heading text-headline font-medium tracking-tight text-clarity">
              Small on purpose.
            </h2>
          </div>
          <div data-reveal className="flex flex-col gap-5 text-lead text-muted-2">
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
        </Reveal>
      </section>

      {/* Principles */}
      <section className="border-t border-hairline px-gutter py-24">
        <Reveal className="mx-auto flex max-w-4xl flex-col gap-12">
          <div data-reveal className="flex flex-col gap-4">
            <span className="label-mono text-muted-2">What we hold to</span>
            <h2 className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity">
              Three things we don&apos;t compromise.
            </h2>
          </div>
          <div data-reveal className="group relative">
            <CornerTicks />
            <div className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-3">
              {PRINCIPLES.map((p, i) => {
                const Glyph = PRINCIPLE_GLYPHS[i];
                return (
                  <div key={p.n} className="relative flex flex-col gap-4 overflow-hidden bg-depth/50 p-8 backdrop-blur-md">
                    <Glyph className="pointer-events-none absolute -bottom-5 -right-4 w-28 opacity-[0.14]" />
                    <span className="label-mono text-muted-2">{p.n}</span>
                    <h3 className="text-title font-medium text-clarity">{p.title}</h3>
                    <p className="text-lead text-muted-2">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Founder */}
      <section className="border-t border-hairline px-gutter py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Reveal className="mx-auto max-w-4xl">
          <div data-reveal>
            <SpotlightCard as="div">
              <CornerTicks />
              <div className="grid md:grid-cols-[300px_1fr]">
                <div className="relative aspect-[4/5] md:aspect-auto">
                  <Image
                    src="/founder/jaidev-jethi.webp"
                    alt="Jaidev Jethi, founder of Quadrant Collective"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
                  <span className="label-mono text-muted-2">Who&apos;s behind it</span>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-heading text-headline font-medium tracking-tight text-clarity">
                      Jaidev Jethi
                    </h2>
                    <span className="label-mono text-faint">Founder</span>
                  </div>
                  <div className="flex flex-col gap-4 text-lead text-muted-2">
                    <p>
                      Many people promise growth. Very few can build the systems
                      behind it.
                    </p>
                    <p>
                      Jaidev started at Ganpat University in Mehsana, trained in
                      advanced technology in Canada, and managed cloud systems
                      for Microsoft. Now that experience works for businesses
                      here at home: the same methods large companies rely on,
                      applied with respect and dignity.
                    </p>
                    <p>
                      The studio is based in the Gujarat corridor: Mehsana,
                      Ahmedabad and Vadodara. It works with founders and
                      professional-service leaders across India who value
                      quality over the lowest price.
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline px-gutter py-24">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-start gap-6">
          <h2
            data-reveal
            className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity"
          >
            If that&apos;s the kind of partner you want, let&apos;s talk.
          </h2>
          <div data-reveal>
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
        </Reveal>
      </section>
    </main>
  );
}
