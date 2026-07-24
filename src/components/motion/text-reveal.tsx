import React from "react";

interface TextRevealProps {
  children: string;
  as?: React.ElementType;
  className?: string;
}

/**
 * The headline entrance: words settle upward into place on load.
 *
 * Deliberately transform-only, with opacity never touched. This runs on the
 * H1, which is the LCP element on most routes, and Chrome ignores any element
 * at opacity 0 when choosing an LCP candidate. Animating the transform alone
 * means the headline paints at first paint and still moves.
 *
 * The previous version set each word to opacity 0 with an 8px blur and
 * animated back over 1.2s. That measured 4316ms LCP on desktop and 4912ms on
 * a throttled mobile profile, against a 2500ms "good" threshold, and `filter`
 * forced an uncomposited repaint every frame. No JS now: the cascade is a
 * time-based CSS animation, where animation-delay is the right tool.
 */
export function TextReveal({
  children,
  as: Tag = "span",
  className,
}: TextRevealProps) {
  return (
    <Tag className={className}>
      {children.split(" ").map((word, i) => (
        <span key={i} className="inline-block whitespace-pre">
          <span
            className="tr-word inline-block"
            style={{ "--tr-i": i } as React.CSSProperties}
          >
            {word}
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}
