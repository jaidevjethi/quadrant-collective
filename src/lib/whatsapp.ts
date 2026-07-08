/**
 * WhatsApp is the primary lead channel (founder decision 2026-07-06): the
 * contact form composes a prefilled message instead of posting to a server,
 * which also keeps the site fully static for GitHub Pages. One number,
 * shared by the form, the floating button, and the tel: link.
 */
export const WHATSAPP_NUMBER = "919773456668";
export const WHATSAPP_DISPLAY = "+91 97734 56668";
export const PHONE_HREF = "tel:+919773456668";

export function waLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
