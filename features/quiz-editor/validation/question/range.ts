import { z } from "zod";
import { BaseQuestionSchema } from "./base";

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

export const RangeConfigSchema = z.object({
  showTicks: z.boolean(),

  showLabels: z.boolean(),

  showCurrentValue: z.boolean(),

  showMinMaxLabels: z.boolean(),

  orientation: z.enum(["HORIZONTAL", "VERTICAL"]),

  snapToStep: z.boolean(),
});

export const RangeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("RANGE"),

  content: RangeDataSchema,

  config: RangeConfigSchema,
});

export type RangeData = z.infer<typeof RangeDataSchema>;

export type RangeConfig = z.infer<typeof RangeConfigSchema>;

export type RangeQuestion = z.infer<typeof RangeQuestionSchema>;
