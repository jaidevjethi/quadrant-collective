/**
 * Case-study data. The single source for /work.
 *
 * These are REAL projects (sibling folders under D:\Projects\Antigravity),
 * studied first-hand. Every description is drawn from the actual work and
 * limited to scope, strategy, and design intent, with no invented metrics,
 * testimonials, or results (STRATEGY.md; constitution). Each project is shown
 * for what it actually is via `kind` (a website, a brand system, or a social
 * engine), never forced into a uniform "website" frame. Gallery images are
 * captured from the live or built sites and from real deliverables; captions
 * say what to notice. Before launch, confirm with the founder: (1) each client
 * is happy to be named publicly, (2) add real results where they exist,
 * (3) only Pramukh's live URL is confirmed for linking.
 */

export type ProjectKind = "website" | "brand" | "content";

export type GalleryItem = {
  src: string;
  caption: string;
  /** object-contain on a dark frame (for mobile, square, or dense images). */
  contain?: boolean;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  kind: ProjectKind;
  industry: string;
  /** City, for local-SEO relevance and the corridor story. */
  location?: string;
  services: string[];
  /** What was actually delivered. Accurate scope and design intent. */
  approach?: string[];
  /** Card thumbnail in public/work. */
  image: string;
  /** Curated, captioned gallery for the case-study detail page. */
  gallery: GalleryItem[];
  /** Live site, only when published and cleared to link. */
  href?: string;
  year: string;
};

export const KIND_LABEL: Record<ProjectKind, string> = {
  website: "Website",
  brand: "Brand & content",
  content: "Social & content",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pramukh-dental",
    client: "Pramukh Multispeciality Dental Clinic",
    title: "A bilingual dental site built for a local-first patient base",
    summary:
      "A fast, bilingual (English and Gujarati) website for a multispeciality dental clinic in Mehsana. Premium positioning and trust-forward design that make booking the obvious next step.",
    kind: "website",
    industry: "Dental clinic",
    location: "Mehsana",
    services: ["Web design", "Web development", "SEO"],
    approach: [
      "Premium positioning: “Dentistry, elevated” over a calm, clinical design",
      "Bilingual English and Gujarati with a live toggle for the Mehsana market",
      "Trust-forward: Google rating, hospital-grade safety and doctor credentials up front",
      "A full treatments library plus patient information and a smile gallery",
      "Local SEO foundations and a push-to-publish deploy pipeline",
    ],
    image: "/work/pramukh-dental.webp",
    gallery: [
      { src: "/work/pramukh-dental.webp", caption: "Home. Premium positioning, real trust signals, and one clear next step: book a visit." },
      { src: "/work/pramukh-gujarati.webp", caption: "One tap flips the entire site to Gujarati, built for how Mehsana actually searches." },
      { src: "/work/pramukh-treatments.webp", caption: "A filterable treatments library, so patients reach the exact procedure fast." },
      { src: "/work/pramukh-mobile.webp", caption: "Mobile-first, with sticky Call and WhatsApp actions for a phone-led local market.", contain: true },
    ],
    href: "https://www.pramukhdentalclinic.com",
    year: "2026",
  },
  {
    slug: "divyam-tours",
    client: "Divyam Tours & Taxi Services",
    title: "A conversion-first tourism site for Varanasi's pilgrimage market",
    summary:
      "An editorial website for a Varanasi taxi and tour operator serving inbound pilgrimage travel. Cinematic photography and a human, locally fluent voice that reads nothing like a generic travel template.",
    kind: "website",
    industry: "Travel & tourism",
    location: "Varanasi",
    services: ["Strategy", "Web design", "Web development", "SEO"],
    approach: [
      "Editorial art direction: serif display over atmospheric dawn-ghat photography",
      "A human, locally fluent voice, not a generic travel template",
      "Structured around call-now and WhatsApp for fast booking",
      "Route and airport-transfer pages built for real search intent",
    ],
    image: "/work/divyam-tours.webp",
    gallery: [
      { src: "/work/divyam-tours.webp", caption: "Home. Cinematic art direction that feels made by hand, not spun from a template." },
      { src: "/work/divyam-editorial.webp", caption: "An editorial voice that speaks like a local who grew up on the ghats." },
      { src: "/work/divyam-tourspage.webp", caption: "Tours built around real intent, timed and priced for a quick decision." },
      { src: "/work/divyam-mobile.webp", caption: "A mobile layout tuned for travelers deciding on the move.", contain: true },
    ],
    year: "2026",
  },
  {
    slug: "akshar-wellness",
    client: "Akshar Wellness 360",
    title: "Brand and content system for a doctor-led wellness clinic",
    summary:
      "Brand and content system for a doctor-led preventive-healthcare clinic in Mehsana, including a clear diagnostic-package matrix that makes complex wellness plans easy to compare and choose.",
    kind: "brand",
    industry: "Preventive healthcare & wellness",
    location: "Mehsana",
    services: ["Strategy", "Branding", "Content & social"],
    approach: [
      "Brand concept and positioning for preventive, doctor-led wellness",
      "A full Instagram feed designed as one system, not a pile of one-off posts",
      "Information design: complex diagnostic packages made simple to compare",
      "A repeatable content and visual framework the clinic can keep running",
    ],
    image: "/work/akshar-feed.webp",
    gallery: [
      { src: "/work/akshar-feed.webp", caption: "The whole Instagram feed, designed as one system so every post reinforces the last.", contain: true },
      { src: "/work/akshar-wellness.webp", caption: "Information design: dense diagnostic packages made simple to compare and choose." },
      { src: "/work/akshar-post.webp", caption: "Individual posts on a repeatable template, fast to produce and unmistakably on-brand.", contain: true },
    ],
    year: "2026",
  },
  {
    slug: "galaxy-heart-institute",
    client: "Galaxy Heart Institute & Multispeciality Hospital",
    title: "A social and content engine for a cardiology hospital",
    summary:
      "An ongoing content and social engine for a cardiology hospital: monthly campaigns and branded medical visuals produced to a consistent, trustworthy standard.",
    kind: "content",
    industry: "Cardiology & multispeciality hospital",
    services: ["Strategy", "Content & social", "Branding"],
    approach: [
      "Monthly content tied to the health calendar, so posts always have a reason to exist",
      "Doctor spotlights that build trust in the people, not just the building",
      "Educational carousels that turn clinical topics into something patients read",
      "A consistent clinical look, month after month, so the brand feels dependable",
    ],
    image: "/work/galaxy-heart-institute.webp",
    gallery: [
      { src: "/work/galaxy-heart-institute.webp", caption: "Campaigns tied to the health calendar, like Heart Month, so content is never filler.", contain: true },
      { src: "/work/galaxy-doctor.webp", caption: "Doctor spotlights that build trust in the people behind the practice.", contain: true },
      { src: "/work/galaxy-women.webp", caption: "Educational carousels that make clinical topics genuinely readable.", contain: true },
      { src: "/work/galaxy-bp.webp", caption: "One consistent clinical look, month after month, so the brand feels dependable.", contain: true },
    ],
    year: "2026",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
