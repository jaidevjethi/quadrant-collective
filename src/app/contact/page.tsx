import type { Metadata } from "next";
// The form is imported EAGERLY on purpose: this page exists for the form, so
// its fields must be in the first-paint HTML (the lazy variant is for the
// homepage, where the form is below the fold in the final beat).
import { ContactForm } from "@/components/contact/contact-form";
import { Atmosphere } from "@/components/ui/atmosphere";
import { IntroField } from "@/components/ui/intro-field";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { PHONE_HREF, WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Quadrant Collective. Tell us about your business and what you need. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

/**
 * The questions people actually have before sending a first message, answered
 * plainly. One source drives both the visible FAQ and the FAQPage schema so
 * the answers search engines quote are the answers visitors read. Price and
 * timeline questions are deliberately absent until the founder supplies real
 * ranges: no invented facts.
 */
const FAQ: { q: string; a: string }[] = [
  {
    q: "What does Quadrant Collective do?",
    a: "We design and build digital systems for growing businesses: websites, brand identity, SEO, content and AI integrations. Strategy, design, technology and growth are planned together as one system so the results compound instead of cancelling out.",
  },
  {
    q: "Where are you based, and do you work remotely?",
    a: "We are based in Gujarat, India and work across Mehsana, Ahmedabad and Vadodara, as well as remotely with clients across India.",
  },
  {
    q: "What happens after I send a message?",
    a: "We reply within one business day. Then we set up a short call to map the business and the gap. After the call you get a written recommendation you keep, whether or not we work together.",
  },
  {
    q: "Who will I actually be working with?",
    a: "Quadrant Collective is a founder-led studio. You talk directly to Jaidev Jethi, the founder, who leads every engagement and brings in specialists as the work requires them.",
  },
  {
    q: "Do you only work with healthcare businesses?",
    a: "No. Much of our recent work is in healthcare and local services, and the same system serves any business that values quality: professional services, tourism, manufacturing, product companies.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ContactPage() {
  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden px-gutter py-section">
      {/* The landing: contact shares the homepage destination, because
          arriving here IS the journey's end (the Atmosphere System). The
          teal horizon rises under the page's close. */}
      <Atmosphere accent="#00D1B2" edge="bottom" strength={0.16} />
      <IntroField />
      <div className="mx-auto grid w-full max-w-4xl gap-12 md:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">Contact</span>
          <TextReveal
            as="h1"
            className="font-heading text-display font-medium tracking-tight text-clarity"
          >
            {"Let's build the system your business actually needs."}
          </TextReveal>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Reveal className="mx-auto mt-24 w-full max-w-4xl">
        <div data-reveal className="flex flex-col gap-8 border-t border-hairline pt-12">
          <h2 className="label-mono text-muted-2">Before you write</h2>
          <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {FAQ.map((item) => (
              <div key={item.q} className="flex flex-col gap-2">
                <dt className="text-sm font-medium text-clarity">{item.q}</dt>
                <dd className="text-sm leading-relaxed text-muted-2">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </main>
  );
}
