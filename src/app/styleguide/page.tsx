import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { LogoLockup } from "@/components/brand/logo-lockup";
import {
  PlotRevealDemo,
  AxisDrawDemo,
  CounterDemo,
  GridEmergeDemo,
} from "@/components/styleguide/motion-demos";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-hairline py-16">
      <div className="mb-10 flex items-baseline gap-4">
        <span className="label-mono text-growth">{index}</span>
        <h2 className="text-title font-medium text-clarity">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Swatch({
  name,
  hex,
  meaning,
  className,
}: {
  name: string;
  hex: string;
  meaning: string;
  className: string;
}) {
  return (
    <div>
      <div className={`h-24 rounded-md border border-hairline ${className}`} />
      <p className="mt-3 text-sm font-medium text-clarity">{name}</p>
      <p className="label-mono mt-1 text-muted-2">{hex}</p>
      <p className="mt-1 text-xs text-faint">{meaning}</p>
    </div>
  );
}

function CornerTicks() {
  const tick = "pointer-events-none absolute h-2.5 w-2.5 border-hairline-strong transition-colors duration-200 group-hover:border-growth";
  return (
    <>
      <span className={`${tick} left-0 top-0 border-l border-t`} />
      <span className={`${tick} right-0 top-0 border-r border-t`} />
      <span className={`${tick} bottom-0 left-0 border-b border-l`} />
      <span className={`${tick} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

export default function StyleguidePage() {
  return (
    <main className="mx-auto max-w-5xl px-gutter pb-32">
      <header className="flex flex-col gap-6 py-20">
        <LogoLockup size="md" />
        <h1 className="text-display font-medium text-clarity">Design system</h1>
        <p className="max-w-xl text-lead text-muted-2">
          The single source of truth for how Quadrant Collective looks, moves
          and speaks. Every page extends this system — nothing is decided twice.
        </p>
        <span className="label-mono text-faint">QC / System / V1 — internal</span>
      </header>

      <Section index="01" title="Logo">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 rounded-lg border border-hairline bg-raised p-10">
            <LogoMark size={120} variant="construction" />
            <span className="label-mono text-faint">Construction</span>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-hairline bg-raised p-10">
            <LogoMark size={120} />
            <span className="label-mono text-faint">Plain</span>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-hairline bg-raised p-10">
            <LogoMark size={120} tone="mono" />
            <span className="label-mono text-faint">Mono</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-12 rounded-lg border border-hairline bg-raised p-10">
          <LogoLockup size="lg" />
          <LogoLockup size="md" />
          <LogoLockup size="sm" />
        </div>
        <p className="mt-6 max-w-2xl text-sm text-muted-2">
          Four quadrants represent the four disciplines. The intersection
          represents clarity, alignment and impact. The Q signifies
          questioning, thinking and quality.
        </p>
      </Section>

      <Section index="02" title="Color">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          <Swatch name="Depth" hex="#0D0F14" meaning="Base background" className="bg-depth" />
          <Swatch name="Balance" hex="#1A1D24" meaning="Raised surfaces" className="bg-balance" />
          <Swatch name="Clarity" hex="#E6E6E6" meaning="Primary text" className="bg-clarity" />
          <Swatch name="Vision" hex="#7C3AED" meaning="Accent — violet" className="bg-vision" />
          <Swatch name="Intelligence" hex="#2563EB" meaning="Accent — electric blue" className="bg-intelligence" />
          <Swatch name="Growth" hex="#00D1B2" meaning="Accent — reserved for metrics" className="bg-growth" />
        </div>
        <p className="mt-8 max-w-2xl text-sm text-muted-2">
          Dark by default. At most two accents visible at a time — color
          communicates focus, never decoration. Neutrals (muted text, hairline
          borders) are derived tokens in globals.css.
        </p>
      </Section>

      <Section index="03" title="Typography">
        <div className="flex flex-col gap-12">
          <div>
            <span className="label-mono text-faint">Display XL / General Sans 500</span>
            <p className="mt-3 text-display-xl font-medium text-clarity">
              Systems, not services.
            </p>
          </div>
          <div>
            <span className="label-mono text-faint">Display / General Sans 500</span>
            <p className="mt-3 text-display font-medium text-clarity">
              We build systems that drive real growth.
            </p>
          </div>
          <div>
            <span className="label-mono text-faint">Headline / General Sans 500</span>
            <p className="mt-3 text-headline font-medium text-clarity">
              Strategy-led. Design-driven. Technology-powered.
            </p>
          </div>
          <div>
            <span className="label-mono text-faint">Title / General Sans 500</span>
            <p className="mt-3 text-title font-medium text-clarity">
              Four disciplines. One impact.
            </p>
          </div>
          <div className="max-w-xl">
            <span className="label-mono text-faint">Lead / General Sans 400</span>
            <p className="mt-3 text-lead text-muted-2">
              A great business is not the result of isolated services. It is
              the result of multiple disciplines working together as one
              system.
            </p>
          </div>
          <div className="max-w-xl">
            <span className="label-mono text-faint">Body / General Sans 400</span>
            <p className="mt-3 text-base text-muted-2">
              The interface should feel engineered rather than decorated.
              Everything has purpose; nothing is accidental. Visual restraint
              communicates maturity, and the experience rewards attention.
            </p>
          </div>
          <div>
            <span className="label-mono text-faint">Instrument layer / Geist Mono 500</span>
            <p className="label-mono mt-3 text-clarity">
              04 / Growth — 23.5937° N, 72.3684° E
            </p>
          </div>
        </div>
      </Section>

      <Section index="04" title="Spacing & surfaces">
        <div className="flex flex-col gap-3">
          {[
            { label: "micro / 8px", w: "w-2" },
            { label: "element / 24px", w: "w-6" },
            { label: "block / 64px", w: "w-16" },
            { label: "section / clamp(112–176px)", w: "w-44" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className={`h-3 ${s.w} rounded-sm bg-intelligence/60`} />
              <span className="label-mono text-faint">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="group relative rounded-lg border border-hairline bg-raised p-8 transition-transform duration-200 hover:-translate-y-0.5">
            <CornerTicks />
            <span className="label-mono text-muted-2">01 / Registration card</span>
            <h3 className="mt-4 text-title font-medium text-clarity">
              Architectural surfaces
            </h3>
            <p className="mt-2 text-sm text-muted-2">
              Hairline borders, corner ticks like an engineering drawing, depth
              from layering — not drop shadows. Hover to see the crosshair
              focus state.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-hairline bg-depth p-8">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <span className="label-mono relative text-muted-2">02 / The plane</span>
            <p className="relative mt-4 text-sm text-muted-2">
              The coordinate grid is the quiet background of the brand — order
              emerging from complexity.
            </p>
          </div>
        </div>
      </Section>

      <Section index="05" title="Motion">
        <p className="mb-8 max-w-2xl text-sm text-muted-2">
          Slow, intentional, weighted. Movement communicates thinking: things
          plot into place, axes draw, instruments measure, grids emerge.
          Never bouncy. Fully disabled under reduced-motion preferences.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <PlotRevealDemo />
          <AxisDrawDemo />
          <CounterDemo />
          <GridEmergeDemo />
        </div>
        <div className="mt-8 grid gap-x-12 gap-y-2 rounded-lg border border-hairline bg-raised p-8 md:grid-cols-2">
          <div className="flex justify-between border-b border-hairline py-2">
            <span className="label-mono text-muted-2">micro</span>
            <span className="font-mono text-sm text-clarity">200 ms</span>
          </div>
          <div className="flex justify-between border-b border-hairline py-2">
            <span className="label-mono text-muted-2">precision ease</span>
            <span className="font-mono text-sm text-clarity">0.16, 1, 0.3, 1</span>
          </div>
          <div className="flex justify-between border-b border-hairline py-2">
            <span className="label-mono text-muted-2">standard</span>
            <span className="font-mono text-sm text-clarity">600 ms</span>
          </div>
          <div className="flex justify-between border-b border-hairline py-2">
            <span className="label-mono text-muted-2">weighted ease</span>
            <span className="font-mono text-sm text-clarity">0.7, 0, 0.3, 1</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="label-mono text-muted-2">choreography</span>
            <span className="font-mono text-sm text-clarity">1100 ms</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="label-mono text-muted-2">forbidden</span>
            <span className="font-mono text-sm text-clarity">bounce · elastic · overshoot</span>
          </div>
        </div>
      </Section>

      <Section index="06" title="Components">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="cursor-pointer rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-90"
          >
            Start a conversation
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-md border border-hairline-strong bg-balance px-6 py-3 text-sm font-medium text-clarity transition-colors duration-200 hover:border-clarity/30"
          >
            See our work
          </button>
          <button
            type="button"
            className="label-mono cursor-pointer px-2 py-3 text-muted-2 transition-colors duration-200 hover:text-clarity"
          >
            Ghost / index →
          </button>
        </div>
        <p className="mt-8 max-w-2xl text-sm text-muted-2">
          Buttons are tactile but restrained: the primary action is soft-white
          on dark — accents stay reserved for focus and meaning. Further
          components (forms, navigation) are added to this page as they are
          designed.
        </p>
      </Section>
    </main>
  );
}
