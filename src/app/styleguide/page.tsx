import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { LogoLockup } from "@/components/brand/logo-lockup";
import { AppIconTile } from "@/components/brand/app-icon-tile";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { BrandTagline } from "@/components/brand/brand-tagline";
import { Button } from "@/components/ui/button";
import { CornerTicks } from "@/components/ui/corner-ticks";
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
                We bring strategy, creativity, technology and growth marketing together in one system, so businesses don&apos;t just grow, they scale.
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
                <p>Four quadrants, four colors, one per discipline: Strategy, Design, Technology, Growth.</p>
                <p>The mark is the one exception to the Constitution&apos;s two-accent rule: a symbol shown once, not interface chrome.</p>
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

        {/* Row 3: Typography system (full width, three faces, one system) */}
        <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
          <div className="col-span-12 bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Typography System</h3>
            <div className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-3">
              <div className="flex flex-col bg-depth p-6">
                <div className="flex items-baseline justify-between">
                  <span className="label-mono text-muted-2">01 / Display</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-vision">Archivo Expanded</span>
                </div>
                <div className="flex flex-1 items-center py-8">
                  <span className="font-heading text-5xl font-medium tracking-tight text-clarity sm:text-6xl lg:text-7xl">
                    <span className="bg-gradient-to-r from-vision via-intelligence to-growth bg-clip-text text-transparent">Q</span>uadrant
                  </span>
                </div>
                <div className="flex items-center gap-4 border-t border-hairline pt-4">
                  <span className="font-heading text-lg font-extralight text-clarity">Aa</span>
                  <span className="font-heading text-lg font-normal text-clarity">Aa</span>
                  <span className="font-heading text-lg font-medium text-clarity">Aa</span>
                  <span className="font-heading text-lg font-bold text-clarity">Aa</span>
                  <span className="ml-auto text-[9px] uppercase tracking-widest text-faint">100-900 · wdth 125%</span>
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-muted-2">
                  Hero H1s and section titles, the same face that sets the
                  QUADRANT™ wordmark: one display voice. Never body text.
                  Google Fonts, OFL.
                </p>
              </div>
              <div className="flex flex-col bg-depth p-6">
                <div className="flex items-baseline justify-between">
                  <span className="label-mono text-muted-2">02 / Body &amp; UI</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-intelligence">Geist Sans</span>
                </div>
                <div className="flex flex-1 items-center py-8">
                  <span className="text-3xl font-medium leading-tight tracking-tight text-clarity lg:text-4xl">
                    Systems,<br />not services.
                  </span>
                </div>
                <div className="border-t border-hairline pt-4">
                  <p className="text-xs leading-relaxed text-muted-2">
                    Paragraphs, labels, components. Calm, precise, declarative.
                    Weights 400 / 500 / 600.
                  </p>
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-muted-2">
                  Vercel, OFL. Stands in for Aeonik (board reference, unlicensed).
                  See docs/BRAND.md.
                </p>
              </div>
              <div className="flex flex-col bg-depth p-6">
                <div className="flex items-baseline justify-between">
                  <span className="label-mono text-muted-2">03 / Instrument</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-growth">Geist Mono</span>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-3 py-8 font-mono text-sm tabular-nums text-clarity">
                  <div className="flex justify-between">
                    <span className="text-muted-2">QUADRANTS</span>
                    <span>4 × 90°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-2">RING RADIUS</span>
                    <span>r = 28 / 96</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-2">PERFORMANCE</span>
                    <span className="text-growth">95+</span>
                  </div>
                </div>
                <div className="border-t border-hairline pt-4">
                  <span className="label-mono text-muted-2">Micro-labels · coordinates · numbers</span>
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-muted-2">
                  Vercel, OFL. Same family as Geist Sans, one coherent system,
                  not two unrelated foundries.
                </p>
              </div>
            </div>
            <div className="group relative mt-6 rounded-lg border border-hairline bg-raised p-8">
              <CornerTicks />
              <span className="label-mono text-muted-2">Hero pattern · src/app/page.tsx</span>
              <div className="mt-4 flex flex-col items-start gap-2">
                <span className="label-mono text-muted-2">
                  Strategy. Design. Technology. Growth.
                </span>
                <span className="font-heading text-3xl font-medium tracking-tight text-clarity">
                  Four disciplines.
                </span>
                <span className="font-heading bg-gradient-to-r from-vision via-intelligence to-growth bg-clip-text text-base font-medium uppercase tracking-[0.34em] text-transparent">
                  One system
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3b: Color + Visual language */}
        <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
          <div className="col-span-6 bg-depth p-8">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Color Palette</h3>
            <div className="flex h-20 w-full overflow-hidden rounded-md border border-hairline">
              <div className="flex-1 bg-vision" />
              <div className="flex-1 bg-spark" />
              <div className="flex-1 bg-intelligence" />
              <div className="flex-1 bg-growth" />
              <div className="flex-1 bg-depth" />
              <div className="flex-1 bg-balance" />
              <div className="flex-1 bg-clarity" />
            </div>
            <div className="mt-4 flex w-full text-[9px] uppercase tracking-wider text-muted-2">
              <div className="flex-1">Vision<br />#7C3AED</div>
              <div className="flex-1">Spark<br />#D97706</div>
              <div className="flex-1">Intell<br />#2563EB</div>
              <div className="flex-1">Growth<br />#00D1B2</div>
              <div className="flex-1">Depth<br />#0D0F14</div>
              <div className="flex-1">Balance<br />#1A1D24</div>
              <div className="flex-1">Clarity<br />#E6E6E6</div>
            </div>
          </div>
          <div className="col-span-6 bg-depth p-8">
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
                from layering, not drop shadows. Hover to see the crosshair
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
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-vision">Components · Button</h3>
            <div className="group relative flex flex-1 flex-col rounded-lg border border-hairline bg-raised p-8">
              <CornerTicks />
              <p className="text-[10px] leading-relaxed text-muted-2 lg:text-xs">
                <code className="font-mono text-clarity">@/components/ui/button</code> is tactile
                but restrained: the primary action is soft-white on dark; accents
                stay reserved for focus and meaning.
              </p>
              <div className="mt-6 grid flex-1 gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-3">
                <div className="flex flex-col gap-5 bg-depth p-5">
                  <span className="label-mono text-muted-2">01 / Primary</span>
                  <div className="flex flex-1 items-center">
                    <Button size="lg" className="h-11 rounded-sm px-6">
                      Primary action
                    </Button>
                  </div>
                  <p className="text-[9px] leading-relaxed text-muted-2">
                    One per view. The single most important action.
                  </p>
                </div>
                <div className="flex flex-col gap-5 bg-depth p-5">
                  <span className="label-mono text-muted-2">02 / Outline · hero CTA</span>
                  <div className="flex flex-1 items-center">
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-11 gap-2 rounded-sm border-hairline-strong bg-transparent px-6 text-clarity hover:border-clarity hover:bg-raised"
                    >
                      <a href="#">
                        Start a conversation
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-[9px] leading-relaxed text-muted-2">
                    The hero CTA style (src/app/page.tsx).
                  </p>
                </div>
                <div className="flex flex-col gap-5 bg-depth p-5">
                  <span className="label-mono text-muted-2">03 / Ghost · tertiary</span>
                  <div className="flex flex-1 items-center">
                    <Button
                      variant="ghost"
                      className="h-11 px-2 text-xs font-medium uppercase tracking-widest text-muted-2 hover:bg-transparent hover:text-clarity"
                    >
                      Ghost / index →
                    </Button>
                  </div>
                  <p className="text-[9px] leading-relaxed text-muted-2">
                    Quiet navigation and index links.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
