import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { CornerTicks } from "@/components/ui/corner-ticks";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Quadrant Collective handles your data: what the site measures, what the contact form does, and the choices you have.",
  alternates: { canonical: "/privacy" },
};

/**
 * A privacy policy written the way we write everything: short, honest,
 * readable. It covers the site's full data surface (GA4 + Microsoft Clarity
 * once enabled, the WhatsApp-first contact form, GitHub Pages hosting) and
 * nothing invented. Update this page when analytics IDs go live or the
 * contact flow changes.
 */

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "The short version",
    body: [
      "This site stores nothing about you on our servers, because it has no servers. The contact form composes a WhatsApp message on your own device. Analytics, when enabled, measures how the site is used so we can improve it.",
    ],
  },
  {
    heading: "The contact form",
    body: [
      "When you submit the form, your message is formatted and opened in WhatsApp on your device. Nothing is sent or stored anywhere until you press send inside WhatsApp yourself. From that point the conversation is between you and us on WhatsApp, covered by WhatsApp's own terms and privacy policy.",
      "If you would rather not use WhatsApp, call the number in the footer. Whatever you send us stays with us and is used only to reply to you.",
    ],
  },
  {
    heading: "Analytics",
    body: [
      "This site currently runs no analytics. No Google Analytics, no Microsoft Clarity, no advertising pixels. We set no cookies of our own. Nothing here measures you.",
      "If we add analytics later it will be to see which pages get read and where the experience breaks, never to identify you and never to sell anything. We will update this page before that goes live rather than after.",
    ],
  },
  {
    heading: "Hosting",
    body: [
      "The site is served as static files by GitHub Pages. Like any web host, GitHub may keep standard server logs (IP address, request time) to operate the service. See GitHub's privacy statement for details.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can block or delete cookies in your browser settings, and browse the site fully with analytics blocked; nothing on the site requires it. If you have written to us and want that correspondence deleted, ask and we will delete it.",
    ],
  },
  {
    heading: "Who we are",
    body: [
      "Quadrant Collective is a brand of Quadrant Ops India, based in Gujarat, India. For any question about this policy, or to have your correspondence deleted, message or call us on +91 97734 56668.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 flex-col px-gutter py-section">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12">
        <header className="flex flex-col gap-6">
          <span className="label-mono text-muted-2">Privacy</span>
          <h1 className="font-heading text-headline font-medium tracking-tight text-clarity">
            Plain answers about your data.
          </h1>
          <p className="label-mono text-faint">Last updated: 9 July 2026</p>
        </header>

        <Reveal className="flex flex-col gap-10">
          {SECTIONS.map((s) => (
            <section key={s.heading} data-reveal className="flex flex-col gap-3">
              <h2 className="text-title font-medium text-clarity">
                {s.heading}
              </h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 32)} className="text-sm leading-relaxed text-muted-2">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </Reveal>

        <div className="group relative rounded-md border border-hairline bg-raised/30 p-6">
          <CornerTicks />
          <p className="text-sm text-muted-2">
            Something unclear?{" "}
            <Link
              href="/contact"
              className="text-clarity underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:decoration-clarity"
            >
              Ask us directly.
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
