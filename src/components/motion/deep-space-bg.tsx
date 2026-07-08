"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The Infinite System Background.
 * Not a generic sci-fi starfield. This is an architectural coordinate space.
 * Features a mathematical drafting grid (the 'system') and data nodes (the 'disciplines')
 * that drift slowly, reacting to scroll velocity with restraint, not chaos.
 * Illuminates the 4 quadrants of the business (Vision, Spark, Intelligence, Growth)
 * via ambient radial glows at the vanishing point.
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

    const NODE_COUNT = Math.floor((width * height) / 3000); 
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
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    let animationFrameId: number;
    // Lower base speed for a calm, architectural drift
    const baseSpeed = 0.5;
    let currentSpeed = baseSpeed;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const targetSpeed = baseSpeed + Math.min(velocity / 80, 20);
        currentSpeed = targetSpeed;
      },
    });

    // To draw the architectural floor grid
    const drawGrid = (cx: number, cy: number, currentZOffset: number) => {
      ctx.lineWidth = 1;
      // Very faint structural lines
      ctx.strokeStyle = "rgba(230, 230, 230, 0.03)";
      
      const gridSpacing = 100;
      const vanishingY = cy; // Horizon line at center
      
      // Draw receding vertical lines
      ctx.beginPath();
      for(let x = -width; x < width; x += gridSpacing) {
        ctx.moveTo(cx, vanishingY);
        ctx.lineTo(cx + x * 3, height);
      }
      ctx.stroke();

      // Draw horizontal lines moving forward
      ctx.beginPath();
      for(let z = 10; z < width; z += gridSpacing) {
        // Move lines toward camera based on scroll
        let actualZ = (z - currentZOffset % gridSpacing);
        if(actualZ <= 0) actualZ += width; // loop it

        const k = 200.0 / actualZ;
        const py = vanishingY + 200 * k;
        
        if (py > vanishingY && py < height) {
          ctx.moveTo(0, py);
          ctx.lineTo(width, py);
        }
      }
      ctx.stroke();
    };

    let zOffset = 0;

    const render = () => {
      ctx.fillStyle = "#0A0A0A"; 
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Ambient Quadrant Glows (The Four Disciplines)
      // Top Left: Strategy (Vision)
      const gradTL = ctx.createRadialGradient(cx - width/4, cy - height/4, 0, cx - width/4, cy - height/4, width/2);
      gradTL.addColorStop(0, "rgba(124, 58, 237, 0.05)");
      gradTL.addColorStop(1, "transparent");
      ctx.fillStyle = gradTL;
      ctx.fillRect(0, 0, cx, cy);

      // Top Right: Design (Spark)
      const gradTR = ctx.createRadialGradient(cx + width/4, cy - height/4, 0, cx + width/4, cy - height/4, width/2);
      gradTR.addColorStop(0, "rgba(217, 119, 6, 0.04)");
      gradTR.addColorStop(1, "transparent");
      ctx.fillStyle = gradTR;
      ctx.fillRect(cx, 0, width, cy);

      // Bottom Left: Tech (Intelligence)
      const gradBL = ctx.createRadialGradient(cx - width/4, cy + height/4, 0, cx - width/4, cy + height/4, width/2);
      gradBL.addColorStop(0, "rgba(37, 99, 235, 0.05)");
      gradBL.addColorStop(1, "transparent");
      ctx.fillStyle = gradBL;
      ctx.fillRect(0, cy, cx, height);

      // Bottom Right: Growth (Teal)
      const gradBR = ctx.createRadialGradient(cx + width/4, cy + height/4, 0, cx + width/4, cy + height/4, width/2);
      gradBR.addColorStop(0, "rgba(0, 209, 178, 0.04)");
      gradBR.addColorStop(1, "transparent");
      ctx.fillStyle = gradBR;
      ctx.fillRect(cx, cy, width, height);

      currentSpeed += (baseSpeed - currentSpeed) * 0.05;
      zOffset += currentSpeed;

      // Draw the mathematical floor
      drawGrid(cx, cy, zOffset);

      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];

        node.z -= currentSpeed;

        if (node.z <= 0) {
          node.x = Math.random() * width - cx;
          node.y = Math.random() * height - cy;
          node.z = width;
        }

        const k = 128.0 / node.z;
        const px = node.x * k + cx;
        const py = node.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = node.size * k;
          const stretch = currentSpeed > baseSpeed * 2 ? currentSpeed * 0.4 : 0;
          
          // Nodes fade in as they get closer, mimicking structural clarity
          const intensity = Math.min(1, 100 / node.z);
          
          ctx.beginPath();
          if (stretch > 0) {
            const pxOld = node.x * (128.0 / (node.z + currentSpeed * 2)) + cx;
            const pyOld = node.y * (128.0 / (node.z + currentSpeed * 2)) + cy;
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
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A0A0A]">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-hidden="true"
      />
      {/* Heavy vignette overlay to blend edges into pure black and hide grid pop-in */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0A0A0A_80%)] pointer-events-none" />
    </div>
  );
}
