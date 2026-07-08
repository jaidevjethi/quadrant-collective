import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CornerTicks } from "@/components/ui/corner-ticks";
import { IntroField } from "@/components/ui/intro-field";
import { Reveal } from "@/components/motion/reveal";
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
              <article
                id={s.slug}
                data-reveal
                className="group relative scroll-mt-24 rounded-lg border border-hairline bg-raised/40 backdrop-blur-md p-8 md:p-10 transition-colors hover:border-hairline-strong"
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
                    <h2 className="font-heading text-headline font-medium tracking-tight text-clarity">
                      {s.title}
                    </h2>
                    <p className="max-w-2xl text-lead text-muted-2">
                      {s.positioning}
                    </p>
                  </div>
                  <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <div key={d.title} className="flex flex-col gap-2 bg-depth/60 p-6 backdrop-blur-sm">
                        <h3 className="flex items-center gap-3 text-sm font-medium text-clarity">
                          <span aria-hidden className="size-1.5 rounded-full bg-growth" />
                          {d.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-2">{d.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it fits the system */}
      <section className="border-t border-hairline bg-raised/20 backdrop-blur-lg px-gutter py-20">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="label-mono text-muted-2">One system</span>
            <h2 className="font-heading text-headline font-medium tracking-tight text-clarity">
              Each package works alone. Together they compound.
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-lead text-muted-2">
            <p>
              The website earns trust, the Google profile captures nearby
              searches, and the social presence keeps you visible between
              visits. Start with the one that hurts most; add the rest when
              you are ready.
            </p>
            <Button
              asChild
              size="lg"
              className="h-11 gap-2 self-start rounded-sm bg-clarity px-6 text-depth hover:bg-clarity/90"
            >
              <Link href="/contact">
                Discuss your practice
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
