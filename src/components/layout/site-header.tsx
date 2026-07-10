"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/brand/logo-lockup";
import { Button } from "@/components/ui/button";

/**
 * Site navigation. Sticky, solid depth surface. The bottom hairline appears
 * only once the page scrolls (the header "wakes up"), and the active route
 * carries a growth-accent underline.
 */

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Open menu behaves like a real layer: Escape closes it, and the page
  // behind it does not scroll. Both restore cleanly on close/unmount.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    isActive(href)
      ? "text-sm text-clarity underline decoration-growth/70 decoration-1 underline-offset-8"
      : "text-sm text-muted-2 transition-colors duration-200 hover:text-clarity";

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-depth/60 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-hairline" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-gutter">
        <Link
          href="/"
          aria-label="Quadrant Collective, home"
          className="shrink-0"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <LogoLockup size="sm" orientation="horizontal" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={linkClass(l.href)}
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

      {/* Always mounted so open/close can animate; the grid-rows trick
          animates to content height without measuring it. */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-[var(--ease-precision)] md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav
            aria-label="Primary"
            aria-hidden={!open}
            className="flex flex-col gap-1 border-t border-hairline px-gutter py-4"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
                className={`py-2 text-lead transition-colors duration-200 hover:text-clarity ${
                  isActive(l.href)
                    ? "text-clarity underline decoration-growth/70 decoration-1 underline-offset-8"
                    : "text-muted-2"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Button
              asChild
              size="lg"
              className="mt-4 w-full rounded-sm border border-hairline-strong bg-transparent text-clarity shadow-none transition-colors duration-200 active:scale-[0.98]"
              onClick={() => setOpen(false)}
            >
              <Link href="/contact" tabIndex={open ? undefined : -1}>
                Start a conversation
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
