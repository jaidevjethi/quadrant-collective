/**
 * The environment: a lightweight colour wash that gives each context its own
 * feel. Replaces the old cosmic image backdrops (retired 2026-07-24): the live
 * starfield still carries the depth, so this layer only adds meaning, a single
 * radial gradient in the context's persona or discipline colour, arriving from
 * one edge and dissolving into the page's black. Pure CSS, no image bytes.
 *
 * Case pages pass the case persona accent (each case its own world); other
 * pages pass a discipline colour that fits their role. Keep `strength` low so
 * type always wins.
 *
 * REQUIRED on the parent section: `relative overflow-hidden isolate`. `isolate`
 * makes the section a stacking-context root so this -z-10 layer paints above the
 * section's own background but below all content.
 */

type AtmosphereProps = {
  /** Hex colour of the wash: a discipline token, or a case persona accent. */
  accent: string;
  /** Which edge the wash arrives from; it fades toward the opposite edge. */
  edge?: "top" | "bottom";
  /** 0-1 peak opacity of the colour. Keep low. */
  strength?: number;
  /** "section" fills the parent; "viewport" caps to the first screen, for
   *  page-level parents (long mains) where only the arrival gets weather. */
  span?: "section" | "viewport";
};

/** Hex (#rrggbb) to rgba() at the given alpha. */
function wash(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function Atmosphere({
  accent,
  edge = "top",
  strength = 0.16,
  span = "section",
}: AtmosphereProps) {
  const area =
    span === "viewport" ? "inset-x-0 top-0 h-[100svh]" : "inset-0";
  const at = edge === "top" ? "50% -8%" : "50% 108%";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${area} -z-10`}
      style={{
        background: `radial-gradient(ellipse 115% 62% at ${at}, ${wash(accent, strength)}, transparent 70%)`,
      }}
    />
  );
}
