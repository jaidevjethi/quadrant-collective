import { z } from "zod";

/**
 * Shared contact schema — validated on the client (RHF) and again in the
 * route handler, so the same rules guard both sides. Zod v4 idioms.
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.email("Enter a valid email address."),
  company: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10, "A sentence or two helps us prepare."),
});

export type ContactInput = z.infer<typeof contactSchema>;
