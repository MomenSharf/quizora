import { z } from "zod";
import { ImageSchema } from "./image";

export const QuizAppearanceSchema = z.object({
  theme: z.enum(["SYSTEM", "LIGHT", "DARK"]),

  primaryColor: z.string(),

  backgroundColor: z.string(),

  textColor: z.string(),

  logo: ImageSchema.optional(),

  coverImage: ImageSchema.optional(),

  font: z.string(),

  borderRadius: z.number().min(0).max(32),

  showProgressBar: z.boolean(),

  showQuestionNumber: z.boolean(),
});

export type QuizAppearance = z.infer<typeof QuizAppearanceSchema>;
