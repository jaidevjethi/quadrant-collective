import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { caseStudies, getCaseStudy, KIND_LABEL, type CaseStudy } from "@/lib/work";
import { Atmosphere } from "@/components/ui/atmosphere";
import { WorkImage } from "@/components/ui/work-image";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/site";

/**
 * Case-study detail. Statically generated from the work data. Leads with a
 * curated, captioned gallery that shows different aspects of the work, then
 * the strategy and design intent behind it. Each project is framed for what
 * it actually is (website / brand / content), never overstated.
 */

/** BreadcrumbList + CreativeWork schema: the richest content on the site
 *  shipped no structured data at all. Built entirely from the study record. */
function caseSchema(study: CaseStudy) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Work", item: `${SITE_URL}/work/` },
        { "@type": "ListItem", position: 2, name: study.client, item: `${SITE_URL}/work/${study.slug}/` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: study.title,
      description: study.summary,
      url: `${SITE_URL}/work/${study.slug}/`,
      image: `${SITE_URL}${study.image}`,
      dateCreated: study.year,
      about: study.industry,
      creator: {
        "@type": "Organization",
        name: "Quadrant Collective",
        url: SITE_URL,
      },
    },
  ];
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const nextStudy =
    caseStudies.length > 1
      ? caseStudies[(index + 1) % caseStudies.length]
      : null;

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden px-gutter py-section">
      {/* Environment: this case's persona colour washes the arrival screen,
          so each case feels like the world it was built for. */}
      <Atmosphere
        accent={study.persona.accent}
        edge="top"
        strength={0.16}
        span="viewport"
      />
      {caseSchema(study).map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <article className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        {/* Breadcrumb: orientation + the BreadcrumbList schema made visible */}
        <nav aria-label="Breadcrumb" className="label-mono flex items-center gap-2 text-faint">
          <Link
            href="/work"
            className="text-muted-2 transition-colors duration-200 hover:text-clarity"
          >
            Work
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page" className="text-clarity">
            {study.client}
          </span>
        </nav>

        <Reveal>
          <header className="flex flex-col gap-6">
            {/* Persona tick: this case's discipline colour, set at the top. */}
            <span
              aria-hidden
              data-reveal
              className="h-1 w-10 rounded-full"
              style={{ backgroundColor: study.persona.accent }}
            />
            <div data-reveal className="flex flex-col gap-1">
              <span className="label-mono text-muted-2">
                {study.client} · {study.year}
              </span>
              <span className="label-mono text-faint">
                {KIND_LABEL[study.kind]} · {study.industry}
                {study.location ? ` · ${study.location}` : ""}
              </span>
            </div>
            {/* headline, not display: case titles run long and four display
                lines slow scanning (2026-07-11 audit). */}
            <h1
              data-reveal
              className="max-w-3xl font-heading text-headline font-medium tracking-tight text-clarity"
            >
              {study.title}
            </h1>
            <p data-reveal className="max-w-2xl text-lead text-muted-2">
              {study.summary}
            </p>
          </header>
        </Reveal>

        {/* The thinking leads, before the visuals: where the client started
            and what we noticed that reframed the work (case studies as
            judgement). Outcomes land later, as the consequence. */}
        {study.reasoning && (
          <Reveal className="flex max-w-3xl flex-col gap-8 border-t border-hairline pt-12">
            <div data-reveal className="flex flex-col gap-3">
              <span className="label-mono text-muted-2">The situation</span>
              <p className="text-lead text-muted-2">
                {study.reasoning.situation}
              </p>
            </div>
            <div data-reveal className="flex flex-col gap-3">
              <span className="label-mono text-muted-2">What we saw</span>
              <p className="text-lead text-clarity">{study.reasoning.insight}</p>
            </div>
          </Reveal>
        )}

        {/* Captioned gallery, editorial rhythm: the first plate runs full
            width; the rest alternate a wide plate with a caption set beside a
            narrower one, so the sequence reads as a spread, not a stack. */}
        <div className="flex flex-col gap-12">
          {study.gallery.map((g, i) => {
            const aside = i > 0 && i % 2 === 0;
            return (
              <Reveal key={g.src}>
                <figure
                  data-reveal
                  className={
                    aside
                      ? "grid items-center gap-6 md:grid-cols-[1fr_minmax(0,16rem)]"
                      : "flex flex-col gap-3"
                  }
                >
                  <WorkImage
                    src={g.src}
                    alt={g.caption}
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority={i === 0}
                    contain={g.contain}
                    className="aspect-[16/10] rounded-lg border border-hairline"
                  />
                  <figcaption
                    className={`text-sm text-muted-2 ${aside ? "md:text-base md:leading-relaxed" : "max-w-2xl"}`}
                  >
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="grid gap-12 border-t border-hairline pt-12 md:grid-cols-[200px_1fr]">
          <div data-reveal className="flex flex-col gap-4">
            <span className="label-mono text-muted-2">Disciplines</span>
            <ul className="flex flex-wrap gap-2">
              {study.services.map((s) => (
                <li
                  key={s}
                  className="label-mono rounded-sm border border-hairline px-2.5 py-1 text-faint"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {study.reasoning ? (
            <div data-reveal className="flex flex-col gap-6">
              <span className="label-mono text-muted-2">The decisions</span>
              <ul className="flex flex-col gap-6">
                {study.reasoning.decisions.map((d) => (
                  <li key={d.title} className="flex flex-col gap-2">
                    <span
                      aria-hidden
                      className="h-0.5 w-6"
                      style={{ backgroundColor: study.persona.accent }}
                    />
                    <p className="text-title font-medium text-clarity">
                      {d.title}
                    </p>
                    <p className="text-base leading-relaxed text-muted-2">
                      {d.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            study.approach &&
            study.approach.length > 0 && (
              <div data-reveal className="flex flex-col gap-5">
                <span className="label-mono text-muted-2">What we did</span>
                <ul className="flex flex-col gap-4">
                  {study.approach.map((a) => (
                    <li key={a} className="flex gap-4 text-lead text-muted-2">
                      <span
                        aria-hidden
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-growth"
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </Reveal>

        {study.results && study.results.length > 0 && (
          <Reveal className="grid gap-12 border-t border-hairline pt-12 md:grid-cols-[200px_1fr]">
            <div data-reveal className="flex flex-col gap-4">
              <span className="label-mono text-muted-2">Outcomes</span>
            </div>
            <div data-reveal className="flex flex-col gap-5">
              <ul className="flex flex-col gap-4">
                {study.results.map((r) => (
                  <li key={r} className="flex gap-4 text-lead font-medium text-clarity">
                    <ArrowUpRight
                      aria-hidden
                      className="mt-1 size-5 shrink-0"
                      style={{ color: study.persona.accent }}
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              {/* Numbers carry their source on the page. A claim a visitor
                  cannot place is worth less than no claim. */}
              <p className="text-sm text-faint">
                Figures reported by {study.client} from their own Google
                Search Console, Google Business Profile and booking records,
                covering the {study.year} launch period.
              </p>
            </div>
          </Reveal>
        )}

        {study.href && (
          <a
            href={study.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-sm border border-hairline-strong px-6 py-3 text-sm text-clarity transition-colors duration-200 hover:border-clarity hover:bg-raised"
          >
            Visit the live site
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}

        {/* The ask, where the proof just landed */}
        <Reveal className="flex flex-col items-start gap-5 rounded-lg border border-hairline bg-raised p-8 md:p-10">
          <h2
            data-reveal
            className="max-w-xl font-heading text-title font-medium tracking-tight text-clarity"
          >
            Something similar in mind?
          </h2>
          <p data-reveal className="max-w-xl text-sm leading-relaxed text-muted-2">
            Tell us about the business and what you need. We reply within one
            business day.
          </p>
          <div data-reveal className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button
              asChild
              className="group gap-2 rounded-sm bg-clarity px-6 text-depth transition-colors hover:bg-clarity/90"
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

        {nextStudy && (
          <nav
            aria-label="Next case study"
            className="border-t border-hairline pt-12"
          >
            <Link
              href={`/work/${nextStudy.slug}`}
              className="group flex flex-col gap-3"
            >
              <span className="label-mono text-faint">Next case</span>
              <span className="flex flex-wrap items-center gap-3 font-heading text-headline font-medium tracking-tight text-muted-2 transition-colors duration-200 group-hover:text-clarity">
                {nextStudy.client}
                <ArrowRight className="size-6 shrink-0 transition-transform duration-200 ease-[var(--ease-precision)] group-hover:translate-x-1" />
              </span>
              <span className="max-w-2xl text-lead text-muted-2">
                {nextStudy.title}
              </span>
            </Link>
          </nav>
        )}
      </article>
    </main>
  );
}
