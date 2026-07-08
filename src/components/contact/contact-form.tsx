"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { waLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

/**
 * The single contact form, used by the homepage invitation beat and the
 * /contact route. Validates with RHF + Zod, then composes a clean, formatted
 * WhatsApp message and opens the chat (founder decision: WhatsApp is the
 * lead channel; no server involved, which keeps the site fully static).
 */

const field =
  "w-full rounded-sm border border-hairline-strong bg-raised px-4 py-3 text-clarity placeholder:text-faint outline-none transition-colors duration-200 focus:border-clarity";

function composeMessage(data: ContactInput): string {
  const lines = [
    "New enquiry from the Quadrant Collective website",
    "",
    `Name: ${data.name}`,
  ];
  if (data.company) lines.push(`Company: ${data.company}`);
  lines.push(`Email: ${data.email}`, "", data.message);
  return lines.join("\n");
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data: ContactInput) => {
    window.open(waLink(composeMessage(data)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4 rounded-lg border border-hairline bg-raised p-8">
        <span className="flex size-10 items-center justify-center rounded-full border border-growth/40 text-growth">
          <Check className="size-5" />
        </span>
        <h3 className="text-title font-medium text-clarity">
          Your message is ready in WhatsApp.
        </h3>
        <p className="max-w-xs text-lead text-muted-2">
          Press send there and we reply within one business day. If the chat
          did not open, message us directly at {WHATSAPP_DISPLAY}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="label-mono text-muted-2">
          Name
        </label>
        <input id="name" className={field} placeholder="Your name" {...register("name")} />
        {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="label-mono text-muted-2">
          Email
        </label>
        <input id="email" type="email" className={field} placeholder="you@company.com" {...register("email")} />
        {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
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
        {errors.message && <span className="text-xs text-destructive">{errors.message.message}</span>}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-11 gap-2 self-start rounded-sm bg-clarity px-6 text-depth hover:bg-clarity/90"
      >
        Send on WhatsApp
        <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
      </Button>
      <p className="text-xs text-faint">
        Opens WhatsApp with your message prefilled. Nothing is sent until you
        press send there.
      </p>
    </form>
  );
}
