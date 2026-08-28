import { z } from "zod";
import { BaseQuestionConfigSchema, BaseQuestionSchema } from "./base";
import { MediaRatioSchema } from "../quiz/image";

export const RangeDataSchema = z
  .object({
    min: z.number(),

    max: z.number(),

    step: z.number().positive(),
    answer: z.object({
      min: z.number(),

      max: z.number(),
    }),

    unit: z.string().trim().max(30),
  })
  .refine(
    (data) =>
      data.min < data.max &&
      data.answer.min < data.answer.max &&
      data.answer.min <= data.answer.max &&
      data.answer.min >= data.min && {
        message: "Invalid range values",
      },
  );
export const RangeConfigSchema = BaseQuestionConfigSchema.extend({
  showMedia: z.boolean(),
  mediaRatio: MediaRatioSchema,

  snapToStep: z.boolean(),

  showExplanation: z.boolean(),
});

export const RangeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("RANGE"),

  content: RangeDataSchema,

  config: RangeConfigSchema,
});

export type RangeData = z.infer<typeof RangeDataSchema>;

export type RangeConfig = z.infer<typeof RangeConfigSchema>;

export type RangeQuestion = z.infer<typeof RangeQuestionSchema>;
