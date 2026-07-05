"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/brand/logo-lockup";
import { Button } from "@/components/ui/button";

/**
 * Site navigation. Sticky, solid depth surface with a hairline base — no
 * glassmorphism (BRAND.md). Logo left, links right; a small client island
 * drives the mobile menu. Links only to routes that exist.
 */

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-depth">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-gutter">
        <Link href="/" aria-label="Quadrant Collective, home" className="shrink-0">
          <LogoLockup size="sm" orientation="horizontal" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-2 transition-colors duration-200 hover:text-clarity"
            >
              {l.label}
            </Link>
          ))}
          <Button
            asChild
            size="lg"
            className="h-9 rounded-sm border border-hairline-strong bg-transparent px-4 text-sm text-clarity shadow-none transition-colors duration-200 hover:border-clarity hover:bg-raised"
          >
            <Link href="/contact">Start a conversation</Link>
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-sm text-clarity md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Primary"
          className="flex flex-col gap-1 border-t border-hairline px-gutter py-4 md:hidden"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-lead text-muted-2 transition-colors duration-200 hover:text-clarity"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
