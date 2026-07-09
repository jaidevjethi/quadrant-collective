import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { IntroField } from "@/components/ui/intro-field";
import { Reveal } from "@/components/motion/reveal";
import { PHONE_HREF, WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Quadrant Collective. Tell us about your business and what you need. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden px-gutter py-section">
      <IntroField />
      <div className="mx-auto grid w-full max-w-4xl gap-12 md:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">Contact</span>
          <h1
            data-reveal
            className="font-heading text-headline font-medium tracking-tight text-clarity"
          >
            Let&apos;s build the system your business actually needs.
          </h1>
          <p data-reveal className="max-w-sm text-lead text-muted-2">
            Tell us where you are and where you want to be. We read every message
            ourselves and reply within one business day.
          </p>
          <dl
            data-reveal
            className="mt-2 flex flex-col gap-4 border-t border-hairline pt-6 text-sm"
          >
            <div className="flex flex-col gap-1">
              <dt className="label-mono text-faint">Where</dt>
              <dd className="text-muted-2">Mehsana · Ahmedabad · Vadodara, and remote across India.</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="label-mono text-faint">Call or WhatsApp</dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1 text-muted-2">
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
                  Open WhatsApp
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="label-mono text-faint">Response time</dt>
              <dd className="text-muted-2">Within one business day.</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal>
          <div data-reveal>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </main>
  );
}
