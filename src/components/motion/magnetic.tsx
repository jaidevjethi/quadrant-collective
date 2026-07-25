"use client";

import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

/**
 * The element leans toward the pointer.
 *
 * Uses the `translate` property with a CSS transition rather than a GSAP
 * quickTo. The handler only writes a style value; the easing and the frame
 * loop are the browser's, and `translate` is composited, so this costs
 * nothing measurable and removes a GSAP dependency from the hero. Writing
 * `translate` rather than `transform` also leaves any transform on the child
 * untouched. Desktop only, and never under reduced motion.
 */
export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    el.style.transition = "translate var(--dur-standard) var(--ease-precision)";

    const handleMouseMove = (e: MouseEvent) => {
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) * strength;
      const y = (e.clientY - (top + height / 2)) * strength;
      el.style.translate = `${x}px ${y}px`;
    };

    const handleMouseLeave = () => {
      el.style.translate = "0px 0px";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.style.transition = "";
      el.style.translate = "";
    };
  }, [strength]);

  return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    ref,
    "data-magnetic": "true",
  });
}
