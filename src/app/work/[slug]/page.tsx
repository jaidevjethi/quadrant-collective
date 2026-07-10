import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { caseStudies, getCaseStudy, KIND_LABEL, type CaseStudy } from "@/lib/work";
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
    <main className="flex flex-1 flex-col px-gutter py-section">
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
            <div data-reveal className="flex flex-col gap-1">
              <span className="label-mono text-muted-2">
                {study.client} · {study.year}
              </span>
              <span className="label-mono text-faint">
                {KIND_LABEL[study.kind]} · {study.industry}
                {study.location ? ` · ${study.location}` : ""}
              </span>
            </div>
            <h1
              data-reveal
              className="max-w-3xl font-heading text-display font-medium tracking-tight text-clarity"
            >
              {study.title}
            </h1>
            <p data-reveal className="max-w-2xl text-lead text-muted-2">
              {study.summary}
            </p>
          </header>
        </Reveal>

        {/* Captioned gallery: different aspects of the work */}
        <div className="flex flex-col gap-10">
          {study.gallery.map((g, i) => (
            <Reveal key={g.src}>
              <figure data-reveal className="flex flex-col gap-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-hairline bg-depth">
                  <Image
                    src={g.src}
                    alt={g.caption}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className={
                      g.contain
                        ? "object-contain p-3"
                        : "object-cover object-top"
                    }
                    priority={i === 0}
                  />
                </div>
                <figcaption className="max-w-2xl text-sm text-muted-2">
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
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

          {study.approach && study.approach.length > 0 && (
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
                  <li key={r} className="flex gap-4 text-lead text-clarity font-medium">
                    <span
                      aria-hidden
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-vision"
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
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
            Have a project like this in mind?
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
