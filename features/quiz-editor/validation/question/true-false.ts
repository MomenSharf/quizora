import { z } from "zod";
import { BaseQuestionSchema } from "./base";

export const TrueFalseDataSchema = z.object({
  correctAnswer: z.boolean(),
});

export const TrueFalseConfig = BaseQuestionSchema.extend({
  trueLabel: z.string().trim().min(1).max(50),
  falseLabel: z.string().trim().min(1).max(50),
  randomizeOrder: z.boolean(),
});

export const TrueFalseQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TRUE_FALSE"),

  content: TrueFalseDataSchema,

  config: TrueFalseConfig,
});

export type TrueFalseData = z.infer<typeof TrueFalseDataSchema>;

export type TrueFalseConfig = z.infer<typeof TrueFalseConfig>;

export type TrueFalseQuestion = z.infer<typeof TrueFalseQuestionSchema>;
