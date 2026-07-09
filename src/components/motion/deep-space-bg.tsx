"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The Infinite System Background (Revised: Deep Flow).
 * Abandons the strict gamified grid in favor of a deeper, fluid data stream.
 * Points move forward or backward along the Z-axis dynamically based on scroll direction,
 * creating a true 'deep space' feel of traveling through the system.
 */
export function DeepSpaceBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Use more nodes but softer for a "dust / deep flow" feel
    const NODE_COUNT = Math.floor((width * height) / 2000); 
    const nodes: { x: number; y: number; z: number; size: number; alpha: number; color: string }[] = [];

    // The Quadrant Collective Colors
    const COLORS = [
      "124, 58, 237",   // Vision (Strategy)
      "217, 119, 6",    // Spark (Design)
      "37, 99, 235",    // Intelligence (Technology)
      "0, 209, 178"     // Growth
    ];

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width * 2 - width,
        y: Math.random() * height * 2 - height,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.2, // softer, varied sizes
        alpha: Math.random() * 0.6 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    let animationFrameId: number;
    const baseSpeed = 0.3; // Slower base drift
    let currentSpeed = baseSpeed;
    let scrollDirection = 1; // 1 for down (forward), -1 for up (backward)

    const st = reduced
      ? null
      : ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const targetSpeed = baseSpeed + Math.min(velocity / 60, 25);
            currentSpeed = targetSpeed;
            scrollDirection = self.direction; // 1 or -1
          },
        });

    const render = () => {
      ctx.fillStyle = "#0A0A0A"; 
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Extremely subtle, ethereal ambient glows (reduced opacity)
      const gradTL = ctx.createRadialGradient(cx - width/3, cy - height/3, 0, cx - width/3, cy - height/3, width/1.5);
      gradTL.addColorStop(0, "rgba(124, 58, 237, 0.03)");
      gradTL.addColorStop(1, "transparent");
      ctx.fillStyle = gradTL;
      ctx.fillRect(0, 0, cx, cy);

      const gradTR = ctx.createRadialGradient(cx + width/3, cy - height/3, 0, cx + width/3, cy - height/3, width/1.5);
      gradTR.addColorStop(0, "rgba(217, 119, 6, 0.02)");
      gradTR.addColorStop(1, "transparent");
      ctx.fillStyle = gradTR;
      ctx.fillRect(cx, 0, width, cy);

      const gradBL = ctx.createRadialGradient(cx - width/3, cy + height/3, 0, cx - width/3, cy + height/3, width/1.5);
      gradBL.addColorStop(0, "rgba(37, 99, 235, 0.03)");
      gradBL.addColorStop(1, "transparent");
      ctx.fillStyle = gradBL;
      ctx.fillRect(0, cy, cx, height);

      const gradBR = ctx.createRadialGradient(cx + width/3, cy + height/3, 0, cx + width/3, cy + height/3, width/1.5);
      gradBR.addColorStop(0, "rgba(0, 209, 178, 0.02)");
      gradBR.addColorStop(1, "transparent");
      ctx.fillStyle = gradBR;
      ctx.fillRect(cx, cy, width, height);

      // Smoothly return to base speed after scrolling stops
      currentSpeed += (baseSpeed - currentSpeed) * 0.03;

      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];

        // Z-axis movement responds to scroll direction
        node.z -= currentSpeed * scrollDirection;

        // Wrap around logic
        if (node.z <= 0) {
          node.x = Math.random() * width * 2 - width;
          node.y = Math.random() * height * 2 - height;
          node.z = width;
        } else if (node.z >= width) {
          node.x = Math.random() * width * 2 - width;
          node.y = Math.random() * height * 2 - height;
          node.z = 0;
        }

        const k = 128.0 / Math.max(0.1, node.z); // Prevent divide by zero
        const px = node.x * k + cx;
        const py = node.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = node.size * k;
          
          // Nodes fade in as they get closer
          const intensity = Math.min(1, 150 / Math.max(0.1, node.z));
          const stretch = currentSpeed > baseSpeed * 2 ? currentSpeed * 0.5 : 0;
          
          ctx.beginPath();
          if (stretch > 0) {
            const zOld = node.z + (currentSpeed * scrollDirection * 1.5);
            const kOld = 128.0 / Math.max(0.1, zOld);
            const pxOld = node.x * kOld + cx;
            const pyOld = node.y * kOld + cy;
            
            ctx.moveTo(px, py);
            ctx.lineTo(pxOld, pyOld);
            ctx.lineWidth = size;
            ctx.strokeStyle = `rgba(${node.color}, ${intensity * node.alpha})`;
            ctx.stroke();
          } else {
            ctx.fillStyle = `rgba(${node.color}, ${intensity * node.alpha})`;
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

    };

    const tick = () => {
      render();
      animationFrameId = requestAnimationFrame(tick);
    };

    // Reduced motion: one static frame of the field, no travel, no rAF loop.
    if (reduced) {
      render();
    } else {
      tick();
    }

    // Don't burn frames while the tab is hidden.
    const handleVisibility = () => {
      cancelAnimationFrame(animationFrameId);
      if (!document.hidden && !reduced) tick();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      if (reduced) render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      st?.kill();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A0A0A]">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0A0A0A_90%)] pointer-events-none" />
    </div>
  );
}
