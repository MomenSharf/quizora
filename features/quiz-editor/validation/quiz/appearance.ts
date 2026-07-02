import { z } from "zod";

export const QuizAppearanceSchema = z.object({
  theme: z.enum(["SYSTEM", "LIGHT", "DARK"]).default("SYSTEM"),

  primaryColor: z.string().default("#6366F1"),

  backgroundColor: z.string().default("#FFFFFF"),

  textColor: z.string().default("#111827"),

  logo: z.url().optional(),

  coverImage: z.url().optional(),

  font: z.string().default("Inter"),

  borderRadius: z.number().min(0).max(32).default(12),

  showProgressBar: z.boolean().default(true),

  showQuestionNumber: z.boolean().default(true),
});

export type QuizAppearance = z.infer<typeof QuizAppearanceSchema>;