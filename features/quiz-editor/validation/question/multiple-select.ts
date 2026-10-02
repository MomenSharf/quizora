import { z } from "zod";

import {
  BaseQuestionConfigSchema,
  BaseQuestionSchema,
  OptionSchema,
} from "./base";
import { MediaRatioSchema } from "../image";

export const MultipleSelectDataSchema = z
  .object({
    options: z
      .array(OptionSchema)
      .min(2, "Add at least 2 options")
      .max(20, "You can add up to 20 options"),

    correctOptionIds: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Correct option ID cannot be empty"),
      )
      .min(1, "Select at least one correct option"),
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

    const correctIds = new Set<string>();

    data.correctOptionIds.forEach((id, index) => {
      if (correctIds.has(id)) {
        ctx.addIssue({
          code: "custom",
          path: ["correctOptionIds", index],
          message: "This option is already marked as correct",
          params: {
            errorCode: "DUPLICATE_CORRECT_OPTION",
          },
        });
      }

      correctIds.add(id);

      if (!optionIds.has(id)) {
        ctx.addIssue({
          code: "custom",
          path: ["correctOptionIds", index],
          message: "This correct option no longer exists",
          params: {
            errorCode: "INVALID_CORRECT_OPTION",
          },
        });
      }
    });
  });

export const MultipleSelectConfigSchema = BaseQuestionConfigSchema.extend({
  shuffleOptions: z.boolean(),

  layout: z.enum(["VERTICAL", "HORIZONTAL", "GRID"], {
    message: "Please select a valid option layout",
  }),

  showOptionLetters: z.boolean(),

  showMedia: z.boolean(),

  mediaRatio: MediaRatioSchema,

  showOptionMedia: z.boolean(),

  optionMediaRatio: MediaRatioSchema,

  showExplanation: z.boolean(),
})

export const MultipleSelectQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("MULTIPLE_SELECT"),

  content: MultipleSelectDataSchema,

  config: MultipleSelectConfigSchema,
});

export type MultipleSelectData = z.infer<typeof MultipleSelectDataSchema>;

export type MultipleSelectConfig = z.infer<typeof MultipleSelectConfigSchema>;

export type MultipleSelectQuestion = z.infer<
  typeof MultipleSelectQuestionSchema
>;
