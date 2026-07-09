import { z } from "zod";

import { QuizAppearanceSchema } from "./appearance";
import { QuizInfoSchema } from "./info";
import { QuizSettingsSchema } from "./settings";

import { QuestionSchema } from "../question";
import { QuizStatus } from "@/lib/db/generated/prisma/enums";

export const QuizEditorSchema = z.object({
  id: z.string().cuid(),

  slug: z.string().trim().optional(),

  status: z.enum(QuizStatus),

  version: z.number().int().default(1),

  info: QuizInfoSchema,

  settings: QuizSettingsSchema,

  appearance: QuizAppearanceSchema,

  questions: z.array(QuestionSchema).default([]),
});

export type QuizEditor = z.infer<typeof QuizEditorSchema>;
export type QuizEditorInput = z.input<typeof QuizEditorSchema>;

export * from "./appearance";
export * from "./info";
export * from "./settings";
