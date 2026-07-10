/**
 * Service packages. The single source for /services. Content comes from the
 * founder's real offering (2026-07-06 brief), written to the voice rules:
 * calm, declarative, no hype vocabulary, no dashes. The positioning line is
 * his: we handle the strategy and tech, the client provides the expertise.
 * Voice pass 2026-07-10 (founder-approved direction): heavy labels softened
 * to plain language; offers, deliverables and prices unchanged.
 * Kept as data so the architecture never couples to the current list.
 */

export type Service = {
  slug: string;
  n: string;
  title: string;
  positioning: string;
  pricing?: string;
  /** Discipline accent for the package's top hairline (BRAND.md tokens). */
  accent: string;
  deliverables: { title: string; body: string }[];
};

export const SERVICES_POSITIONING =
  "We architect the system. We operate the mechanics. You provide the clinical expertise.";

export const services: Service[] = [
  {
    slug: "platform-architecture",
    n: "01",
    title: "Website & SEO foundation",
    positioning:
      "A fast, engineered website that turns searches into booked appointments, and keeps earning after launch.",
    pricing: "Custom engagement",
    accent: "#2563EB",
    deliverables: [
      {
        title: "Engineering",
        body: "Designed and built by hand on modern engineering. No bloated templates.",
      },
      {
        title: "Speed & accessibility",
        body: "Fast on real phones and fully accessible, as a baseline rather than a target.",
      },
      {
        title: "Technical SEO",
        body: "Schema markup, semantic HTML and clean structure, so search engines read the site properly.",
      },
      {
        title: "Security & maintenance",
        body: "Monitoring, SSL and updates handled for you on reliable infrastructure.",
      },
    ],
  },
  {
    slug: "local-search-dominance",
    n: "02",
    title: "Google Business Profile & local search",
    positioning:
      "We build and run your Google presence so patients searching nearby find you first, and keep finding you.",
    pricing: "From ₹20,000/mo",
    accent: "#00D1B2",
    deliverables: [
      {
        title: "Profile built properly",
        body: "The full profile set up right: services, descriptions, categories and structured data.",
      },
      {
        title: "Reviews, handled",
        body: "Every review answered well, and a simple system that helps happy patients leave theirs.",
      },
      {
        title: "Kept alive weekly",
        body: "Weekly posts, updates and clinic news so the profile stays active and trusted.",
      },
    ],
  },
  {
    slug: "brand-operations",
    n: "03",
    title: "Content & social operations",
    positioning:
      "We run your content and social presence to one consistent standard, so you can run the practice.",
    pricing: "From ₹35,000/mo",
    accent: "#D97706",
    deliverables: [
      {
        title: "Planned, not improvised",
        body: "A content plan mapped to your practice's calendar and seasons, scripted for you.",
      },
      {
        title: "One visual system",
        body: "15 or more posts a month, all built on one visual system that looks unmistakably yours.",
      },
      {
        title: "Video production",
        body: "4 to 6 short-form videos a month. We script and edit; you simply record.",
      },
      {
        title: "Publishing, managed",
        body: "Posting, scheduling and replies managed across Instagram, Facebook and LinkedIn.",
      },
    ],
  },
];
