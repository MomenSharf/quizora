import { z } from "zod";

import { BaseQuestionConfigSchema, BaseQuestionSchema } from "./base";
import { MediaRatioSchema } from "../image";

export const RangeDataSchema = z
  .object({
    min: z.number({
      message: "Minimum value must be a number",
    }),

    max: z.number({
      message: "Maximum value must be a number",
    }),

    step: z
      .number({
        message: "Step must be a number",
      })
      .positive("Step must be greater than zero"),

    answer: z.object({
      min: z.number({
        message: "Answer minimum must be a number",
      }),

      max: z.number({
        message: "Answer maximum must be a number",
      }),
    }),

    unit: z
      .string()
      .trim()
      .max(30, "Unit must be at most 30 characters")
      .default(""),
  })
  .superRefine((data, ctx) => {
    if (data.min >= data.max) {
      ctx.addIssue({
        code: "custom",
        path: ["max"],
        message: "Maximum value must be greater than minimum value",
        params: {
          errorCode: "INVALID_RANGE",
        },
      });
    }

    if (data.answer.min > data.answer.max) {
      ctx.addIssue({
        code: "custom",
        path: ["answer", "max"],
        message: "Answer maximum must be greater than or equal to answer minimum",
        params: {
          errorCode: "INVALID_ANSWER_RANGE",
        },
      });
    }

    if (data.answer.min < data.min) {
      ctx.addIssue({
        code: "custom",
        path: ["answer", "min"],
        message: "Answer minimum cannot be below the range minimum",
        params: {
          errorCode: "ANSWER_BELOW_RANGE",
        },
      });
    }

    if (data.answer.max > data.max) {
      ctx.addIssue({
        code: "custom",
        path: ["answer", "max"],
        message: "Answer maximum cannot exceed the range maximum",
        params: {
          errorCode: "ANSWER_ABOVE_RANGE",
        },
      });
    }

    if (data.step > data.max - data.min) {
      ctx.addIssue({
        code: "custom",
        path: ["step"],
        message: "Step cannot be greater than the range",
        params: {
          errorCode: "STEP_EXCEEDS_RANGE",
        },
      });
    }
  });

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
