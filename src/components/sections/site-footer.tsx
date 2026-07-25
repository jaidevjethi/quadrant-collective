import Link from "next/link";
import { LogoLockup } from "@/components/brand/logo-lockup";
import { SITE_URL } from "@/lib/site";
import { PHONE_HREF, WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";

/**
 * Beat 8 — Footer (STRATEGY.md). Completely still, static server component.
 * Legal name, Organization schema, honest on-page links only (no dead routes
 * for pages that don't exist yet). LocalBusiness schema with a street address
 * is deferred until the registered address is confirmed (STRATEGY open
 * decision #2) — no invented data.
 */

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Quadrant Collective",
  legalName: "Quadrant Ops India",
  url: SITE_URL,
  logo: `${SITE_URL}/og.jpg`,
  description:
    "Quadrant Collective is a digital engineering and growth studio in Gujarat, India. We build the websites, search presence and content that high-trust businesses run on, as one system.",
  founder: {
    "@type": "Person",
    name: "Jaidev Jethi",
    url: `${SITE_URL}/about/`,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-97734-56668",
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Gujarati", "Hindi"],
  },
  areaServed: ["Mehsana", "Ahmedabad", "Vadodara", "India"],
  knowsAbout: [
    "Web design",
    "Web development",
    "Branding",
    "SEO",
    "Growth marketing",
    "AI integration",
    "Social media management",
    "Google Business Profile optimization",
  ],
};

/** WebSite schema so search and AI systems bind the site name, URL and
 *  publisher together; complements the Organization schema above. */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Quadrant Collective",
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: "Quadrant Collective",
    legalName: "Quadrant Ops India",
  },
  inLanguage: "en-IN",
};

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-hairline bg-depth/60 backdrop-blur-md px-gutter py-16 mt-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-4">
            <LogoLockup size="md" orientation="horizontal" />
            <p className="max-w-xs text-sm text-muted-2">
              Strategy, design, technology and growth, built as one system.
            </p>
            <p className="label-mono text-faint">
              Mehsana · Ahmedabad · Vadodara
            </p>
            {/* A footer should never be a contact dead end. */}
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-2">
              <a
                href={PHONE_HREF}
                className="transition-colors duration-200 hover:text-clarity"
              >
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-growth transition-colors duration-200 hover:text-clarity"
              >
                WhatsApp us
              </a>
              <span className="text-faint">Reply within one business day.</span>
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="label-mono text-faint">Site</span>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm text-muted-2 transition-colors duration-200 hover:text-clarity"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-hairline pt-6 text-xs text-faint sm:flex-row">
          <span>© {year} Quadrant Ops India. All rights reserved.</span>
          <span className="flex gap-4">
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-clarity"
            >
              Privacy
            </Link>
            <span>Quadrant Collective is a brand of Quadrant Ops India.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
