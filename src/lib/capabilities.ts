/**
 * The capability system: the single source of truth for the homepage
 * knowledge-node moment (Beat 3), its schema, and, later, dedicated
 * /capabilities/[slug] pages. Eight nodes resolve into the four disciplines
 * of the brand mark. Content is short by design (budgets below) so each
 * story fits the expanded panel without scrolling; it obeys the copy hard
 * bans (no em/en dashes, no slop vocabulary or formulas).
 *
 * Content budgets (enforced in review, keep every panel inside the frame):
 *   definition   <= 140 chars, answer-shaped ("Positioning is ...")
 *   philosophy   <= 2 paragraphs x ~320 chars
 *   framework    3-4 steps, each detail <= 160 chars
 *   beforeAfter  notes <= 120 chars
 *   influences   why <= 90 chars, 2-3 outbound links
 *
 * `grid` coordinates are in the 720x560 design space shared with the SVG
 * scaffold (tx/ty = resolved position, sx/sy = scattered entrance start,
 * rot = entrance rotation). Moved here from capabilities-assembly so one
 * file drives chips, panels, entrance, and schema.
 */

export type DisciplineId = "strategy" | "design" | "technology" | "growth";

export type CapabilityNodeId =
  | "positioning"
  | "analytics"
  | "brand"
  | "web-design"
  | "development"
  | "automation"
  | "seo"
  | "content";

export type Discipline = {
  id: DisciplineId;
  label: string;
  /** Discipline accent (BRAND.md tokens). Single source; stage + schema read it. */
  color: string;
};

export type FrameworkStep = { name: string; detail: string };

export type BeforeAfter = {
  before: { label: string; note: string };
  after: { label: string; note: string };
  caption?: string;
};

export type Influence = {
  target: CapabilityNodeId;
  why: string;
};

export type GridPlacement = {
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  rot: number;
};

export type CapabilityNode = {
  id: CapabilityNodeId;
  label: string;
  discipline: DisciplineId;
  definition: string;
  philosophy: string[];
  framework: { name: string; steps: FrameworkStep[] };
  beforeAfter: BeforeAfter;
  influences: Influence[];
  grid: GridPlacement;
};

export const disciplines: Record<DisciplineId, Discipline> = {
  strategy: { id: "strategy", label: "STRATEGY", color: "#7C3AED" },
  design: { id: "design", label: "DESIGN", color: "#D97706" },
  technology: { id: "technology", label: "TECHNOLOGY", color: "#2563EB" },
  growth: { id: "growth", label: "GROWTH", color: "#00D1B2" },
};

export const capabilityNodes: CapabilityNode[] = [
  {
    id: "positioning",
    label: "Positioning",
    discipline: "strategy",
    definition:
      "Positioning is the decision about what you are, who you are for, and why you are the obvious choice. Every other decision inherits it.",
    philosophy: [
      "Most businesses describe what they do. Positioning decides what they mean. It is the difference between a clinic that lists services and the clinic a city assumes is the best.",
      "We treat it as the first engineering decision. Get it right and design, copy and pricing stop being guesses.",
    ],
    framework: {
      name: "The positioning pass",
      steps: [
        { name: "Locate", detail: "Map the market and find the honest gap. What can you own that rivals cannot copy by Friday." },
        { name: "Sharpen", detail: "Narrow it until it stings a little. A position built to include everyone moves no one." },
        { name: "Prove", detail: "Tie the claim to something visible: work, credentials, guarantees. A position without proof is noise." },
      ],
    },
    beforeAfter: {
      before: { label: "A clinic like every other clinic", note: "Competes on price and proximity." },
      after: { label: "The obvious choice for its market", note: "Competes on trust, and charges for it." },
      caption: "Same clinic. One decision changed.",
    },
    influences: [
      { target: "brand", why: "Decides what the brand must feel like before a color is chosen." },
      { target: "seo", why: "Defines which searches are worth winning and which to ignore." },
      { target: "content", why: "Every piece either reinforces the position or dilutes it." },
    ],
    grid: { tx: 185, ty: 150, sx: 300, sy: 430, rot: -13 },
  },
  {
    id: "analytics",
    label: "Analytics",
    discipline: "strategy",
    definition:
      "Analytics is the discipline of knowing what is actually working, so decisions run on evidence instead of opinion or habit.",
    philosophy: [
      "Most dashboards measure whatever was easiest to wire up. Traffic feels like progress. Revenue is progress. We instrument the few numbers that map to the business and ignore the vanity.",
      "Measurement is how a system learns. Without it, every launch is a guess you never get to check.",
    ],
    framework: {
      name: "Measure what moves money",
      steps: [
        { name: "Define", detail: "Agree the handful of outcomes that matter: bookings, qualified leads, revenue." },
        { name: "Instrument", detail: "Follow each outcome all the way through to closed business." },
        { name: "Review", detail: "Read the numbers on a rhythm and let them decide what to build next." },
      ],
    },
    beforeAfter: {
      before: { label: "A wall of charts nobody acts on", note: "Busy, reassuring, useless." },
      after: { label: "Three numbers that decide the week", note: "Clear, honest, acted on." },
    },
    influences: [
      { target: "seo", why: "Shows which rankings actually turn into revenue." },
      { target: "automation", why: "What you can measure reliably, you can automate safely." },
      { target: "positioning", why: "Reveals which audience actually pays, sharpening the position." },
    ],
    grid: { tx: 250, ty: 215, sx: 540, sy: 110, rot: 10 },
  },
  {
    id: "brand",
    label: "Brand",
    discipline: "design",
    definition:
      "Brand is what people believe about you before they have spoken to you. It is built from every detail, or eroded by them.",
    philosophy: [
      "Brand is not a logo. It is the felt sense of whether you are serious, careful, and worth the price. It lives in typography, spacing, tone, and the hundred small choices most businesses leave to chance.",
      "We design it deliberately, so the impression a visitor forms in three seconds is the one you intended.",
    ],
    framework: {
      name: "Brand as a system",
      steps: [
        { name: "Define", detail: "Decide the one impression that must land, and the personality behind it." },
        { name: "Build", detail: "Turn it into a reusable system: type, color, motion, voice, components." },
        { name: "Hold", detail: "Apply it consistently everywhere, so the brand compounds instead of resetting." },
      ],
    },
    beforeAfter: {
      before: { label: "Looks like it was built to a budget", note: "Trust leaks at every edge." },
      after: { label: "Looks like it was built to last", note: "The price feels justified." },
    },
    influences: [
      { target: "web-design", why: "Sets the rules the interface applies on every screen." },
      { target: "content", why: "A defined voice makes every post recognizably yours." },
      { target: "positioning", why: "Brand is how the position becomes something people feel." },
    ],
    grid: { tx: 480, ty: 150, sx: 150, sy: 470, rot: -8 },
  },
  {
    id: "web-design",
    label: "Web design",
    discipline: "design",
    definition:
      "Web design is the craft of turning strategy and brand into an interface people understand instantly and trust quickly.",
    philosophy: [
      "A website is not a brochure. It is where the decision to trust you is made, usually on a phone, in seconds. Every layout choice either clears the path to that decision or clutters it.",
      "We design for comprehension first. Clarity comes first and beauty follows it.",
    ],
    framework: {
      name: "Design for the decision",
      steps: [
        { name: "Structure", detail: "Decide what each page must make easy, then remove everything that does not serve it." },
        { name: "Compose", detail: "Type, space, and hierarchy do the work; decoration earns its place or goes." },
        { name: "Refine", detail: "Test on a real phone, at real speed, until the path feels obvious." },
      ],
    },
    beforeAfter: {
      before: { label: "A site that lists everything", note: "The visitor has to work." },
      after: { label: "A site with one clear next step", note: "The visitor just acts." },
    },
    influences: [
      { target: "development", why: "Design is only real once it is built fast and accessible." },
      { target: "seo", why: "Structure and speed are ranking factors in their own right." },
      { target: "brand", why: "Every screen is the brand's most-seen surface." },
    ],
    grid: { tx: 545, ty: 215, sx: 430, sy: 80, rot: 14 },
  },
  {
    id: "development",
    label: "Development",
    discipline: "technology",
    definition:
      "Development is the engineering that makes a site fast, reliable, accessible, and able to grow without being rebuilt.",
    philosophy: [
      "Most sites get assembled in a hurry. They look fine on day one and creak by month six. We build to production standards: typed, tested against real numbers, and made to extend.",
      "The goal is a foundation you can keep building on for years.",
    ],
    framework: {
      name: "Built to last",
      steps: [
        { name: "Engineer", detail: "Production-grade code: fast, accessible, measured against real performance budgets." },
        { name: "Verify", detail: "Test on the cheap phones and slow networks your customers actually use." },
        { name: "Extend", detail: "Structure it so tomorrow's feature is an addition." },
      ],
    },
    beforeAfter: {
      before: { label: "A template stretched to fit", note: "Slow, fragile, a dead end." },
      after: { label: "A platform built to grow", note: "Fast today, extensible tomorrow." },
    },
    influences: [
      { target: "automation", why: "Clean engineering makes automation reliable instead of risky." },
      { target: "seo", why: "Speed, structure, and accessibility are technical SEO." },
      { target: "web-design", why: "Craft in the build is what makes the design feel effortless." },
    ],
    grid: { tx: 185, ty: 360, sx: 600, sy: 250, rot: 11 },
  },
  {
    id: "automation",
    label: "Automation",
    discipline: "technology",
    definition:
      "Automation is removing the repetitive manual work between a customer's action and your response, so nothing slips and no one waits.",
    philosophy: [
      "Every business leaks time and leads in the gaps between tools: a form that emails a spreadsheet nobody checks, a booking that takes three manual steps. We close those gaps.",
      "Done well, automation is invisible. The business simply runs, and the team spends its hours on work only people can do.",
    ],
    framework: {
      name: "Close the gaps",
      steps: [
        { name: "Map", detail: "Trace the real path from first contact to done, and mark every manual handoff." },
        { name: "Connect", detail: "Wire the tools so information moves on its own, without copy and paste." },
        { name: "Guard", detail: "Add checks so the automation fails loudly, never silently." },
      ],
    },
    beforeAfter: {
      before: { label: "Leads sit in an inbox overnight", note: "Some never get a reply." },
      after: { label: "Every lead answered in minutes", note: "Nothing slips through." },
    },
    influences: [
      { target: "analytics", why: "Automated collection keeps measurement honest and current." },
      { target: "content", why: "Publishing runs on a schedule instead of memory." },
      { target: "development", why: "Reliable automation gets built in from the start." },
    ],
    grid: { tx: 250, ty: 425, sx: 120, sy: 120, rot: -15 },
  },
  {
    id: "seo",
    label: "SEO",
    discipline: "growth",
    definition:
      "SEO is earning a durable place in search results, so the right customers find you without paying for every click.",
    philosophy: [
      "Ads stop the moment you stop paying. Search presence, built properly, compounds: the work you do this quarter keeps returning customers next year. That makes it an asset on the balance sheet.",
      "We build it on real content and clean engineering, never tricks. The businesses that win search are the ones that deserve to.",
    ],
    framework: {
      name: "Earn the ranking",
      steps: [
        { name: "Target", detail: "Find the searches with real intent to buy behind them." },
        { name: "Build", detail: "Answer them better than anyone, with pages that deserve the spot." },
        { name: "Compound", detail: "Strengthen it over time so the position holds and widens." },
      ],
    },
    beforeAfter: {
      before: { label: "Invisible unless you pay per click", note: "Growth rented, never owned." },
      after: { label: "Found first for what matters", note: "Growth that keeps returning." },
    },
    influences: [
      { target: "content", why: "Content is the raw material search rewards." },
      { target: "development", why: "Speed and structure decide how far content can climb." },
      { target: "positioning", why: "A sharp position wins niches broad rivals cannot." },
    ],
    grid: { tx: 480, ty: 360, sx: 560, sy: 470, rot: 7 },
  },
  {
    id: "content",
    label: "Content",
    discipline: "growth",
    definition:
      "Content is the words and visuals that build trust before a sale, answer real questions, and give search something worth ranking.",
    philosophy: [
      "Most content is published to fill a calendar, and it reads like filler because it is. We make content with a job: answer a question a real customer is asking, or show proof of the work.",
      "Consistent, useful content is how a business earns authority slowly and keeps it. It is the compounding half of growth.",
    ],
    framework: {
      name: "Content with a job",
      steps: [
        { name: "Source", detail: "Start from the questions customers actually ask." },
        { name: "Make", detail: "Answer each one clearly, in your voice, better than the current best result." },
        { name: "Sustain", detail: "Keep a rhythm the business can hold without burning out." },
      ],
    },
    beforeAfter: {
      before: { label: "Posting to stay visible", note: "Effort in, little back." },
      after: { label: "Publishing to build authority", note: "Every piece still works months later." },
    },
    influences: [
      { target: "seo", why: "Content is what ranking is built from." },
      { target: "brand", why: "Every piece can sound unmistakably like you." },
      { target: "analytics", why: "The numbers show which pieces earn trust." },
    ],
    grid: { tx: 545, ty: 425, sx: 210, sy: 90, rot: -6 },
  },
];

const nodeById = new Map(capabilityNodes.map((n) => [n.id, n]));

export function getNode(id: CapabilityNodeId): CapabilityNode {
  const node = nodeById.get(id);
  if (!node) throw new Error(`Unknown capability node: ${id}`);
  return node;
}

/** Reverse of `influences`: which nodes point at each node, and why. Lets a
 *  panel show "shaped by" alongside "shapes". Computed once at module load. */
export const influencedBy: Record<CapabilityNodeId, Influence[]> =
  capabilityNodes.reduce(
    (acc, node) => {
      for (const inf of node.influences) {
        acc[inf.target].push({ target: node.id, why: inf.why });
      }
      return acc;
    },
    Object.fromEntries(
      capabilityNodes.map((n) => [n.id, [] as Influence[]]),
    ) as Record<CapabilityNodeId, Influence[]>,
  );

/** DefinedTermSet schema: makes each capability an answer-shaped, quotable
 *  definition for AI Overviews and LLM search. `url` points at the homepage
 *  anchor until dedicated /capabilities/[slug] pages exist, then it graduates. */
export function capabilitySchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${siteUrl}/#capability-system`,
    name: "The Quadrant Collective capability system",
    description:
      "Eight capabilities across four disciplines (strategy, design, technology, growth) that Quadrant Collective builds as one connected system.",
    hasDefinedTerm: capabilityNodes.map((n) => ({
      "@type": "DefinedTerm",
      name: n.label,
      description: n.definition,
      inDefinedTermSet: `${siteUrl}/#capability-system`,
      url: `${siteUrl}/#capabilities/${n.id}`,
    })),
  };
}
