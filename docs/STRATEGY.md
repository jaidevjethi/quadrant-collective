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

Each beat answers one question and hands off to the next. Motion budget: one choreographed idea per beat, not one per element.

1. **Arrival** — *Who are we?* One declarative sentence, large type, generous silence around it. Single CTA. No carousel, no particles, no video background.
2. **The belief** — *What do we believe?* The problem the audience already feels: most business websites are expenses that look like assets. We build the opposite.
3. **Capabilities** — *What do we solve?* Outcomes, not a service menu. Design → build → grow, expressed as business results.
4. **The method** — *How do we work?* 3–4 step process. For a solo studio this is the credibility engine: clarity of process signals maturity more than headcount does.
5. **Proof** — *Why trust us?* Selected work, results first, visuals second. Structure ready; ships with real projects only.
6. **The difference** — *Why us?* The craft argument: product-company standards applied to client work. Possibly 3 principles, stated plainly.
7. **The invitation** — *What now?* Direct, low-friction contact. One form, one promise about response time we can actually keep.
8. **Footer** — legal name, Organization/LocalBusiness schema, sitemap links, no clutter.

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
3. ▶ Homepage, beat by beat, one at a time — starting with Beat 1 (Arrival).
4. About → Contact → Work (as content arrives) → SEO layer → analytics.
