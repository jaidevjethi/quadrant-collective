"use client";

import { useEffect, useState } from "react";

/**
 * Anchor chips for the service packages with a scroll-spy active state. The
 * chips looked interactive but gave no feedback about where you are; now the
 * chip whose package fills the viewport carries the accent. IntersectionObserver
 * only (no scroll listeners), so it costs nothing between changes and works
 * identically with Lenis, native scroll, and reduced motion.
 */

type Item = { slug: string; title: string; accent: string };

export function PackageNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The entry nearest the top of the viewport that is visible wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Packages" className="mt-4 flex flex-wrap items-center gap-3">
      {items.map((i) => {
        const isActive = active === i.slug;
        return (
          <a
            key={i.slug}
            href={`#${i.slug}`}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
              isActive
                ? "border-hairline-strong bg-raised text-clarity"
                : "border-hairline bg-depth/50 text-muted-2 hover:border-hairline-strong hover:text-clarity"
            }`}
            style={isActive ? { borderColor: i.accent } : undefined}
          >
            {i.title}
          </a>
        );
      })}
    </nav>
  );
}
