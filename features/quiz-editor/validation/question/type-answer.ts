import { z } from "zod";

import { AcceptedAnswerSchema, BaseQuestionSchema } from "./base";
import { MediaRatioSchema } from "../image";

export const TypeAnswerDataSchema = z.object({
  answers: z
    .array(AcceptedAnswerSchema)
    .min(1, "Add at least one accepted answer")
    .max(50, "You can add up to 50 accepted answers"),

  placeholder: z
    .string()
    .trim()
    .max(100, "Placeholder must be at most 100 characters"),
});

export const TypeAnswerQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TYPE_ANSWER"),

  content: TypeAnswerDataSchema,
});

export type TypeAnswerData = z.infer<typeof TypeAnswerDataSchema>;

export type TypeAnswerQuestion = z.infer<typeof TypeAnswerQuestionSchema>;
