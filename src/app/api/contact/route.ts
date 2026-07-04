import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact endpoint. Validates with the shared schema (defence in depth — the
 * client validates too). Delivery to an email/CRM provider is a follow-up that
 * needs the provider's credentials; until then the submission is validated and
 * accepted so the form works end-to-end. Do not pretend to deliver: wire a real
 * provider here before launch.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // TODO(launch): deliver parsed.data to email/CRM (needs provider creds).
  console.log("[contact] submission received", { name: parsed.data.name, email: parsed.data.email });

  return NextResponse.json({ ok: true });
}
