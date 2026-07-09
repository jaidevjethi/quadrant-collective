"use client";

import dynamic from "next/dynamic";

/**
 * Homepage-only wrapper for the contact form. The form pulls in React Hook
 * Form + Zod (~90KB gzipped); on the homepage it lives in the final beat,
 * far below the fold, so there is no reason to ship that cost in the initial
 * bundle. Loading it client-side on demand keeps the homepage's critical JS
 * lean. The /contact route imports ContactForm directly, since the form is
 * that page's whole purpose and should be in the server-rendered HTML.
 */
const ContactForm = dynamic(
  () => import("./contact-form").then((m) => m.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="flex flex-col gap-5"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-3 w-24 rounded-sm bg-raised/60" />
            <div className="h-11 w-full rounded-sm border border-hairline-strong bg-raised/30" />
          </div>
        ))}
        <div className="h-11 w-40 rounded-sm bg-raised/60" />
      </div>
    ),
  },
);

export function ContactFormLazy() {
  return <ContactForm />;
}
