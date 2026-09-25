import { z } from "zod";

import { BaseQuestionConfigSchema, BaseQuestionSchema } from "./base";
import { MediaRatioSchema } from "../image";

export const TrueFalseDataSchema = z.object({
  correctAnswer: z.boolean(),
});

export const TrueFalseConfigSchema = BaseQuestionConfigSchema.extend({
  trueLabel: z
    .string()
    .trim()
    .min(1, "True label cannot be empty")
    .max(50, "True label must be at most 50 characters"),

  falseLabel: z
    .string()
    .trim()
    .min(1, "False label cannot be empty")
    .max(50, "False label must be at most 50 characters"),

  shuffleOptions: z.boolean(),

  showMedia: z.boolean(),

  mediaRatio: MediaRatioSchema,

  showExplanation: z.boolean(),
});

export const TrueFalseQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TRUE_FALSE"),

  content: TrueFalseDataSchema,

  config: TrueFalseConfigSchema,
});

export type TrueFalseData = z.infer<typeof TrueFalseDataSchema>;

export type TrueFalseConfig = z.infer<typeof TrueFalseConfigSchema>;

export type TrueFalseQuestion = z.infer<typeof TrueFalseQuestionSchema>;
