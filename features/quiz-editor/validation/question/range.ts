import { z } from "zod";
import { BaseQuestionSchema } from "./base";

export const RangeDataSchema = z
  .object({
    min: z.number(),

    max: z.number(),

    step: z.number().positive().default(1),
    answer: z.object({
        min: z.number(),

        max: z.number(),
    }),

    unit: z.string().trim().max(30).default(""),
  })
  .refine(
    (data) =>
      data.min < data.max &&
      data.answer.min < data.answer.max &&
      data.answer.min <= data.answer.max &&
      data.answer.min >= data.min &&
    {
      message: "Invalid range values",
    },
  );

export const RangeSettingsSchema = z.object({
  showTicks: z.boolean().default(true),

  showLabels: z.boolean().default(true),

  showCurrentValue: z.boolean().default(true),

  showMinMaxLabels: z.boolean().default(true),

  orientation: z.enum(["HORIZONTAL", "VERTICAL"]).default("HORIZONTAL"),

  snapToStep: z.boolean().default(true),
});

export const RangeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("RANGE"),

  content: RangeDataSchema,

  config: RangeSettingsSchema,
});

export type RangeData = z.infer<typeof RangeDataSchema>;

export type RangeSettings = z.infer<typeof RangeSettingsSchema>;

export type RangeQuestion = z.infer<typeof RangeQuestionSchema>;
