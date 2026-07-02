import { z } from "zod";
import { QuizAppearanceSchema } from "./appearance";
import { QuizInfoSchema } from "./info";
import { QuizSettingsSchema } from "./settings";

export const QuizSchema = z.object({
  info: QuizInfoSchema,
  settings: QuizSettingsSchema,
  appearance: QuizAppearanceSchema,
});

export type Quiz = z.infer<typeof QuizSchema>;

export * from "./appearance";
export * from "./info";
export * from "./settings";