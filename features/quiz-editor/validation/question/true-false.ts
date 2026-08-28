import { z } from "zod";
import { BaseQuestionConfigSchema, BaseQuestionSchema } from "./base";
import { MediaRatioSchema } from "../quiz/image";

export const TrueFalseDataSchema = z.object({
  correctAnswer: z.boolean(),
});
export const TrueFalseConfigSchema = BaseQuestionConfigSchema.extend({
  trueLabel: z.string().trim().min(1).max(50),
  falseLabel: z.string().trim().min(1).max(50),

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
