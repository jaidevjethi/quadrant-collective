"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

interface VelocitySkewProps {
  children: React.ReactNode;
  className?: string;
}

export function VelocitySkew({ children, className }: VelocitySkewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    
    // We import lenis from a global store or we can just use gsap scrollTrigger velocity
    const ctx = gsap.context(() => {
      // Create a quickTo for performance
      const skewSetter = gsap.quickTo(ref.current, "skewY", { duration: 0.5, ease: "power3" });
      
      let lastScroll = window.scrollY;
      let lastTime = Date.now();
      
      const onScroll = () => {
        const now = Date.now();
        const dt = now - lastTime || 1; // avoid divide by zero
        const currentScroll = window.scrollY;
        
        // Calculate velocity (pixels per ms)
        const v = (currentScroll - lastScroll) / dt;
        
        // Clamp velocity to a reasonable visual skew (max 5 degrees)
        const clampedSkew = Math.max(Math.min(v * -2, 5), -5);
        
        skewSetter(clampedSkew);
        
        lastScroll = currentScroll;
        lastTime = now;
        
        // Return to 0 when scrolling stops
        if (v !== 0) {
          gsap.to(ref.current, { skewY: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ transformOrigin: "center center" }}>
      {children}
    </div>
  );
}
