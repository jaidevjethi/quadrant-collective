import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Button } from "@/components/ui/button";
import { CornerTicks } from "@/components/ui/corner-ticks";
import { IntroField } from "@/components/ui/intro-field";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { PackageNav } from "@/components/services/package-nav";
import { services, SERVICES_POSITIONING, ENGAGEMENT_FLOOR } from "@/lib/services";
import { waLink } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website and SEO foundations, Google Business Profile management and content operations for clinics, labs and local operators in Gujarat. Ongoing work starts at ₹20,000 a month.",
  alternates: { canonical: "/services" },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "Service",
    position: i + 1,
    name: s.title,
    description: s.positioning,
    url: `${SITE_URL}/services/#${s.slug}`,
    provider: {
      "@type": "Organization",
      name: "Quadrant Collective",
      url: SITE_URL,
    },
    areaServed: ["Mehsana", "Ahmedabad", "Vadodara", "India"],
  })),
};

/**
 * Questions buyers actually have on this page, kept distinct from the
 * /contact FAQ (no duplicated questions across FAQPage schemas). Answers are
 * derivable from the packages and the site's standing promises; anything that
 * commits the founder is flagged for his review at commit.
 */
const FAQ: { q: string; a: string }[] = [
  {
    q: "How does an engagement start?",
    a: "You write to us, we reply within one business day, and we set up a short call to understand the business and where it is stuck. After the call you get a written recommendation you keep, whether or not we work together.",
  },
  {
    q: "Why is there no price on the website package?",
    a: "Builds differ too much for one number to be honest. After the mapping call you get a written scope and a fixed quote, so you know the full cost before anything starts. Ongoing work has a published floor of ₹20,000 a month.",
  },
  {
    q: "Can we start with a single package?",
    a: "Yes. Each package stands on its own, and they reinforce each other when combined. There is no bundle requirement.",
  },
  {
    q: "What do you need from us?",
    a: "Very little. One call at the start, sign-off on anything before it goes out, and for video, recording what we script. Everything else is ours.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/** Prefilled WhatsApp message per package: the fewest steps to a real
 *  conversation for a phone-led market. */
const packageMessage = (title: string) =>
  `Hi, I would like to discuss the ${title} package for my business.`;

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Intro */}
      <section className="relative isolate overflow-hidden px-gutter pb-20 pt-24">
        {/* Environment: a blue wash (technology, the system). Each package
            below carries its own discipline colour. Grid draws above it. */}
        <Atmosphere accent="#2563EB" edge="top" strength={0.12} />
        <IntroField />
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <span className="label-mono text-muted-2">Services</span>
          <TextReveal
            as="h1"
            className="max-w-3xl font-heading text-display font-medium tracking-tight text-clarity"
          >
            You run the business. We run the system around it.
          </TextReveal>
          <p className="max-w-2xl text-lead text-muted-2">
            {SERVICES_POSITIONING}
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-2">
            Built for clinics, diagnostic labs, hospitals and local operators
            who need this handled properly without hiring a marketing team.
          </p>
          <p className="max-w-2xl border-l-2 border-hairline-strong pl-4 text-sm leading-relaxed text-muted-2">
            <span className="text-clarity">What it costs.</span>{" "}
            {ENGAGEMENT_FLOOR}
          </p>
          {/* The bridge: the homepage promises "any business that values
              quality"; this line keeps that promise without diluting the
              healthcare framing of the current packages. */}
          <p className="max-w-2xl text-sm leading-relaxed text-faint">
            Most of our recent work is in healthcare, so the examples lean
            that way. The system behind it suits any business people have to
            trust before they buy.{" "}
            <Link
              href="/contact"
              className="text-muted-2 underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-clarity"
            >
              Tell us what you are building
            </Link>
            {" "}and we will scope it individually.
          </p>
          <PackageNav
            items={services.map((s) => ({
              slug: s.slug,
              title: s.title,
              accent: s.accent,
            }))}
          />
        </div>
      </section>

      {/* Packages */}
      <section className="px-gutter pb-24">
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          {services.map((s) => (
            <Reveal key={s.slug}>
              <SpotlightCard
                as="article"
                id={s.slug}
                className="scroll-mt-24 p-8 md:p-10"
              >
                {/* Discipline accent: ties each package to the system. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ backgroundColor: s.accent, opacity: 0.7 }}
                />
                <CornerTicks />
                <div className="flex flex-col gap-8">
                  <div data-reveal className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <span className="label-mono flex items-center gap-2 text-muted-2">
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: s.accent }}
                        />
                        {s.n} · Package
                      </span>
                    </div>
                    <h2 className="font-heading text-headline font-medium tracking-tight text-clarity">
                      {s.title}
                    </h2>
                    <p className="max-w-2xl text-lead text-muted-2">
                      {s.positioning}
                    </p>
                    <p className="max-w-2xl border-l-2 border-hairline-strong pl-4 text-sm leading-relaxed text-muted-2">
                      <span className="text-clarity">The problem it solves.</span>{" "}
                      {s.problem}
                    </p>
                  </div>

                  <div data-reveal className="h-px w-full bg-hairline" />

                  <ul data-reveal className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <li key={d.title} className="flex flex-col gap-2">
                        <h3 className="label-mono flex items-center gap-2.5 text-clarity">
                          {/* Registration tick in the package's discipline colour. */}
                          <span
                            aria-hidden
                            className="h-3.5 w-px shrink-0"
                            style={{ backgroundColor: s.accent }}
                          />
                          {d.title}
                        </h3>
                        <p className="pl-[calc(0.625rem+1px)] text-sm leading-relaxed text-muted-2">
                          {d.body}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div
                    data-reveal
                    className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-hairline pt-8"
                  >
                    <Button
                      asChild
                      className="group gap-2 rounded-sm bg-clarity px-6 text-depth transition-colors hover:bg-clarity/90"
                    >
                      <a
                        href={waLink(packageMessage(s.title))}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4" />
                        Discuss this on WhatsApp
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    </Button>
                    <Link
                      href="/contact"
                      className="text-sm text-muted-2 underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-clarity"
                    >
                      or use the contact form
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Questions before you write */}
      <section className="px-gutter pb-24">
        <Reveal className="mx-auto w-full max-w-4xl">
          <div data-reveal className="flex flex-col gap-8 border-t border-hairline pt-12">
            <h2 className="label-mono text-muted-2">Common questions</h2>
            <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
              {FAQ.map((item) => (
                <div key={item.q} className="flex flex-col gap-2">
                  <dt className="text-sm font-medium text-clarity">{item.q}</dt>
                  <dd className="text-sm leading-relaxed text-muted-2">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* The invitation, restated where the decision happens */}
      <section className="border-t border-hairline bg-raised px-gutter py-20">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-start gap-6">
          <h2
            data-reveal
            className="max-w-2xl font-heading text-headline font-medium tracking-tight text-clarity"
          >
            Not sure which one you need?
          </h2>
          <p data-reveal className="max-w-xl text-lead text-muted-2">
            Tell us what is not working and what you have already tried. We
            reply within one business day with a straight recommendation.
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
      </section>
    </main>
  );
}
