# Strategy & Discovery

> Working document. Decisions recorded here are current-best, not permanent (see VISION.md → Flexibility).
> Last updated: 2026-07-03

## Brand facts (from founder)

- **Public brand:** **Quadrant Collective** (decided 2026-07-03). Legal entity remains *Quadrant Ops India* — footer, invoices, schema `legalName`. Conversational shorthand: "Quadrant".
- **Brand story:** a quadrant is one of four parts that complete a plane. The services — design, engineering, brand/SEO, growth/AI — are the quadrants; the collective is them working as one force. *Four disciplines, one plane.* The coordinate-plane / 2×2 grid motif is the seed of the visual identity.
- **Reality:** Independent studio, founder-led with specialists per engagement — this is the honest answer to "who's in the collective?", stated confidently on About. Studio-framed voice ("we"). The About page must be honest enough that a first sales call never contradicts the site.
- **Market:** India-first, anchored to the Gujarat corridor — **Mehsana · Ahmedabad · Vadodara** (primary city for LocalBusiness schema = wherever the business is registered; confirm). Local SEO is a primary lever; copy tuned to Indian B2B decision makers who value quality over lowest price.
- **Proof:** Real past projects exist. Founder will supply info + visuals; the Work system is built placeholder-ready but ships only with real content. **No fake testimonials, no invented logos, no stock "team" photos — ever.**

## Positioning statement (internal compass, not homepage copy)

For founders and professional-service leaders in India who value quality over the lowest price, **Quadrant Collective** is the digital growth partner that designs and builds with the craft of a product company — not the churn of an agency. Every engagement is engineered for trust, clarity, and measurable growth.

## Voice rules

- "We" throughout the site; About discloses the founder-led studio model with confidence, not apology.
- Calm, precise, declarative. Short sentences. No hype adjectives ("cutting-edge", "world-class", "unleash").
- Claims are either provable or not made.

## Sitemap — v1 launch scope (restraint over coverage)

| Route | Purpose | Notes |
|---|---|---|
| `/` | The story (see narrative below) | Primary conversion surface |
| `/work` | Case study index | Ships only when ≥1 real case study is ready |
| `/work/[slug]` | Case study detail | Results-led template: context → approach → outcome |
| `/about` | Studio story, principles, founder | Honest solo-studio framing as a trust signal |
| `/contact` | Conversion point | RHF + Zod form; low friction |
| `/privacy` | Legal | Required for GA + Clarity |

**Deliberately deferred to phase 2** (thin pages at launch would hurt more than help):
- `/services/[slug]` — dedicated SEO landing pages ("website design company in [city]" etc.), built one at a time with real content depth once local SEO strategy is active.
- `/insights` — journal/articles for topical authority.

Services at launch live as a *capabilities section on the homepage*, framed around outcomes and decoupled from the current service list (per VISION.md → Long-Term Brand Direction).

## Homepage narrative — beat by beat

Each beat answers one question and hands off to the next. Motion budget: **one choreographed idea per beat, not one per element** — the page starts with its busiest moment (arrival) and gets progressively calmer toward the form; calm at the ask reads as confidence. Vocabulary comes exclusively from the approved motion language (`/styleguide` § Motion Dynamics): plot-in, axis draw, measurement counters, grid emergence, flow streak.

1. **Arrival** — *Who are we?* Headline decided 2026-07-04: disciplines eyebrow + "Four disciplines." with "ONE SYSTEM" as tracked-caps gradient (mirrors the COLLECTIVE wordmark treatment). Single CTA. **Motion:** load choreography (not scroll) — mark draws, text plots in. SVG + text only; the headline is the LCP element.
2. **The belief** — *What do we believe?* The problem the audience already feels: most business websites are expenses that look like assets. We build the opposite. **Motion:** statement lines reveal once on scroll (transform + opacity only).
3. **Capabilities** — *What do we solve?* Outcomes, not a service menu. **Signature moment (1 of 3):** scattered capability chips (SEO, brand, content, ads, automation, AI, analytics…) resolve and snap into the four-quadrant grid — the logo's own geometry. This is where the "it was assembling the whole time" payoff lives (founder decision 2026-07-04): the hero keeps the finished mark visible for time-to-value; the *emergence* is staged here as synthesis, not delayed to the first screen. The scatter→align motion **is** the thesis (disconnected tools → one system). Trigger-once timeline, SVG transform/opacity/dashoffset only; static resolved state on mobile + reduced-motion.

> **The three signature moments** (the entire motion budget; everything else ~80% still): (1) blueprint entry — hero → belief transition, grid waking up; (2) capabilities assembly — chips snap into the quadrant system, above; (3) intersection/network — hovering one discipline lights its connected disciplines, "growth happens at the intersection." Each plays once in-view, never scroll-scrubbed, each degrades to a beautiful static state. Rationale + rejected alternatives (scroll-jacked camera, WebGL particles): they conflict with the mobile-first, Lighthouse-95 constraint.
4. **The method** — *How do we work?* 3–4 step process; for a solo studio, clarity of process signals maturity more than headcount does. **Motion:** an axis draws, steps plot along it (dashoffset line draw — cheapest possible).
5. **Proof** — *Why trust us?* Results first, visuals second. Structure ready; ships with real projects only — until then the section is absent and beats 4 + 6 carry credibility. **Motion:** measurement counters.
6. **The difference** — *Why us?* Product-company standards applied to client work; 3 principles stated plainly. **Motion:** almost still — staggered fades. Restraint is the point.
7. **The invitation** — *What now?* Direct, low-friction contact; the form lives here (the only truly interactive JS on the page). One promise about response time we can keep. **Motion:** flow streak leads into the form.
8. **Footer** — legal name, Organization/LocalBusiness schema, sitemap links, no clutter. Completely still; static server component.

**Performance budget (Lighthouse 95+ mobile is a build gate, not a wish):** all routes statically prerendered; one GSAP + ScrollTrigger load (~37 KB gz) shared by every beat; animations touch only `transform`/`opacity`; fonts self-hosted zero-CLS; images only via `next/image` (AVIF, lazy) and only when Proof ships; GA + Clarity load `lazyOnload`, off the critical path; `prefers-reduced-motion` degrades everything to opacity. Each beat is verified against a production build when it lands, not at the end.

## SEO strategy (India-first) — foundations at launch

- `LocalBusiness` + `Organization` schema anchored to the studio's city (**city TBD — see Open Decisions**).
- Metadata API per route; OG images per page; robots.txt + sitemap.xml from day one.
- Semantic HTML and heading hierarchy are design constraints, not afterthoughts.
- Keyword-targeted service pages are phase 2 — after launch, one deep page at a time.

## Open decisions

1. **Domain** — register `quadrantcollective.in` (and `.com` if available) promptly; verify availability before announcing the brand anywhere.
2. **Primary schema city** — Mehsana, Ahmedabad, or Vadodara: use the registered business address for `LocalBusiness`; the other two become phase-2 landing-page targets.
3. **Trademark / MCA sanity check** — quick search on ipindia.gov.in and MCA name lookup for "Quadrant Collective" before investing in identity assets.

## Build order (after decisions above)

1. ✅ Scaffold: Next.js 16 + Tailwind v4 + shadcn/ui, `src/` structure, fonts (General Sans + Geist Mono). *(2026-07-03)*
2. ✅ Design system v1: tokens in `globals.css`, logo as code (`src/components/brand/`), motion foundation (`src/lib/motion.ts`, Lenis provider), reviewable at `/styleguide`. Governed by `docs/BRAND.md`. **Approved by founder 2026-07-04** — four-color quadrant mark (Strategy/violet, Design/amber, Technology/blue, Growth/teal), crosshair always visible.
3. ✅ Homepage, all 8 beats built & QA'd against a production build (2026-07-04). Beat 1 Arrival · Beat 2 Belief ("systems problem", `Reveal` primitive) · Beat 3 Capabilities (assembly signature moment) · Beat 4 Method (axis-draw timeline) · Beat 5 Proof ("the site is the proof" — honest build-standard counters, no fake case studies) · Beat 6 Difference (network signature moment + 3 principles) · Beat 7 Invitation (RHF+Zod form → real `/api/contact` route, hero CTA now `#contact`) · Beat 8 Footer (Organization JSON-LD, no fabricated address). Verified: `/` static-prerendered, full page content in no-JS HTML, all signature moments fire on Lenis scroll, 1×h1 + clean heading outline, no console errors, no horizontal overflow.
   - **Follow-ups before launch:** wire `/api/contact` to a real email/CRM provider (needs creds); add `LocalBusiness` schema once the registered address is confirmed (open decision #2); resolve `SITE_URL` once the domain is registered (open decision #1); the two temporary-looking taglines ("One system" hero vs. BrandTagline "One impact.") — reconcile.
4. About → Contact (route) → Work (as content arrives) → SEO layer (metadata per route, sitemap.xml, robots.txt, OG images) → analytics (GA + Clarity, lazyOnload).
