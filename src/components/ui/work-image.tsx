import Image from "next/image";

/**
 * Client work presented as a specimen, not a raw screenshot. A bright website
 * capture dropped straight onto the dark site is the loudest, least-designed
 * object on the page; this gives every work image one mount: an inset hairline
 * so white edges never hard-cut against the card.
 *
 * `interactive` (teaser cards on /work and Proof): the plate rests slightly
 * dimmed and wakes to full brightness on card hover, so it belongs to the dark
 * world until you reach for it. Requires a `group` ancestor (SpotlightCard).
 * Without it (the case-study gallery), the work shows at full brightness,
 * because there the visitor came to see it.
 */

type WorkImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** object-contain on a padded frame, for mobile/square/dense captures. */
  contain?: boolean;
  /** Dim-at-rest, wake-on-hover. Only for cards inside a `group` parent. */
  interactive?: boolean;
  /** Aspect ratio / border utilities for the frame. */
  className?: string;
  /** Overlays that sit above the plate, e.g. a kind badge. */
  children?: React.ReactNode;
};

export function WorkImage({
  src,
  alt,
  sizes,
  priority = false,
  contain = false,
  interactive = false,
  className,
  children,
}: WorkImageProps) {
  const fit = contain ? "object-contain p-3" : "object-cover object-top";
  const wake = interactive
    ? "brightness-90 transition-[transform,filter] duration-700 ease-[var(--ease-precision)] group-hover:scale-[1.03] group-hover:brightness-100"
    : "";

  return (
    <div className={`relative overflow-hidden bg-depth ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${fit} ${wake}`}
      />
      {/* The mount: an inner hairline that frames the plate. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] shadow-[inset_0_0_0_1px_rgba(230,230,230,0.09)]"
      />
      {children}
    </div>
  );
}
