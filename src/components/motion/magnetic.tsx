"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/motion";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: DURATION.standard, ease: EASE.precision });
    const yTo = gsap.quickTo(element, "y", { duration: DURATION.standard, ease: EASE.precision });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    ref,
    "data-magnetic": "true",
  });
}
