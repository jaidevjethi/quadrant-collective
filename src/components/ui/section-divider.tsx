/**
 * Editorial seam between homepage beats: a hairline with small registration
 * crosses at each end, like intersection marks on a technical drawing. Used
 * only between sections that share the depth plane; raised bands carry their
 * own border seams.
 */
export function SectionDivider() {
  const cross =
    "absolute top-1/2 h-[9px] w-[9px] -translate-y-1/2 text-hairline-strong";
  return (
    <div aria-hidden className="px-gutter">
      <div className="relative mx-auto h-px max-w-5xl bg-hairline">
        <svg viewBox="0 0 9 9" className={`${cross} left-0 -translate-x-1/2`}>
          <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg viewBox="0 0 9 9" className={`${cross} right-0 translate-x-1/2`}>
          <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
