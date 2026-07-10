import { z } from "zod";

export const QuizSettingsSchema = z.object({
  visibility: z.enum(["PRIVATE", "UNLISTED", "PUBLIC"]),

  shuffleQuestions: z.boolean(),

  shuffleOptions: z.boolean(),

  showCorrectAnswers: z.boolean(),

  showScore: z.boolean(),

  showExplanations: z.boolean(),

  allowRetry: z.boolean(),

  saveProgress: z.boolean(),

  requireAllQuestions: z.boolean(),

  passingScore: z.number().min(0).max(100),

  attempts: z.number().int().min(0),

  timeLimit: z.number().int().min(0),
});

export type QuizSettings = z.infer<typeof QuizSettingsSchema>;
