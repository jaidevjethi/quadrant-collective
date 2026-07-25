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
 * say what to notice.
 *
 * Results policy (founder decision 2026-07-09): the outcomes below are real,
 * but stated carefully and kept to case-study pages only. The homepage never
 * carries hard numbers; wording here favors verifiable phrasing over volume.
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
  /** The discipline persona for this case: an accent colour (a Quadrant
   *  discipline token) chosen to fit the project, plus a one-word feel. Themes
   *  the card and detail page so each case feels like its own world, without
   *  leaving Quadrant's palette. */
  persona: { accent: string; feel: string };
  /** City, for local-SEO relevance and the corridor story. */
  location?: string;
  services: string[];
  /** What was actually delivered. Accurate scope and design intent. */
  approach?: string[];
  /** The thinking behind the work: where the client started, what we noticed
   *  that reframed the problem, and the key decisions and why. Real reasoning,
   *  grounded in the project (design system: case studies show judgement). */
  reasoning?: {
    situation: string;
    insight: string;
    decisions: { title: string; body: string }[];
  };
  /** Card thumbnail in public/work. */
  image: string;
  /** Curated, captioned gallery for the case-study detail page. */
  gallery: GalleryItem[];
  /** Tangible business outcomes achieved (e.g. ranking, revenue, leads) */
  results?: string[];
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
    persona: { accent: "#2563EB", feel: "clinical" },
    client: "Pramukh Multispeciality Dental Clinic",
    title: "A bilingual dental site built for a local-first patient base",
    summary:
      "A fast, bilingual website for a multispeciality dental clinic in Mehsana. Premium positioning and trust-forward design make booking the obvious next step.",
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
    reasoning: {
      situation:
        "The clinic was strong on care and invisible online. There was no real website, and patients in Mehsana were choosing a dentist by whoever surfaced first on a phone. The clinic assumed it needed a website. The real gap was being findable and trusted in the moment someone decides.",
      insight:
        "Two things decided this market, and neither was a homepage. Most searches here happen in Gujarati, on a phone, in the seconds before a booking. And a dental decision is a trust decision. So we built for the language people search in, and put the trust signals where the doubt lives.",
      decisions: [
        { title: "Bilingual, with a real toggle", body: "One tap flips the whole site to Gujarati, because that is how Mehsana searches. The Gujarati version is a first-class site in its own right." },
        { title: "Trust before treatments", body: "The Google rating, hospital-grade safety and doctor credentials sit up front, because the patient wants to know they can trust the clinic long before they wonder what a root canal involves." },
        { title: "Findable by construction", body: "Clean structure, schema and a treatments library mapped to how people actually search, so the clinic ranks for the procedures that pay rather than vanity terms." },
        { title: "Built to keep earning", body: "Local SEO foundations and a push-to-publish pipeline, so the site compounds after launch instead of going stale." },
      ],
    },
    image: "/work/pramukh-site-hero.webp",
    gallery: [
      { src: "/work/pramukh-site-hero.webp", caption: "The homepage above the fold: the specialist, one clear promise, and the trust card. Pain-free dentistry, right here in Mehsana." },
      { src: "/work/pramukh-site-treatments.webp", caption: "Every treatment is its own card, led by the patient's real question: if you are awake at 2 AM with a throbbing tooth, this is the treatment that ends it." },
      { src: "/work/pramukh-site-smiles.webp", caption: "Real transformations, real patients, no filters. The before-and-after that reassures a nervous first booking." },
      { src: "/work/pramukh-site-mobile.webp", caption: "The same site on a phone, where most of Mehsana searches. Book Visit and the clinic number stay one tap away.", contain: true },
    ],
    results: [
      "Google Search impressions grew 12x in the first 90 days after launch",
      "Ranked first on Google Maps for core treatments in Mehsana",
      "Organic search and Maps now contribute over ₹12L in monthly clinic revenue",
    ],
    href: "https://www.pramukhdentalclinic.com",
    year: "2026",
  },
  {
    slug: "divyam-tours",
    persona: { accent: "#D97706", feel: "editorial" },
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
    reasoning: {
      situation:
        "The operator was losing margin to aggregators. Travellers found them through third-party platforms that took a cut and owned the relationship. They thought they needed a booking website. The real problem was having no direct channel a traveller would trust enough to skip the aggregator.",
      insight:
        "Pilgrimage travel is emotional and local. Travellers were not comparing feature lists. They were deciding who felt like a local they could trust with a dawn arrival on the ghats. A generic travel template signals the opposite, so we made the site feel made by hand, by someone who knows the place.",
      decisions: [
        { title: "Editorial, not template", body: "A serif display over atmospheric dawn-ghat photography, so the site reads as a place with a point of view. The art direction does the trust work a booking form cannot." },
        { title: "A voice that sounds local", body: "Copy written like someone who grew up on the ghats, because that is exactly the reassurance an inbound traveller is looking for." },
        { title: "Built around the real decision", body: "Route and airport-transfer pages matched to what people search, with call and WhatsApp one tap away, because these bookings happen fast and on the move." },
        { title: "Direct over aggregated", body: "Every path leads to a direct conversation, so the margin and the relationship stay with the operator instead of the platform." },
      ],
    },
    image: "/work/divyam-site-hero.webp",
    gallery: [
      { src: "/work/divyam-site-hero.webp", caption: "The homepage: a serif headline over the Ganga aarti, with quiet trust chips instead of a hard sell. Made by hand, not from a template." },
      { src: "/work/divyam-site-routes.webp", caption: "A card for every route a pilgrim searches: Sarnath, Prayagraj, Ayodhya, Bodh Gaya, each with the distance and the time. Real intent, met with a page." },
      { src: "/work/divyam-site-services.webp", caption: "Airport transfer, local sightseeing, outstation, numbered by demand. The structure a traveller scans in seconds." },
      { src: "/work/divyam-site-mobile.webp", caption: "On a phone, where inbound travellers actually decide. Call and WhatsApp stay within thumb reach.", contain: true },
    ],
    results: [
      "Direct WhatsApp booking inquiries grew 4x after launch",
      "Bookings shifted from third-party aggregators to direct channels",
      "Ranks among the top results for Varanasi airport taxi searches",
    ],
    year: "2026",
  },
  {
    slug: "akshar-wellness",
    persona: { accent: "#00D1B2", feel: "calm" },
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
    reasoning: {
      situation:
        "A doctor-led preventive-wellness clinic with real expertise and no brand to carry it. Preventive care is a hard sell, because people buy it before they feel unwell. They thought they needed social media posts. The real gap was a brand, and a system to run it.",
      insight:
        "Preventive wellness lives on two things: trust in the doctor, and clarity of the offer. Random posts build neither. What the clinic needed was a coherent brand, and an information system that made a dense package matrix feel simple to choose from.",
      decisions: [
        { title: "Positioning first, posts second", body: "We set the brand concept for preventive, doctor-led wellness before designing a single post, so everything after it reinforced one impression." },
        { title: "The feed as one system", body: "The whole Instagram feed is designed as a single system, not a pile of one-offs, so each post compounds the last instead of resetting the brand." },
        { title: "Made the complex choosable", body: "Information design turned dense diagnostic packages into something a patient can compare and choose, which is where preventive care usually loses people." },
        { title: "A framework they can run", body: "A repeatable content and visual framework, so the clinic keeps producing on-brand work without us in the room." },
      ],
    },
    image: "/work/akshar-feed.webp",
    gallery: [
      { src: "/work/akshar-feed.webp", caption: "The whole Instagram feed is designed as one system. Every post reinforces the last.", contain: true },
      { src: "/work/akshar-wellness.webp", caption: "Information design. Dense diagnostic packages made simple to compare and choose." },
      { src: "/work/akshar-post.webp", caption: "Individual posts on a repeatable template. Fast to produce and unmistakably on-brand.", contain: true },
    ],
    year: "2026",
  },
  {
    slug: "galaxy-heart-institute",
    persona: { accent: "#7C3AED", feel: "steady" },
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
    reasoning: {
      situation:
        "A cardiology hospital with deep expertise and an occasional, inconsistent social presence. Content went out when someone remembered, in whatever style that day allowed. They thought they needed more posts. The real gap was a dependable engine that made the hospital look as trustworthy online as it is in person.",
      insight:
        "For a hospital, consistency is credibility. A patient choosing where to trust their heart reads an erratic feed as an erratic institution. The fix was not more volume. It was a reliable rhythm, and a look that holds month after month.",
      decisions: [
        { title: "Tied to a reason", body: "Monthly content mapped to the health calendar, so every post has a reason to exist instead of filling a slot." },
        { title: "Trust in people, not buildings", body: "Doctor spotlights, because patients trust the cardiologist before the hospital, and the people are the real proof." },
        { title: "Clinical topics made readable", body: "Educational carousels that turn dense clinical subjects into something a patient will actually read and remember." },
        { title: "The same, dependably", body: "One consistent clinical look, held month after month, so the brand reads as steady. For a hospital, that is the whole point." },
      ],
    },
    image: "/work/galaxy-heart-institute.webp",
    gallery: [
      { src: "/work/galaxy-heart-institute.webp", caption: "Campaigns tied to the health calendar. Content is never just filler.", contain: true },
      { src: "/work/galaxy-doctor.webp", caption: "Doctor spotlights build trust in the people behind the practice." },
      { src: "/work/galaxy-women.webp", caption: "Educational carousels make clinical topics genuinely readable." },
      { src: "/work/galaxy-bp.webp", caption: "One consistent clinical look month after month. The brand feels dependable.", contain: true },
    ],
    year: "2026",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
