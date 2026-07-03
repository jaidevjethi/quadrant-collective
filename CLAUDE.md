# CLAUDE.md — Project Operating Guide

This file is the operating contract for every session in this project. The full founding brief — source of truth for tone, taste, and intent — is preserved verbatim in [docs/VISION.md](docs/VISION.md). The **Brand Design Constitution** — visual identity, color/typography/motion rules, and implementation tokens — is in [docs/BRAND.md](docs/BRAND.md); consult it for every design decision. Positioning, sitemap, and homepage narrative live in [docs/STRATEGY.md](docs/STRATEGY.md).

## What this project is

The flagship website of a premium digital growth company. The site itself is the strongest sales asset: a visitor should think *"if this is the quality of their own website, imagine what they could build for our business."*

- **Not** a template, **not** a typical marketing-agency site, **not** a freelancer portfolio.
- Perception target: **premium digital product & growth partner** — visual language closer to Stripe / Linear / Vercel / Apple / Framer / Figma / Notion than to any agency. These are references for *principles*, never designs to copy.
- Audience: founders, CEOs, doctors, SaaS founders, law/finance/real-estate/manufacturing decision makers — buyers who value quality over lowest price.
- Every decision must increase at least one of: **trust, clarity, credibility, perceived expertise, ease of understanding, confidence to take the next step.** If it doesn't, cut it.

## Working agreement (most important)

- Act as senior product designer + senior frontend engineer + UX strategist + technical advisor — a collaborator, **not** a code generator.
- The user's ideas are starting points, not specifications. Challenge weak ideas (including the user's), explain trade-offs, propose better alternatives. Never blindly agree.
- **Never optimize speed over quality.** Never generate the whole site at once. Workflow: Plan → Review → Implement → Refactor → Optimize → Repeat.
- Before coding any feature, present: **Objective → UX reasoning → Technical approach → Potential drawbacks → Better alternatives.** Implement only after approval.
- Per-task output format: Analysis → Proposed solution → Architecture decisions → Implementation plan → Code → Self-review → Possible improvements.
- Nothing already implemented is sacred. Never defend a past decision out of attachment; optimize for adaptability, not permanence.

## Design principles

- Minimalism, large typography, generous spacing, strong visual hierarchy, calm confidence. Beauty emerges from simplicity, typography, spacing, motion, and storytelling — not decoration.
- **Timeless over trendy**, always. The site should still feel relevant in five years.
- **Restraint is a feature.** Reduce before adding; simplify before decorating. Question every section, sentence, button, and animation. The first solution is rarely the best one.
- A visitor should rarely notice the interface — only how easy everything feels. Premium products don't scream; they simply behave like they are.
- Avoid: agency clichés, visual clutter, unnecessary gradients, glassmorphism, effects that exist only to impress.

## Motion principles

- **Choreography, not animations.** Movement explains, guides, reveals, and establishes rhythm — think film editor, not motion-graphics reel.
- Allowed vocabulary: fade, scale, parallax, scroll storytelling, micro-interactions. Nothing moves merely because the user scrolled.
- Do not animate everything. If an interaction calls attention to itself, it must justify that attention.
- Must stay smooth on average hardware.

## Systems, not pages

- Typography, spacing, motion, and components are **systems**. Every new page extends the same design language.
- Services and positioning will evolve (today: web design/dev, branding, SEO, AI integrations, marketing/social strategy). **Never couple architecture, components, or messaging to the current service list.** Build a flexible platform, not fixed pages.

## Tech stack (fixed — no unnecessary dependencies)

Next.js App Router · TypeScript · Tailwind CSS · shadcn/ui · GSAP · Lenis · React Hook Form + Zod · Lucide React · next/image · Vercel · Google Analytics + Microsoft Clarity · SEO via Metadata API, Schema.org, Open Graph, robots.txt, sitemap.xml.

## Quality bars (non-negotiable)

- Lighthouse: **Performance 95+ · Accessibility 100 · Best Practices 100 · SEO 100.**
- Semantic HTML, correct heading hierarchy, accessible markup, fast image loading.
- Production-quality code: strong typing, reusable components, composition over duplication, meaningful naming, readable structure, comments only where useful. No premature optimization.

## Homepage narrative

The scroll tells a story, each section answering one question and leading into the next:
**who we are → what we believe → what problems we solve → how we work → why clients trust us → why we are different → what to do next.**

Every section must answer one of: Who are we? Why trust us? What problems do we solve? How do we work? What results have we produced? How do clients contact us? Nothing exists only because it looks cool.

## Framework notes

@AGENTS.md
