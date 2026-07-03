import type { Metadata } from "next";
import { LogoMark } from "@/components/brand/logo-mark";
import { LogoLockup } from "@/components/brand/logo-lockup";
import { AppIconTile } from "@/components/brand/app-icon-tile";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { BrandTagline } from "@/components/brand/brand-tagline";
import {
  IntersectionGlyph,
  FlowGlyph,
  StructureGlyph,
  GrowthGlyph,
} from "@/components/brand/glyphs";
import {
  PlotRevealDemo,
  AxisDrawDemo,
  CounterDemo,
  GridEmergeDemo,
  FlowStreakDemo,
} from "@/components/styleguide/motion-demos";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

function CornerTicks() {
  const tick =
    "pointer-events-none absolute h-2.5 w-2.5 border-hairline-strong transition-colors duration-200 group-hover:border-growth";
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
    <main className="min-h-screen bg-[#050608] p-4 font-sans lg:p-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-px overflow-hidden rounded-xl border border-hairline bg-hairline shadow-2xl">
        {/* Row 1: Hero */}
        <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
          <div className="relative col-span-4 flex items-center justify-center overflow-hidden bg-depth p-10">
            <LogoMark size={240} variant="construction" glow />
          </div>
          <div className="col-span-5 flex flex-col justify-center bg-depth p-10">
            <div className="flex flex-col">
              <h1 className="font-display text-4xl font-bold uppercase tracking-[0.14em] text-clarity [font-stretch:125%] lg:text-5xl">
                Quadrant
                <sup className="ml-1 align-super text-[0.35em] font-medium opacity-50">™</sup>
              </h1>
              <span className="mt-3 bg-gradient-to-r from-vision via-intelligence to-growth bg-clip-text text-xl font-medium uppercase tracking-[0.52em] text-transparent">
                Collective
              </span>
            </div>
            <BrandTagline className="mt-12" />
          </div>
          <div className="col-span-3 flex flex-col justify-center gap-10 bg-depth p-10">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-vision">Brand Essence</h3>
              <p className="mt-4 text-[10px] font-medium uppercase leading-relaxed tracking-wider text-muted-2 lg:text-xs">
                We bring strategy, creativity, technology and growth marketing together in one system—so businesses don&apos;t just grow, they scale.
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-intelligence">Our Role</h3>
              <p className="mt-4 text-[10px] font-medium uppercase leading-relaxed tracking-wider text-muted-2 lg:text-xs">
                The intersection that creates transformation.
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: Logo details */}
        <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
          <div className="col-span-4 flex flex-col bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">The Logo Mark</h3>
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
              <LogoMark size={110} variant="construction" tone="mono" />
              <div className="flex flex-col gap-4 text-[9px] uppercase leading-relaxed text-muted-2">
                <p>Four quadrants represent our core disciplines.</p>
                <p>Only two carry color, per the Constitution&apos;s restraint rule — the other two stay structural.</p>
                <p>The Q signifies questioning, thinking and quality.</p>
              </div>
            </div>
          </div>
          <div className="col-span-5 flex flex-col bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Variations</h3>
            <div className="flex h-full items-center justify-around pb-6">
              <LogoLockup size="md" orientation="stacked" />
              <LogoLockup size="md" orientation="stacked" tone="mono" />
              <AppIconTile size={96} />
            </div>
          </div>
          <div className="col-span-3 flex flex-col bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Icon Only</h3>
            <div className="flex flex-1 items-center justify-center">
              <LogoMark size={160} variant="construction" />
            </div>
          </div>
        </div>

        {/* Row 3: System basics */}
        <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
          <div className="col-span-4 bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Color Palette</h3>
            <div className="flex h-20 w-full overflow-hidden rounded-md border border-hairline">
              <div className="flex-1 bg-vision" />
              <div className="flex-1 bg-intelligence" />
              <div className="flex-1 bg-growth" />
              <div className="flex-1 bg-depth" />
              <div className="flex-1 bg-balance" />
              <div className="flex-1 bg-clarity" />
            </div>
            <div className="mt-4 flex w-full text-[9px] uppercase tracking-wider text-muted-2">
              <div className="flex-1">Vision<br />#7C3AED</div>
              <div className="flex-1">Intell<br />#2563EB</div>
              <div className="flex-1">Growth<br />#00D1B2</div>
              <div className="flex-1">Depth<br />#0D0F14</div>
              <div className="flex-1">Balance<br />#1A1D24</div>
              <div className="flex-1">Clarity<br />#E6E6E6</div>
            </div>
          </div>
          <div className="col-span-4 bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Typography</h3>
            <div className="flex items-start gap-8">
              <div>
                <h2 className="text-4xl font-medium text-clarity lg:text-5xl">General Sans</h2>
                <p className="mt-1.5 text-[9px] uppercase tracking-widest text-faint">
                  Board reference: Aeonik (unlicensed) — see docs/BRAND.md
                </p>
                <h3 className="mt-6 text-[10px] uppercase tracking-widest text-muted-2">Type System</h3>
                <p className="mt-3 text-lg font-medium leading-tight text-clarity">
                  We build systems<br />that drive real growth.
                </p>
                <p className="mt-4 text-[10px] text-muted-2">
                  Strategy-led. Design-driven. Technology-powered.<br />All working together.
                </p>
              </div>
              <div className="mt-2 flex flex-col gap-2 text-[10px] text-muted-2">
                <span className="font-light text-clarity">Light</span>
                <span className="font-normal text-clarity">Regular</span>
                <span className="font-medium text-clarity">Medium</span>
                <span className="font-bold text-clarity">Bold</span>
              </div>
            </div>
          </div>
          <div className="col-span-4 bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Visual Language</h3>
            <div className="grid h-full grid-cols-4 gap-4 pb-4">
              <div className="flex flex-col">
                <div className="flex h-16 items-center justify-center"><IntersectionGlyph className="h-full w-full opacity-80" /></div>
                <h4 className="mt-3 text-[9px] font-bold uppercase tracking-wider text-clarity">Intersection</h4>
                <p className="mt-1 text-[9px] leading-relaxed text-muted-2">Where ideas align.</p>
              </div>
              <div className="flex flex-col">
                <div className="flex h-16 items-center justify-center"><FlowGlyph className="h-full w-full opacity-80" /></div>
                <h4 className="mt-3 text-[9px] font-bold uppercase tracking-wider text-clarity">Flow</h4>
                <p className="mt-1 text-[9px] leading-relaxed text-muted-2">Ideas move.<br />Systems connect.</p>
              </div>
              <div className="flex flex-col">
                <div className="flex h-16 items-center justify-center"><StructureGlyph className="h-full w-full opacity-80" /></div>
                <h4 className="mt-3 text-[9px] font-bold uppercase tracking-wider text-clarity">Structure</h4>
                <p className="mt-1 text-[9px] leading-relaxed text-muted-2">Built on strategy.<br />Backed by systems.</p>
              </div>
              <div className="flex flex-col">
                <div className="flex h-16 items-center justify-center"><GrowthGlyph className="h-full w-full opacity-80" /></div>
                <h4 className="mt-3 text-[9px] font-bold uppercase tracking-wider text-clarity">Growth</h4>
                <p className="mt-1 text-[9px] leading-relaxed text-muted-2">From clarity<br />comes scale.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Assets */}
        <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
          <div className="col-span-3 flex h-64 flex-col bg-depth p-8">
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-vision">Brand Pattern</h3>
            <div className="relative flex-1 overflow-hidden opacity-40">
              <BrandPattern className="absolute inset-0 h-full w-full" />
            </div>
          </div>
          <div className="col-span-4 flex h-64 flex-col bg-depth p-8">
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-vision">Motion Language</h3>
            <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded border border-hairline bg-balance">
              <FlowStreakDemo />
            </div>
          </div>
          <div className="col-span-3 flex h-64 flex-col bg-depth p-8">
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-vision">Photography Style</h3>
            <div className="relative flex-1 overflow-hidden rounded border border-hairline bg-balance">
              <div className="absolute inset-0 bg-gradient-to-br from-vision/10 via-transparent to-transparent" />
              <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-depth to-transparent" />
              <div className="absolute bottom-0 left-1/2 h-full w-px bg-hairline" />
              <div className="absolute right-0 top-1/2 h-px w-full bg-hairline" />
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <StructureGlyph className="h-12 w-12" />
              </div>
            </div>
          </div>
          <div className="col-span-2 flex h-64 flex-col bg-depth p-8">
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-vision">Tone of Voice</h3>
            <div className="flex flex-col gap-3 text-xs text-muted-2">
              <p>Confident, not loud.</p>
              <p>Strategic, not generic.</p>
              <p>Sleek, not flashy.</p>
              <p>Human, not robotic.</p>
              <p>Focused on impact.</p>
            </div>
          </div>
        </div>

        {/* Row 5: Motion dynamics */}
        <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
          <div className="col-span-12 flex flex-col bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Motion Dynamics</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <PlotRevealDemo />
              <AxisDrawDemo />
              <CounterDemo />
              <GridEmergeDemo />
            </div>
          </div>
        </div>

        {/* Row 6: Spacing & surfaces */}
        <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
          <div className="col-span-5 flex flex-col bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Spacing Scale</h3>
            <div className="mt-2 flex flex-col gap-4">
              {[
                { label: "micro / 8px", w: "w-2" },
                { label: "element / 24px", w: "w-6" },
                { label: "block / 64px", w: "w-16" },
                { label: "section / clamp", w: "w-44" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-6">
                  <div className={`h-3 ${s.w} rounded-sm bg-intelligence/60`} />
                  <span className="text-[10px] uppercase tracking-widest text-faint">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-7 flex flex-col bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Architectural Surfaces</h3>
            <div className="group relative flex-1 rounded-lg border border-hairline bg-raised p-8 transition-transform duration-200 hover:-translate-y-0.5">
              <CornerTicks />
              <span className="text-[10px] uppercase tracking-widest text-muted-2">01 / Registration card</span>
              <h3 className="mt-4 text-xl font-medium text-clarity">Engineered depth</h3>
              <p className="mt-2 text-[10px] leading-relaxed text-muted-2 lg:text-xs">
                Hairline borders, corner ticks like an engineering drawing, depth
                from layering — not drop shadows. Hover to see the crosshair
                focus state highlight in growth-teal.
              </p>
            </div>
          </div>
        </div>

        {/* Row 7: Motion specs & components */}
        <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
          <div className="col-span-5 flex flex-col bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Motion Timing</h3>
            <div className="grid flex-1 gap-x-12 gap-y-2 rounded-lg border border-hairline bg-raised p-8">
              <div className="flex justify-between border-b border-hairline py-3">
                <span className="text-[10px] uppercase tracking-widest text-muted-2">micro</span>
                <span className="font-mono text-[10px] text-clarity">200 ms</span>
              </div>
              <div className="flex justify-between border-b border-hairline py-3">
                <span className="text-[10px] uppercase tracking-widest text-muted-2">standard</span>
                <span className="font-mono text-[10px] text-clarity">600 ms</span>
              </div>
              <div className="flex justify-between border-b border-hairline py-3">
                <span className="text-[10px] uppercase tracking-widest text-muted-2">choreography</span>
                <span className="font-mono text-[10px] text-clarity">1100 ms</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[10px] uppercase tracking-widest text-muted-2">precision ease</span>
                <span className="font-mono text-[10px] text-clarity">0.16, 1, 0.3, 1</span>
              </div>
            </div>
          </div>
          <div className="col-span-7 flex flex-col bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Interactive Components</h3>
            <div className="flex flex-1 flex-col items-start justify-center gap-8 rounded-lg border border-hairline bg-raised p-8">
              <p className="text-[10px] leading-relaxed text-muted-2 lg:text-xs">
                Buttons are tactile but restrained: the primary action is soft-white
                on dark — accents stay reserved for focus and meaning.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  className="cursor-pointer rounded-md bg-clarity px-6 py-3 text-sm font-medium text-depth transition-opacity duration-200 hover:opacity-90"
                >
                  Start a conversation
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-md border border-hairline-strong bg-balance px-6 py-3 text-sm font-medium text-clarity transition-colors duration-200 hover:border-clarity/30 hover:bg-depth"
                >
                  See our work
                </button>
                <button
                  type="button"
                  className="cursor-pointer px-2 py-3 text-xs font-medium uppercase tracking-widest text-muted-2 transition-colors duration-200 hover:text-clarity"
                >
                  Ghost / index →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
