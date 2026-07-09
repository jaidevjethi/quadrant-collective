"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, prefersReducedMotion } from "@/lib/motion";

interface VelocitySkewProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Skews children with scroll velocity. Reads velocity from ScrollTrigger,
 * which Lenis keeps updated, so the skew tracks the smoothed scroll instead
 * of raw wheel input. Pointer-fine only: on touch the content stays still.
 */
export function VelocitySkew({ children, className }: VelocitySkewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const element = ref.current;
    if (!element) return;

    const skewSetter = gsap.quickSetter(element, "skewY", "deg");
    const clampSkew = gsap.utils.clamp(-5, 5);
    const proxy = { skew: 0 };

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clampSkew(self.getVelocity() / -400);
        // Only restart the settle tween when the new impulse is stronger
        // than whatever is still easing back to zero.
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.6,
            ease: EASE.precision,
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(proxy);
      skewSetter(0);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ transformOrigin: "center center" }}>
      {children}
    </div>
  );
}
