import { LogoLockup } from "@/components/brand/logo-lockup";

/**
 * Beat 8 — Footer (STRATEGY.md). Completely still, static server component.
 * Legal name, Organization schema, honest on-page links only (no dead routes
 * for pages that don't exist yet). LocalBusiness schema with a street address
 * is deferred until the registered address is confirmed (STRATEGY open
 * decision #2) — no invented data.
 */

// Provisional canonical — register per STRATEGY open decision #1, then confirm.
const SITE_URL = "https://quadrantcollective.in";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Quadrant Collective",
  legalName: "Quadrant Ops India",
  url: SITE_URL,
  description:
    "A digital growth studio uniting strategy, design, technology and growth into one system.",
  areaServed: ["Mehsana", "Ahmedabad", "Vadodara", "India"],
  knowsAbout: [
    "Web design",
    "Web development",
    "Branding",
    "SEO",
    "Growth marketing",
    "AI integration",
  ],
};

const NAV = [
  { href: "#capabilities", label: "What we do" },
  { href: "#method", label: "How we work" },
  { href: "#contact", label: "Start a conversation" },
];

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-hairline px-gutter py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-4">
            <LogoLockup size="md" orientation="horizontal" />
            <p className="max-w-xs text-sm text-muted-2">
              Strategy, design, technology and growth — built as one system.
            </p>
            <p className="label-mono text-faint">
              Mehsana · Ahmedabad · Vadodara
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="label-mono text-faint">Site</span>
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-2 transition-colors duration-200 hover:text-clarity"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-hairline pt-6 text-xs text-faint sm:flex-row">
          <span>© {year} Quadrant Ops India. All rights reserved.</span>
          <span>Quadrant Collective is a brand of Quadrant Ops India.</span>
        </div>
      </div>
    </footer>
  );
}
