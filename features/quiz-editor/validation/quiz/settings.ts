import { z } from "zod";

export const QuizSettingsSchema = z.object({
  visibility: z
    .enum([
      "PRIVATE",
      "UNLISTED",
      "PUBLIC",
    ])
    .default("PRIVATE"),

  shuffleQuestions: z.boolean().default(false),

  shuffleOptions: z.boolean().default(false),

  showCorrectAnswers: z.boolean().default(true),

  showScore: z.boolean().default(true),

  showExplanations: z.boolean().default(true),

  allowRetry: z.boolean().default(true),

  saveProgress: z.boolean().default(true),

  requireAllQuestions: z.boolean().default(false),

  passingScore: z
    .number()
    .min(0)
    .max(100)
    .default(60),

  attempts: z
    .number()
    .int()
    .min(0)
    .default(0),

  timeLimit: z
    .number()
    .int()
    .min(0)
    .default(0),
});

export type QuizSettings = z.infer<typeof QuizSettingsSchema>;