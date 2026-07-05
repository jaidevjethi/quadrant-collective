import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Quadrant Collective. Tell us about your business and what you need. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col px-gutter py-section">
      <div className="mx-auto grid w-full max-w-4xl gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="label-mono text-muted-2">Contact</span>
          <h1 className="font-heading text-headline font-medium tracking-tight text-clarity">
            Let&apos;s build the system your business actually needs.
          </h1>
          <p className="max-w-sm text-lead text-muted-2">
            Tell us where you are and where you want to be. We read every message
            ourselves and reply within one business day.
          </p>
          <dl className="mt-2 flex flex-col gap-4 border-t border-hairline pt-6 text-sm">
            <div className="flex flex-col gap-1">
              <dt className="label-mono text-faint">Where</dt>
              <dd className="text-muted-2">Mehsana · Ahmedabad · Vadodara, and remote across India.</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="label-mono text-faint">Response time</dt>
              <dd className="text-muted-2">Within one business day.</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
