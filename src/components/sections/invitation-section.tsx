"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/**
 * Beat 7 — The invitation (STRATEGY.md). The energy slows: one sentence, one
 * form, one promise we can keep. The only substantial interactive JS on the
 * page. Validates client-side (RHF + Zod) and posts to /api/contact, which
 * revalidates. Anchor id="contact" is the hero CTA target.
 */

const field =
  "w-full rounded-sm border border-hairline-strong bg-raised px-4 py-3 text-clarity placeholder:text-faint outline-none transition-colors duration-200 focus:border-clarity";

export function InvitationSection() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setFailed(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad status");
      setSent(true);
      reset();
    } catch {
      setFailed(true);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 px-gutter py-section">
      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <span data-reveal className="label-mono text-muted-2">
            07 — Start a conversation
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
            {sent ? (
              <div className="flex h-full flex-col items-start justify-center gap-4 rounded-lg border border-hairline bg-raised p-8">
                <span className="flex size-10 items-center justify-center rounded-full border border-growth/40 text-growth">
                  <Check className="size-5" />
                </span>
                <h3 className="text-title font-medium text-clarity">
                  Message received.
                </h3>
                <p className="max-w-xs text-lead text-muted-2">
                  Thank you — we&apos;ll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="label-mono text-muted-2">
                    Name
                  </label>
                  <input id="name" className={field} placeholder="Your name" {...register("name")} />
                  {errors.name && (
                    <span className="text-xs text-destructive">{errors.name.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="label-mono text-muted-2">
                    Email
                  </label>
                  <input id="email" type="email" className={field} placeholder="you@company.com" {...register("email")} />
                  {errors.email && (
                    <span className="text-xs text-destructive">{errors.email.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="label-mono text-muted-2">
                    Company <span className="text-faint">(optional)</span>
                  </label>
                  <input id="company" className={field} placeholder="Company name" {...register("company")} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="label-mono text-muted-2">
                    What are you building?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`${field} resize-none`}
                    placeholder="A few sentences about your business and what you need."
                    {...register("message")}
                  />
                  {errors.message && (
                    <span className="text-xs text-destructive">{errors.message.message}</span>
                  )}
                </div>

                {failed && (
                  <span className="text-xs text-destructive">
                    Something went wrong sending that. Please try again, or email us directly.
                  </span>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-11 gap-2 self-start rounded-sm px-6"
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
