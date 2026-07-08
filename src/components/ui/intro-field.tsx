/**
 * A whisper of the hero's coordinate field for page intros (About, Contact):
 * the same engineered space, at ambient volume. Static CSS only; place inside
 * a `relative overflow-hidden` parent.
 */
export function IntroField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(230,230,230,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(230,230,230,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(ellipse 70% 90% at 40% 20%, #000 8%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 90% at 40% 20%, #000 8%, transparent 70%)",
      }}
    />
  );
}
