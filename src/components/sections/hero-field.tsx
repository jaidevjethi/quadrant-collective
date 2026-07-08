"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The hero's ambient engineered field: a coordinate grid, a soft light behind
 * the mark, and a vignette. The grid and light parallax subtly with the cursor
 * so the space feels dimensional and alive, not a flat void. Depth layers move
 * at different rates. Static (no listener) under reduced motion. Cheap: one
 * passive pointermove throttled to rAF, updating two CSS variables that drive
 * GPU transforms.
 */
export function HeroField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 [--px:0] [--py:0]"
    >
      <div
        className="absolute inset-[-3%]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(230,230,230,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(230,230,230,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 68% 58% at 50% 44%, #000 6%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 68% 58% at 50% 44%, #000 6%, transparent 72%)",
          transform:
            "translate3d(calc(var(--px) * -16px), calc(var(--py) * -16px), 0)",
          transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="absolute left-1/2 top-[42%] h-[600px] w-[600px] rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.17), rgba(37,99,235,0.09) 44%, transparent 70%)",
          transform:
            "translate3d(calc(-50% + var(--px) * 34px), calc(-50% + var(--py) * 34px), 0)",
          transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--depth) 100%)",
        }}
      />
    </div>
  );
}
