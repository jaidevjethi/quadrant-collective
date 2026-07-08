/**
 * Service packages. The single source for /services. Content comes from the
 * founder's real offering (2026-07-06 brief), rewritten to the voice rules:
 * calm, declarative, no hype vocabulary, no dashes. The positioning line is
 * his: we handle the strategy and tech, the client provides the expertise.
 * Kept as data so the architecture never couples to the current list.
 */

export type Service = {
  slug: string;
  n: string;
  title: string;
  positioning: string;
  pricing?: string;
  deliverables: { title: string; body: string }[];
};

export const SERVICES_POSITIONING =
  "We architect the system. We operate the mechanics. You provide the clinical expertise.";

export const services: Service[] = [
  {
    slug: "platform-architecture",
    n: "01",
    title: "Platform Architecture & SEO",
    positioning: "A high-performance digital asset that converts traffic into booked appointments. Built once, compounded forever.",
    pricing: "Custom engagement",
    deliverables: [
      {
        title: "Engineering",
        body: "A modern, clean aesthetic built on enterprise-grade architecture. No bloated templates.",
      },
      {
        title: "Speed & Accessibility",
        body: "Lightning-fast mobile loading and 100% accessibility compliance as a baseline.",
      },
      {
        title: "Technical SEO Foundations",
        body: "Proper indexing protocols: schema markup, semantic HTML, and structured data.",
      },
      {
        title: "Security & Maintenance",
        body: "Continuous monitoring, SSL, and data protection on a reliable infrastructure.",
      },
    ],
  },
  {
    slug: "local-search-dominance",
    n: "02",
    title: "Local Search Dominance",
    positioning:
      "We engineer your local search footprint to capture high-intent patients exactly when they need you. A continuous optimization cycle.",
    pricing: "From ₹20,000/mo",
    deliverables: [
      {
        title: "Algorithmic Positioning",
        body: "Complete profile architecture: service menus, semantic descriptions, and structured data.",
      },
      {
        title: "Reputation Operations",
        body: "Strategic response management and automated systems for ethically capturing patient reviews.",
      },
      {
        title: "Weekly Engagement",
        body: "Continuous updates, health signals, and clinic news to keep the profile authoritative.",
      },
    ],
  },
  {
    slug: "brand-operations",
    n: "03",
    title: "Continuous Brand Operations",
    positioning:
      "A compounding visual and narrative presence. We operate your content mechanics so you can operate your practice.",
    pricing: "From ₹35,000/mo",
    deliverables: [
      {
        title: "Strategic Curation",
        body: "Topic architecture and scripting, mapped entirely to your practice's seasonal demands.",
      },
      {
        title: "Visual System",
        body: "15+ engineered posts a month, adhering strictly to a premium visual language.",
      },
      {
        title: "Video Production",
        body: "4 to 6 short-form videos a month. We script and edit; you simply record.",
      },
      {
        title: "Platform Management",
        body: "End-to-end operational control across Instagram, Facebook, and LinkedIn.",
      },
    ],
  },
];
