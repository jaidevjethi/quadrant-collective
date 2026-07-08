"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A highly performant, pure canvas starfield that creates the illusion of 
 * deep space travel and 'discovering' the agency. Built for 60fps even on mobile.
 * Features scroll-responsive warp speed using GSAP.
 */
export function DeepSpaceBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const STAR_COUNT = Math.floor((width * height) / 2000); // Responsive star density
    const stars: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
      });
    }

    let animationFrameId: number;
    let currentSpeed = 1.5;
    const baseSpeed = 1.5;

    // Scroll velocity tracking
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        // Map velocity to speed, capping it so it doesn't break
        const targetSpeed = baseSpeed + Math.min(velocity / 100, 30);
        currentSpeed = targetSpeed;
      },
    });

    const render = () => {
      // Clear with solid depth color (from our design tokens)
      ctx.fillStyle = "#0A0A0A"; 
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Smoothly interpolate speed back to base
      currentSpeed += (baseSpeed - currentSpeed) * 0.05;

      for (let i = 0; i < STAR_COUNT; i++) {
        const star = stars[i];

        // Move star closer (warp effect)
        star.z -= currentSpeed;

        // Reset if it passes the camera
        if (star.z <= 0) {
          star.x = Math.random() * width - cx;
          star.y = Math.random() * height - cy;
          star.z = width;
        }

        // 3D to 2D projection
        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        // Only draw if within bounds
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = star.size * k;
          
          // Stretching effect based on speed
          const stretch = currentSpeed > baseSpeed * 2 ? currentSpeed * 0.5 : 0;
          
          const intensity = Math.min(255, Math.floor((255 * 200) / star.z));
          ctx.fillStyle = `rgba(${intensity}, ${intensity}, ${intensity + 20}, ${star.alpha})`;
          
          ctx.beginPath();
          if (stretch > 0) {
            // Draw a streak if moving fast
            const pxOld = star.x * (128.0 / (star.z + currentSpeed * 2)) + cx;
            const pyOld = star.y * (128.0 / (star.z + currentSpeed * 2)) + cy;
            ctx.moveTo(px, py);
            ctx.lineTo(pxOld, pyOld);
            ctx.lineWidth = size;
            ctx.strokeStyle = ctx.fillStyle;
            ctx.stroke();
          } else {
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      st.kill();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-depth">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-hidden="true"
      />
      {/* Radial gradient overlay to blend edges into the black background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0A0A0A_100%)] pointer-events-none" />
    </div>
  );
}
