import { z } from "zod";
import { BaseQuestionSchema } from "./base";

export const TrueFalseDataSchema = z.object({
  correctAnswer: z.boolean(),
});

export const TrueFalseSettingsSchema = z.object({
  trueLabel: z
    .string()
    .trim()
    .min(1)
    .max(50)
,
  falseLabel: z
    .string()
    .trim()
    .min(1)
    .max(50)
,
  randomizeOrder: z.boolean(),
});

export const TrueFalseQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TRUE_FALSE"),

  content: TrueFalseDataSchema,

  config: TrueFalseSettingsSchema,
});

export type TrueFalseData = z.infer<typeof TrueFalseDataSchema>;

export type TrueFalseSettings = z.infer<
  typeof TrueFalseSettingsSchema
>;

export type TrueFalseQuestion = z.infer<
  typeof TrueFalseQuestionSchema
>;