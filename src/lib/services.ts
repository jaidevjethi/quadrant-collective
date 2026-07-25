/**
 * Service packages. The single source for /services. Content comes from the
 * founder's real offering (2026-07-06 brief), written to the voice rules:
 * calm, declarative, no hype vocabulary, no dashes. The positioning line is
 * his. Reframed 2026-07-25 from clinics-only to high-trust businesses;
 * healthcare stays the worked example because that is where the proof is.
 * Voice pass 2026-07-10 (founder-approved direction): heavy labels softened
 * to plain language. Per-package prices replaced by one studio floor.
 * Kept as data so the architecture never couples to the current list.
 */

export type Service = {
  slug: string;
  n: string;
  title: string;
  positioning: string;
  /** The problem this package answers, in the visitor's own words. Leads the
   *  card so services are met as answers to a felt problem (problem-first). */
  problem: string;
  pricing?: string;
  /** Discipline accent for the package's top hairline (BRAND.md tokens). */
  accent: string;
  deliverables: { title: string; body: string }[];
};

export const SERVICES_POSITIONING =
  "We build and run the system around your business, so you can keep doing the work you are actually good at.";

/** One floor for the whole studio, rather than a price per package (founder
 *  decision 2026-07-25). A buyer deciding whether to call needs to know the
 *  order of magnitude before they spend the call. */
export const ENGAGEMENT_FLOOR =
  "Ongoing work starts at ₹20,000 a month. Website builds are quoted after the mapping call, once we both know what is being built.";

export const services: Service[] = [
  {
    slug: "platform-architecture",
    n: "01",
    title: "Website & SEO foundation",
    positioning:
      "A fast, engineered website that turns searches into bookings, and keeps earning long after launch.",
    problem:
      "You are hard to find, and the few visitors who do arrive rarely turn into bookings.",
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
    slug: "local-search",
    n: "02",
    title: "Google Business Profile & local search",
    positioning:
      "We build and run your Google presence so the people searching nearby find you first, and keep finding you.",
    problem:
      "People searching nearby find your competitors first, or they find a listing so out of date it reads as neglect.",
    accent: "#00D1B2",
    deliverables: [
      {
        title: "Profile built properly",
        body: "The full profile set up right: services, descriptions, categories and structured data.",
      },
      {
        title: "Reviews, handled",
        body: "Every review answered well, and a quiet system that helps satisfied customers leave theirs.",
      },
      {
        title: "Kept alive weekly",
        body: "Weekly posts and updates so the profile looks tended rather than abandoned.",
      },
    ],
  },
  {
    slug: "brand-operations",
    n: "03",
    title: "Content & social operations",
    positioning:
      "We run your content and social presence to one consistent standard, so you can run the business.",
    problem:
      "Your posts, page and profile each tell a slightly different story, so the effort never adds up to trust.",
    accent: "#D97706",
    deliverables: [
      {
        title: "Planned in advance",
        body: "A content plan mapped to your calendar and your busy seasons, scripted for you.",
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
