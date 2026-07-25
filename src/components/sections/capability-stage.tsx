"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { getLenis } from "@/components/providers/lenis-provider";
import { CSS_EASE, MS, prefersReducedMotion } from "@/lib/motion";
import {
  capabilityNodes,
  disciplines,
  getNode,
  type CapabilityNode,
  type CapabilityNodeId,
  type DisciplineId,
} from "@/lib/capabilities";
import { CapabilityStory } from "./capability-story";


/**
 * Beat 3 — the capability system drawn as the brand mark itself. The four
 * discipline arcs of the Quadrant "Q" (docs/BRAND.md logo geometry) become
 * the stage; the eight capabilities orbit their discipline's arc as buttons.
 * On scroll the Q assembles (arcs draw, chips fly out from the center);
 * hovering a capability lights its arc; clicking crossfades the ring out and
 * the story in, inside a fixed frame so nothing jumps. Reduced-motion / no-JS
 * render the resolved mark and stories (zero CLS, fully crawlable).
 */

// Geometry in a square 720 viewBox, mirroring the logo's four-arc ring.
const VB = 720;
const C = 360;
const RING_R = 184;
const BAND = 52;
const CHIP_R = 282;
const GAP = 7; // degrees cut at each cardinal point, like the logo's gaps

const rad = (d: number) => (d * Math.PI) / 180;
const ptOn = (deg: number, r: number): [number, number] => [
  C + r * Math.cos(rad(deg)),
  C + r * Math.sin(rad(deg)),
];
const arcPath = (d1: number, d2: number, r = RING_R) => {
  const [x1, y1] = ptOn(d1, r);
  const [x2, y2] = ptOn(d2, r);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};

// Each discipline owns one 90-degree arc, coloured and placed as in the mark.
const ARCS: { id: DisciplineId; d: string }[] = [
  { id: "strategy", d: arcPath(180 + GAP, 270 - GAP) },
  { id: "design", d: arcPath(270 + GAP, 360 - GAP) },
  { id: "growth", d: arcPath(0 + GAP, 90 - GAP) },
  { id: "technology", d: arcPath(90 + GAP, 180 - GAP) },
];

// Midpoint angle of each discipline's arc; the two chips sit either side of it.
const SECTOR_MID: Record<DisciplineId, number> = {
  strategy: 225,
  design: 315,
  growth: 45,
  technology: 135,
};
const CHIP_SPREAD = 24;

type Placed = {
  node: CapabilityNode;
  x: number;
  y: number;
  flyx: number;
  flyy: number;
};

const LAYOUT: Placed[] = (() => {
  const byDisc = new Map<DisciplineId, CapabilityNode[]>();
  for (const n of capabilityNodes) {
    const arr = byDisc.get(n.discipline) ?? [];
    arr.push(n);
    byDisc.set(n.discipline, arr);
  }
  return capabilityNodes.map((n) => {
    const peers = byDisc.get(n.discipline)!;
    const i = peers.indexOf(n);
    const angle = SECTOR_MID[n.discipline] + (i === 0 ? -CHIP_SPREAD : CHIP_SPREAD);
    const [x, y] = ptOn(angle, CHIP_R);
    return { node: n, x, y, flyx: C - x, flyy: C - y };
  });
})();

// Discipline labels inside the ring, one per quadrant.
const LABELS = (Object.keys(SECTOR_MID) as DisciplineId[]).map((id) => {
  const [x, y] = ptOn(SECTOR_MID[id], 96);
  return { id, x, y };
});

const CENTER_PCT = (v: number) => `${(v / VB) * 100}%`;

/** Nav clearance in px; matches the stage's scroll-mt-20 (5rem). */
const NAV_OFFSET = -80;

/** Scroll the stage under the nav via Lenis (native scrollIntoView fights
 *  its lerp loop); falls back to native when Lenis is off (reduced motion). */
function scrollStageIntoView(stage: HTMLElement | null, immediate: boolean) {
  if (!stage) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(stage, { offset: NAV_OFFSET, immediate });
  } else {
    stage.scrollIntoView({ block: "start" });
  }
}

export function CapabilityStage({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const deepLinkedRef = useRef(false);
  const firstWrite = useRef(true);
  const [expanded, setExpanded] = useState<CapabilityNodeId | null>(null);
  const [hovered, setHovered] = useState<CapabilityNodeId | null>(null);

  // Which discipline's arc is lit: the hovered chip's, else the open node's.
  const activeDisc: DisciplineId | null = hovered
    ? getNode(hovered).discipline
    : expanded
      ? getNode(expanded).discipline
      : null;

  const focusChip = useCallback((id: CapabilityNodeId) => {
    const candidates = [chipRefs.current[`${id}-d`], chipRefs.current[`${id}-m`]];
    candidates.find((el) => el && el.offsetParent !== null)?.focus();
  }, []);

  // Close mirrors the open's care: the panel eases out, then the swap, then
  // the Q fades back in (effect below). A ref guards double-Escape mid-fade.
  const closingRef = useRef(false);
  const close = useCallback(() => {
    if (closingRef.current) return;
    const finish = () => {
      closingRef.current = false;
      setExpanded((current) => {
        if (current) requestAnimationFrame(() => focusChip(current));
        return null;
      });
    };

    const panel = stageRef.current?.querySelector<HTMLElement>(
      ".capability-story[data-active] .cap-story-inner",
    );
    if (!panel || prefersReducedMotion()) {
      finish();
      return;
    }
    closingRef.current = true;
    const out = panel.animate(
      [
        { opacity: 1, translate: "0 0" },
        { opacity: 0, translate: "0 8px" },
      ],
      { duration: 250, easing: CSS_EASE.precision, fill: "forwards" },
    );
    out.onfinish = () => {
      // cancel() drops the fill, which is what clearProps did before.
      out.cancel();
      finish();
    };
  }, [focusChip]);

  const toggle = useCallback((id: CapabilityNodeId) => {
    setExpanded((current) => (current === id ? null : id));
  }, []);

  const jump = useCallback((id: CapabilityNodeId) => setExpanded(id), []);

  // Move focus into the opened story and glide the panel top just below the
  // sticky nav, so the header is never tucked behind it; keep triggers honest
  // after the in-flow swap. The deep-link mount handles its own scroll (it
  // must wait out initial layout), so it is skipped here.
  useEffect(() => {
    if (expanded) {
      headingRef.current?.focus({ preventScroll: true });
      if (!deepLinkedRef.current) {
        requestAnimationFrame(() => scrollStageIntoView(stageRef.current, false));
      }
    }
  }, [expanded]);

  // Escape closes while a story is open.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, close]);

  // Deep link: open #capabilities/<id> on load and land on it instantly.
  // The scroll waits out first paint and the LenisProvider's 150ms mount
  // refresh (fonts/images shift layout under an immediate scroll), then
  // refreshes triggers itself and jumps. Scroll restoration goes manual for
  // matched links only, so the browser's own restore (which fires after
  // load) cannot override the deliberate landing. The flag also skips the
  // scatter entrance; it is released afterwards so later clicks glide.
  useEffect(() => {
    const parseHash = (): CapabilityNodeId | null => {
      const match = window.location.hash.match(/^#capabilities\/([a-z-]+)$/);
      const id = match?.[1];
      return id && capabilityNodes.some((n) => n.id === id)
        ? (id as CapabilityNodeId)
        : null;
    };

    let timer: ReturnType<typeof setTimeout> | undefined;
    const initial = parseHash();
    if (initial) {
      window.history.scrollRestoration = "manual";
      deepLinkedRef.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpanded(initial);
      timer = setTimeout(() => {
        scrollStageIntoView(stageRef.current, true);
        deepLinkedRef.current = false;
      }, 250);
    }

    // Same-document hash navigation (a link to #capabilities/<id> from the
    // live page) opens the node too; the open effect handles the glide.
    const onHashChange = () => {
      const id = parseHash();
      if (id) setExpanded(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  // Reflect the open node in the URL (replaceState, skip the mount write).
  useEffect(() => {
    if (firstWrite.current) {
      firstWrite.current = false;
      return;
    }
    const base = window.location.pathname + window.location.search;
    window.history.replaceState(
      null,
      "",
      expanded ? `${base}#capabilities/${expanded}` : `${base}#capabilities`,
    );
  }, [expanded]);

  // Entrance: the Q assembles one discipline at a time, so every visitor
  // (touch included, where the hover arc-light never fires) sees each colour
  // claim its own capabilities. Reading order TL, TR, BL, BR; growth last so
  // the Q tail welds at the end. Skipped on reduced motion / deep link.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion() || deepLinkedRef.current) return;

    const svg = stage.querySelector<SVGSVGElement>(".cap-ring");
    const chips = Array.from(stage.querySelectorAll<HTMLElement>(".cap-chip-d"));
    if (!svg || chips.length === 0) return;

    const arcs = svg.querySelectorAll<SVGPathElement>(".cap-arc");
    const cross = svg.querySelectorAll<SVGPathElement>(".cap-cross");
    const tail = svg.querySelector<SVGPathElement>(".cap-tail");
    const dot = svg.querySelector<SVGCircleElement>(".cap-center");
    const labels = svg.querySelectorAll<SVGTextElement>(".cap-label");

    // Chips live in the square ring box, so px-per-viewBox-unit is measured
    // from the SVG, not the full-width stage.
    const scale = svg.getBoundingClientRect().width / VB;
    const ORDER: DisciplineId[] = ["strategy", "design", "technology", "growth"];

    if (!("IntersectionObserver" in window)) return;

    const strokes: SVGPathElement[] = [
      ...Array.from(arcs),
      ...Array.from(cross),
      ...(tail ? [tail] : []),
    ];

    // The markup renders resolved, so the hidden state is only applied once we
    // know the entrance is going to play.
    const setInitial = () => {
      strokes.forEach((p) => {
        p.style.strokeDasharray = "1";
        p.style.strokeDashoffset = "1";
      });
      if (dot) {
        dot.style.transformBox = "fill-box";
        dot.style.transformOrigin = "50% 50%";
        dot.style.scale = "0";
      }
      labels.forEach((l) => (l.style.opacity = "0"));
      chips.forEach((chip) => {
        chip.style.translate = `${Number(chip.dataset.flyx) * scale}px ${Number(chip.dataset.flyy) * scale}px`;
        chip.style.scale = "0.4";
        chip.style.opacity = "0";
      });
    };

    const clearInitial = () => {
      strokes.forEach((p) => {
        p.style.strokeDasharray = "";
        p.style.strokeDashoffset = "";
      });
      if (dot) {
        dot.style.scale = "";
        dot.style.transformBox = "";
        dot.style.transformOrigin = "";
      }
      labels.forEach((l) => (l.style.opacity = ""));
      chips.forEach((chip) => {
        chip.style.translate = "";
        chip.style.scale = "";
        chip.style.opacity = "";
      });
    };

    const anims: Animation[] = [];
    const run = (
      el: Element,
      frames: Keyframe[],
      opts: KeyframeAnimationOptions,
    ) => {
      anims.push(el.animate(frames, { fill: "both", ...opts }));
    };

    const play = () => {
      const STD = MS.standard;

      // The axes divide the plane into quadrants first.
      cross.forEach((c) =>
        run(c, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
          duration: STD,
          easing: CSS_EASE.precision,
        }),
      );

      // Then each discipline: its arc draws, its two capabilities settle onto
      // it, its label appears. The grouping is the whole point, so it is paced
      // to be read, not blurred past.
      ORDER.forEach((disc, i) => {
        const start = 400 + i * 520;
        const arc = svg.querySelector<SVGPathElement>(
          `.cap-arc[data-disc="${disc}"]`,
        );
        const label = svg.querySelector<SVGTextElement>(
          `.cap-label[data-disc="${disc}"]`,
        );
        const discChips = chips.filter((c) => c.dataset.disc === disc);

        if (arc) {
          run(arc, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
            duration: STD,
            delay: start,
            easing: CSS_EASE.precision,
          });
        }

        discChips.forEach((chip, j) => {
          run(
            chip,
            [
              {
                translate: `${Number(chip.dataset.flyx) * scale}px ${Number(chip.dataset.flyy) * scale}px`,
                scale: "0.4",
                opacity: 0,
              },
              { translate: "0px 0px", scale: "1", opacity: 1 },
            ],
            {
              duration: STD,
              delay: start + 250 + j * 80,
              easing: CSS_EASE.weighted,
            },
          );
        });

        if (label) {
          run(label, [{ opacity: 0 }, { opacity: 1 }], {
            duration: 400,
            delay: start + 520,
            easing: CSS_EASE.precision,
          });
        }

        if (disc === "growth" && tail) {
          run(tail, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
            duration: 350,
            delay: start + 560,
            easing: CSS_EASE.precision,
          });
        }
      });

      if (dot) {
        run(dot, [{ scale: "0" }, { scale: "1" }], {
          duration: 400,
          delay: 2660,
          easing: CSS_EASE.precision,
        });
      }

      // Once the sequence ends, drop both the fills and the inline hidden
      // state so hover and active styling take over cleanly.
      Promise.all(anims.map((a) => a.finished.catch(() => undefined))).then(
        () => {
          anims.forEach((a) => a.cancel());
          clearInitial();
        },
      );
    };

    setInitial();

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        play();
      },
      { rootMargin: "0px 0px -28% 0px" },
    );
    io.observe(stage);

    return () => {
      io.disconnect();
      anims.forEach((a) => a.cancel());
      clearInitial();
    };
  }, []);

  // A short rise-in on the opening story; when a story closes, the returning
  // Q fades back in rather than snapping (opacity only, display is CSS).
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      wasOpenRef.current = Boolean(expanded);
      return;
    }
    if (expanded) {
      const panel = stageRef.current?.querySelector(`#story-${expanded} .cap-story-inner`);
      if (panel) {
        panel.animate(
          [
            { opacity: 0, translate: "0 10px" },
            { opacity: 1, translate: "0 0" },
          ],
          { duration: MS.standard, easing: CSS_EASE.precision },
        );
      }
    } else if (wasOpenRef.current) {
      const layer = stageRef.current?.querySelector(".cap-ring-layer");
      if (layer) {
        layer.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: MS.standard,
          easing: CSS_EASE.precision,
        });
      }
    }
    wasOpenRef.current = Boolean(expanded);
  }, [expanded]);

  const chipClass =
    "cap-chip flex items-center gap-1.5 md:gap-2 whitespace-nowrap rounded-md border bg-[#14171d] px-2.5 py-1.5 md:px-3 md:py-2 text-xs md:text-sm font-medium text-clarity outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-clarity";

  const arcOpacity = (id: DisciplineId) =>
    activeDisc && activeDisc !== id ? 0.32 : 1;

  return (
    <div
      ref={stageRef}
      data-open={expanded ? "" : undefined}
      className={`cap-stage relative scroll-mt-20 ${className ?? ""}`}
    >
      {/* The Q mark at every breakpoint. On phones the ring is narrowed so the
          orbiting chip labels stay inside the viewport. Hidden when a story opens. */}
      <div className="cap-ring-layer flex flex-col items-center gap-6">
        {/* Affordance: the only reliable cue on touch, where there is no hover. */}
        <p className="label-mono flex items-center gap-2 text-muted-2">
          <span
            aria-hidden
            className="size-1.5 animate-pulse rounded-full bg-clarity"
          />
          Select any capability to see how we think
        </p>
        <div className="relative aspect-square w-[82%] max-w-[520px] sm:w-full">
          <svg className="cap-ring absolute inset-0 h-full w-full" viewBox={`0 0 ${VB} ${VB}`} aria-hidden="true">
            <path className="cap-cross" pathLength={1} d={`M${C} 70 V${VB - 70}`} stroke="rgba(230,230,230,0.14)" strokeWidth={1} fill="none" />
            <path className="cap-cross" pathLength={1} d={`M70 ${C} H${VB - 70}`} stroke="rgba(230,230,230,0.14)" strokeWidth={1} fill="none" />

            {ARCS.map((a) => (
              <path
                key={a.id}
                className="cap-arc"
                data-disc={a.id}
                pathLength={1}
                d={a.d}
                stroke={disciplines[a.id].color}
                strokeWidth={BAND}
                strokeLinecap="butt"
                fill="none"
                opacity={arcOpacity(a.id)}
                style={{ transition: "opacity 0.3s var(--ease-precision)" }}
              />
            ))}

            {/* Q tail: welds out of the growth arc at 45 degrees */}
            <path
              className="cap-tail"
              pathLength={1}
              d={`M${ptOn(45, RING_R)[0].toFixed(2)} ${ptOn(45, RING_R)[1].toFixed(2)} L${ptOn(45, RING_R + BAND)[0].toFixed(2)} ${ptOn(45, RING_R + BAND)[1].toFixed(2)}`}
              stroke={disciplines.growth.color}
              strokeWidth={BAND}
              strokeLinecap="butt"
              fill="none"
              opacity={arcOpacity("growth")}
              style={{ transition: "opacity 0.3s var(--ease-precision)" }}
            />

            {LABELS.map((l) => (
              <text
                key={l.id}
                className="cap-label"
                data-disc={l.id}
                x={l.x}
                y={l.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={disciplines[l.id].color}
                opacity={arcOpacity(l.id)}
                style={{ fontSize: 12, fontFamily: "var(--font-geist-mono)", fontWeight: 500, letterSpacing: "0.14em", transition: "opacity 0.3s var(--ease-precision)" }}
              >
                {disciplines[l.id].label}
              </text>
            ))}

            <circle className="cap-center" cx={C} cy={C} r={4} fill="#e6e6e6" opacity={0.9} />
          </svg>

          {LAYOUT.map(({ node, x, y, flyx, flyy }) => (
            <div
              key={node.id}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: CENTER_PCT(x), top: CENTER_PCT(y) }}
            >
              <button
                type="button"
                ref={(el) => { chipRefs.current[`${node.id}-d`] = el; }}
                onClick={() => toggle(node.id)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                aria-expanded={expanded === node.id}
                aria-controls={`story-${node.id}`}
                data-disc={node.discipline}
                data-flyx={flyx}
                data-flyy={flyy}
                className={`cap-chip-d group/chip pointer-events-auto ${chipClass} ${expanded === node.id ? "border-clarity" : "border-hairline hover:border-hairline-strong"}`}
              >
                <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: disciplines[node.discipline].color }} />
                {node.label}
                <Plus
                  aria-hidden
                  className="size-3 shrink-0 text-faint transition-colors duration-200 group-hover/chip:text-clarity"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Story region: every story in the DOM (crawlable); the active one is
          shown in flow, replacing the ring, at every breakpoint. */}
      <noscript>
        <style>{`.cap-story-overlay,.capability-story{display:block !important;opacity:1 !important;position:static !important}`}</style>
      </noscript>
      <div className="cap-story-overlay">
        {capabilityNodes.map((n) => (
          <div
            key={n.id}
            id={`story-${n.id}`}
            role="region"
            aria-labelledby={`heading-${n.id}`}
            data-active={expanded === n.id ? "true" : undefined}
            className="capability-story group overflow-hidden rounded-lg border border-hairline bg-balance shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)]"
          >
            <div className="cap-story-inner">
              <CapabilityStory
                node={n}
                onClose={close}
                onJump={jump}
                ref={expanded === n.id ? headingRef : undefined}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
