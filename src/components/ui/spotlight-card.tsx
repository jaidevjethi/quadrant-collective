"use client";

import React, { useRef, useState, useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  as?: React.ElementType;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(230, 230, 230, 0.15)",
  as: Tag = "div",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current || prefersReducedMotion()) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Tag
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-lg border border-hairline bg-raised/40 backdrop-blur-md transition-colors hover:border-hairline-strong ${className}`}
      {...props}
    >
      {isMounted && !prefersReducedMotion() && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}
      {/* Content wrapper to ensure z-index stays above spotlight gradient */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </Tag>
  );
}
