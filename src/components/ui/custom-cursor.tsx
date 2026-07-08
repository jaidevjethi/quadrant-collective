"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize if not on a touch device and not reduced motion
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Use quickTo for zero-latency tracking
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    // The ring trails slightly behind for a fluid feel
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    // Make the cursor grow on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-magnetic]")
      ) {
        gsap.to(cursor, { scale: 0.5, duration: 0.3, ease: "power3.out" });
        gsap.to(ring, { scale: 1.5, opacity: 0.2, duration: 0.3, ease: "power3.out" });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power3.out" });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    // Fade in cursor when it first enters window
    gsap.to([cursor, ring], { autoAlpha: 1, duration: 0.5 });

    // Ensure body doesn't show default cursor on hover capable devices
    document.body.classList.add("cursor-none");
    const style = document.createElement('style');
    style.innerHTML = `
      @media (pointer: fine) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("cursor-none");
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden sm:block">
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        className="invisible absolute left-0 top-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-clarity/50"
      />
      {/* Inner sharp dot */}
      <div
        ref={cursorRef}
        className="invisible absolute left-0 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clarity mix-blend-difference"
      />
    </div>
  );
}
