import { z } from "zod";

/**
 * Contact form validation schema.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter.")
    .max(100, "Nama maksimal 100 karakter."),
  email: z
    .string()
    .email("Email tidak valid."),
  subject: z
    .string()
    .min(5, "Subjek minimal 5 karakter.")
    .max(200, "Subjek maksimal 200 karakter."),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter.")
    .max(2000, "Pesan maksimal 2000 karakter."),
});

