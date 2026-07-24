import Link from "next/link";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Reveal } from "@/components/motion/reveal";
import { ContactFormLazy } from "@/components/contact/contact-form-lazy";

/** The after-contact path, stated plainly: the unknown after "send" is the
 *  last friction before a first message, so we remove it. Every promise here
 *  is one we keep. Step 02 deliberately echoes Method step 01 (map the
 *  business and the gap): contact is where the method begins. */
const NEXT_STEPS = [
  "We reply within one business day.",
  "A short call to map the business and the gap.",
  "A written recommendation you keep, whether or not we work together.",
];

/**
 * Beat 7 — The invitation (STRATEGY.md). The energy slows: one sentence, one
 * form, one promise we can keep. Shares the ContactForm with the /contact
 * route. Anchor id="contact" is the hero CTA target.
 */
export function InvitationSection() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden border-y border-hairline bg-raised px-gutter py-section"
    >
      {/* Environment: a teal wash rising under the ask (growth, the
          destination where the conversation starts). */}
      <Atmosphere accent="#00D1B2" edge="bottom" strength={0.16} />

      {/* Calm echo of the hero's coordinate field: the page ends in the same
          engineered space it began. Static CSS only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(230,230,230,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(230,230,230,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 80% at 50% 50%, #000 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 80% at 50% 50%, #000 10%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">
            07 · Start a conversation
          </span>
          <h2
            data-reveal
            className="font-heading text-headline font-medium tracking-tight text-clarity"
          >
            Let&apos;s build the system your business actually needs.
          </h2>
          <p data-reveal className="max-w-sm text-lead text-muted-2">
            Tell us where you are and where you want to be. We read every
            message ourselves.
          </p>

          <div data-reveal className="mt-2 flex flex-col gap-4">
            <span className="label-mono text-faint">What happens next</span>
            <ol className="flex flex-col gap-3">
              {NEXT_STEPS.map((step, i) => (
                <li key={step} className="flex gap-4 text-sm text-muted-2">
                  <span className="label-mono text-faint">
                    0{i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <p data-reveal className="mt-2 max-w-sm text-sm text-faint">
            The person who replies is the person who builds.{" "}
            <Link
              href="/about"
              className="text-muted-2 underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-clarity"
            >
              Meet Jaidev Jethi, the founder.
            </Link>
          </p>
        </Reveal>

        <Reveal>
          <div data-reveal>
            <ContactFormLazy />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
