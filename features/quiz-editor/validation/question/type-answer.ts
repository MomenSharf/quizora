import { z } from "zod";

import {
  AcceptedAnswerSchema,
  BaseQuestionConfigSchema,
  BaseQuestionSchema,
} from "./base";
import { MediaRatioSchema } from "../image";

export const TypeAnswerDataSchema = z.object({
  answers: z
    .array(AcceptedAnswerSchema)
    .min(1, "Add at least one accepted answer")
    .max(50, "You can add up to 50 accepted answers"),

  placeholder: z
    .string()
    .trim()
    .max(100, "Placeholder must be at most 100 characters")
    .default(""),
});

export const TypeAnswerConfigSchema = BaseQuestionConfigSchema.extend({
  caseSensitive: z.boolean(),

  trimWhitespace: z.boolean(),

  ignoreExtraSpaces: z.boolean(),

  acceptRegex: z.boolean(),

  maxLength: z
    .number({
      message: "Maximum answer length must be a number",
    })
    .int("Maximum answer length must be a whole number")
    .min(1, "Maximum answer length must be at least 1"),

  multiline: z.boolean(),

  showMedia: z.boolean(),

  mediaRatio: MediaRatioSchema,

  showExplanation: z.boolean(),
});

export const TypeAnswerQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TYPE_ANSWER"),

  content: TypeAnswerDataSchema,

  config: TypeAnswerConfigSchema,
});

export type TypeAnswerData = z.infer<typeof TypeAnswerDataSchema>;

export type TypeAnswerConfig = z.infer<typeof TypeAnswerConfigSchema>;

export type TypeAnswerQuestion = z.infer<typeof TypeAnswerQuestionSchema>;