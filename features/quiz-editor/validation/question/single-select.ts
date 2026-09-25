import { z } from "zod";

import {
  BaseQuestionConfigSchema,
  BaseQuestionSchema,
  OptionSchema,
} from "./base";
import { MediaRatioSchema } from "../image";

export const SingleSelectDataSchema = z
  .object({
    options: z
      .array(OptionSchema)
      .min(2, "Add at least 2 options")
      .max(20, "You can add up to 20 options"),

    correctOptionId: z
      .string()
      .trim()
      .min(1, "Select the correct option"),
  })
  .superRefine((data, ctx) => {
    const optionIds = new Set<string>();

    data.options.forEach((option, index) => {
      if (optionIds.has(option.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["options", index, "id"],
          message: "This option ID is already in use",
          params: {
            errorCode: "DUPLICATE_OPTION_ID",
          },
        });
      }

      optionIds.add(option.id);
    });

    if (!optionIds.has(data.correctOptionId)) {
      ctx.addIssue({
        code: "custom",
        path: ["correctOptionId"],
        message: "The selected correct option no longer exists",
        params: {
          errorCode: "INVALID_CORRECT_OPTION",
        },
      });
    }
  });

export const SingleSelectConfigSchema = BaseQuestionConfigSchema.extend({
  showMedia: z.boolean(),

  mediaRatio: MediaRatioSchema,

  showExplanation: z.boolean(),

  shuffleOptions: z.boolean(),

  showOptionLetters: z.boolean(),

  showOptionMedia: z.boolean(),

  optionMediaRatio: MediaRatioSchema,

  layout: z.enum(["VERTICAL", "HORIZONTAL", "GRID"], {
    message: "Please select a valid option layout",
  }),
});

export const SingleSelectQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("SINGLE_SELECT"),

  content: SingleSelectDataSchema,

  config: SingleSelectConfigSchema,
});

export type SingleSelectData = z.infer<typeof SingleSelectDataSchema>;

export type SingleSelectConfig = z.infer<typeof SingleSelectConfigSchema>;

export type SingleSelectQuestion = z.infer<typeof SingleSelectQuestionSchema>;
