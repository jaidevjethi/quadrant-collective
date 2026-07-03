/**
 * The board's tagline lockup: discipline list over the brand promise,
 * separated by a gradient hairline. "One impact." takes the growth accent.
 */
export function BrandTagline({ className }: { className?: string }) {
  return (
    <div className={`flex items-stretch gap-4 ${className ?? ""}`}>
      <span
        aria-hidden
        className="w-px shrink-0 bg-gradient-to-b from-vision via-intelligence to-growth"
      />
      <div className="flex flex-col justify-center gap-1.5">
        <span className="label-mono text-clarity">
          Strategy. Design. Technology. Growth.
        </span>
        <span className="label-mono text-muted-2">
          Four disciplines. <span className="text-growth">One impact.</span>
        </span>
      </div>
    </div>
  );
}
