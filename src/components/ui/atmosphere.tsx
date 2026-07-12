import Image from "next/image";

/**
 * One page, one atmosphere. Every route is a location in the same space
 * universe, announced by a single generated backdrop at its arrival point
 * (docs: the Atmosphere System, 2026-07-11). Renders an aria-hidden masked
 * image layer that sits behind the section's content and dissolves into the
 * page's black so the live starfield canvas takes over past the edge.
 *
 * Rules the system holds: image content is generated dark-first (text zones
 * near-black), no backdrop-blur ever, `priority` only for the page's own
 * above-the-fold atmosphere, and never more than one per page (the homepage
 * voyage, arrival + destination, is the sanctioned exception).
 *
 * REQUIRED on the parent section: `relative overflow-hidden isolate`.
 * `isolate` makes the section a stacking-context root so this -z-10 layer
 * paints above the section's own background (bg-raised etc.) but below all
 * content; without it, sections with a background swallow the image. Place
 * Atmosphere BEFORE IntroField in source so the coordinate grid draws above
 * the nebula: engineered lines over nature.
 */

type AtmosphereProps = {
  /** Path under /public, e.g. "/space/forge.jpg". */
  src: string;
  /** Which edge stays visible; the opposite edge fades to transparent. */
  edge?: "top" | "bottom";
  /** 0-100; tune per page so type always wins. */
  opacity?: 40 | 50 | 60 | 70 | 80 | 90;
  /** Set only when this atmosphere is above the fold on its own page. */
  priority?: boolean;
  /** Anchor the image crop; "bottom" suits horizon images. */
  position?: "center" | "bottom";
  /** "section" fills the parent; "viewport" caps to the first screen, for
   *  page-level parents (long mains) where only the arrival gets weather. */
  span?: "section" | "viewport";
};

const OPACITY: Record<NonNullable<AtmosphereProps["opacity"]>, string> = {
  40: "opacity-40",
  50: "opacity-50",
  60: "opacity-60",
  70: "opacity-70",
  80: "opacity-80",
  90: "opacity-90",
};

export function Atmosphere({
  src,
  edge = "top",
  opacity = 70,
  priority = false,
  position = "center",
  span = "section",
}: AtmosphereProps) {
  const mask =
    edge === "top"
      ? "[mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
      : "[mask-image:linear-gradient(to_top,black_60%,transparent_100%)]";
  const area =
    span === "viewport" ? "inset-x-0 top-0 h-[100svh]" : "inset-0";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${area} -z-10 ${mask}`}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className={`object-cover ${position === "bottom" ? "object-bottom" : ""} ${OPACITY[opacity]}`}
      />
    </div>
  );
}
