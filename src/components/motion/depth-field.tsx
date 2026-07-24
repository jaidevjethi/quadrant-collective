/**
 * The Depth Field: the environment you travel through.
 *
 * Three planes sit at real perspective depth. As the page scrolls they all
 * translate by the same distance, and perspective does the parallax for you:
 * a plane pushed further back projects that translation smaller, so the far
 * star dust drifts while the near coordinate grid sweeps past. That is true
 * dimensional depth, not layers moving at hand-tuned speeds.
 *
 * Replaces a canvas starfield that ran a permanent requestAnimationFrame loop
 * submitting up to 800 individual draw calls per frame, each allocating a
 * colour string, plus five full-canvas fills. This is a server component:
 * no client JavaScript at all, no rAF, and every plane animates only
 * `translate`, so the whole field lives on the compositor.
 *
 * See the .depth-* rules in src/app/motion.css.
 */
export function DepthField() {
  return (
    <div aria-hidden className="depth-field">
      <div className="depth-plane depth-plane--far" />
      <div className="depth-plane depth-plane--mid" />
      <div className="depth-plane depth-plane--near" />
      <div className="depth-vignette" />
    </div>
  );
}
