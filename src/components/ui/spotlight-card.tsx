"use client";

import React, { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  as?: React.ElementType;
  /** Adds a subtle hover lift. Reserve for cards that navigate somewhere. */
  lift?: boolean;
}

/**
 * A card whose highlight follows the pointer.
 *
 * Pointer position is written straight to CSS custom properties on the element.
 * This used to sit in React state, which re-rendered the whole card subtree on
 * every mousemove; now the handler touches only the style attribute, so the
 * effect never enters the React render path and costs nothing measurable.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(230, 230, 230, 0.15)",
  as: Tag = "div",
  lift = false,
  style,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const div = divRef.current;
    if (!div || prefersReducedMotion()) return;
    const rect = div.getBoundingClientRect();
    div.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    div.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    const div = divRef.current;
    if (!div || prefersReducedMotion()) return;
    div.style.setProperty("--spot-opacity", "1");
  };

  const handleMouseLeave = () => {
    divRef.current?.style.setProperty("--spot-opacity", "0");
  };

  return (
    <Tag
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          ...style,
          "--spot-x": "50%",
          "--spot-y": "50%",
          "--spot-opacity": "0",
        } as React.CSSProperties
      }
      className={`group relative overflow-hidden rounded-lg border border-hairline bg-raised/40 backdrop-blur-md transition-[border-color,transform] duration-300 ease-[var(--ease-precision)] hover:border-hairline-strong ${lift ? "hover:-translate-y-1" : ""} ${className}`}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: "var(--spot-opacity)",
          background: `radial-gradient(600px circle at var(--spot-x) var(--spot-y), ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Content wrapper to ensure z-index stays above spotlight gradient */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </Tag>
  );
}
