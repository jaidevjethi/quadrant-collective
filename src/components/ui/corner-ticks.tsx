/**
 * The signature card detail (docs/BRAND.md, Surfaces): corner registration
 * marks like an engineering drawing. Place inside a `group relative` parent;
 * the ticks pick up the growth accent when the parent is hovered.
 */
export function CornerTicks() {
  const tick =
    "pointer-events-none absolute h-2.5 w-2.5 border-hairline-strong transition-colors duration-200 group-hover:border-growth";
  return (
    <>
      <span aria-hidden className={`${tick} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${tick} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${tick} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${tick} bottom-0 right-0 border-b border-r`} />
    </>
  );
}
