import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";

/**
 * Beat 7 — The invitation (STRATEGY.md). The energy slows: one sentence, one
 * form, one promise we can keep. Shares the ContactForm with the /contact
 * route. Anchor id="contact" is the hero CTA target.
 */
export function InvitationSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-y border-hairline bg-raised px-gutter py-section"
    >
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
            message ourselves and reply within one business day.
          </p>
        </Reveal>

        <Reveal>
          <div data-reveal>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
