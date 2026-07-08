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
  deliverables: { title: string; body: string }[];
};

export const SERVICES_POSITIONING =
  "We handle the strategy and the technology. You provide the expertise.";

export const services: Service[] = [
  {
    slug: "social-media-management",
    n: "01",
    title: "Social media management",
    positioning:
      "A consistent, professional presence your patients and clients actually see, without you spending your evenings on it.",
    deliverables: [
      {
        title: "Strategy",
        body: "Topic curation and scripting, planned around your practice and your seasons.",
      },
      {
        title: "15+ posts a month",
        body: "Professionally designed posts on a consistent visual system.",
      },
      {
        title: "4 to 6 reels a month",
        body: "We script, you record, we edit. Your voice, our production.",
      },
      {
        title: "Full management",
        body: "Instagram, Facebook and Twitter handled end to end.",
      },
    ],
  },
  {
    slug: "google-business-profile",
    n: "02",
    title: "Google Business Profile",
    positioning:
      "When someone nearby searches for what you do, your profile decides whether they call you or the next result.",
    deliverables: [
      {
        title: "Optimization",
        body: "Complete profile setup for ranking: service menu and a detailed, keyworded description of your practice.",
      },
      {
        title: "Reviews",
        body: "Professional response management, plus a strategy for ethically encouraging patient reviews.",
      },
      {
        title: "Weekly updates",
        body: "Posts that keep the profile active: health tips, clinic updates, seasonal awareness.",
      },
    ],
  },
  {
    slug: "website-seo",
    n: "03",
    title: "Website & SEO foundations",
    positioning: "A professional digital home that Google trusts.",
    deliverables: [
      {
        title: "Design",
        body: "A modern, clean aesthetic relevant to your brand and appropriate for healthcare.",
      },
      {
        title: "Speed",
        body: "Fast mobile loading for patients on real phones and real networks.",
      },
      {
        title: "Technical SEO",
        body: "Proper indexing by Google: meta tags, schema markup and a sitemap, done correctly.",
      },
      {
        title: "Security",
        body: "SSL and data protection as a baseline, not an upsell.",
      },
    ],
  },
];
