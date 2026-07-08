"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

interface TextRevealProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, as: Tag = "span", className, delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const container = containerRef.current;
    if (!container) return;

    // We select the dynamically generated word spans
    const words = container.querySelectorAll(".reveal-word");
    
    // Initial state: translated down, blurred, and invisible
    gsap.set(words, { y: 20, autoAlpha: 0, filter: "blur(8px)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        once: true,
      },
    });

    tl.to(words, {
      y: 0,
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.05,
      delay,
    });

    return () => {
      tl.kill();
    };
  }, [delay]);

  // Split text into words, preserving spaces
  const words = children.split(" ").map((word, i) => (
    <span key={i} className="inline-block whitespace-pre">
      <span className="reveal-word inline-block">{word}</span>
      {" "}
    </span>
  ));

  return (
    <Tag ref={containerRef} className={className}>
      {words}
    </Tag>
  );
}
