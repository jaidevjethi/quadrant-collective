import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CornerTicks } from "@/components/ui/corner-ticks";
import { IntroField } from "@/components/ui/intro-field";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { services, SERVICES_POSITIONING } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media management, Google Business Profile optimization, and website & SEO foundations for clinics and local practices. We handle the strategy and the technology; you provide the expertise.",
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

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* Intro */}
      <section className="relative overflow-hidden px-gutter pb-20 pt-24">
        <IntroField />
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <span className="label-mono text-muted-2">Services</span>
          <h1 className="max-w-3xl font-heading text-display font-medium tracking-tight text-clarity">
            You run the practice. We run the system around it.
          </h1>
          <p className="max-w-2xl text-lead text-muted-2">
            {SERVICES_POSITIONING} Built for clinics and local practices that
            want a professional presence without hiring a marketing department.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-hairline bg-depth/50 backdrop-blur-sm px-4 py-2 text-sm text-muted-2 transition-colors hover:border-hairline-strong hover:text-clarity"
              >
                {s.title}
              </a>
            ))}
          </div>
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
                data-reveal
                className="scroll-mt-24 p-8 md:p-10"
              >
                <CornerTicks />
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <span className="label-mono text-muted-2">
                        {s.n} · Package
                      </span>
                      {s.pricing && (
                        <span className="label-mono text-faint border border-hairline px-3 py-1 rounded-sm bg-depth/50 backdrop-blur-sm">
                          {s.pricing}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading text-heading-md font-medium text-clarity">
                      {s.title}
                    </h2>
                    <p className="max-w-2xl text-lead text-muted-2">
                      {s.positioning}
                    </p>
                  </div>

                  <div className="h-px w-full bg-hairline" />

                  <ul className="grid gap-8 sm:grid-cols-2">
                    {s.deliverables.map((d, i) => (
                      <li key={i} className="flex flex-col gap-2">
                        <h3 className="label-mono text-clarity">{d.title}</h3>
                        <p className="text-sm text-muted-2 leading-relaxed">
                          {d.body}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-8 border-t border-hairline flex flex-wrap gap-4 items-center">
                    <Button
                      asChild
                      className="group gap-2 rounded-sm bg-clarity px-6 text-depth transition-colors hover:bg-clarity/90"
                    >
                      <Link href="/contact">
                        Discuss this package
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
