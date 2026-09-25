import { z } from "zod";

import {
  BaseQuestionConfigSchema,
  BaseQuestionSchema,
  OptionSchema,
} from "./base";
import { MediaRatioSchema } from "../image";

export const DropdownDataSchema = z
  .object({
    label: z
      .string()
      .trim()
      .min(1, "Give your dropdown a label")
      .max(100, "Dropdown label must be at most 100 characters"),

    options: z
      .array(OptionSchema)
      .min(2, "Add at least 2 options")
      .max(100, "You can add up to 100 options")
      .superRefine((options, ctx) => {
        const seen = new Set<string>();

        options.forEach((option, index) => {
          if (seen.has(option.id)) {
            ctx.addIssue({
              code: "custom",
              path: [index, "id"],
              message: "This option ID is already in use",
             
            });
          }

          seen.add(option.id);
        });
      }),

    correctOptionId: z
      .string()
      .trim()
      .min(1, "Select the correct option"),
  })
  .superRefine((data, ctx) => {
    const exists = data.options.some(
      (option) => option.id === data.correctOptionId,
    );

    if (!exists) {
      ctx.addIssue({
        code: "custom",
        path: ["correctOptionId"],
        message: "The selected correct option no longer exists",
       
      });
    }
  });

export const DropdownConfigSchema = BaseQuestionConfigSchema.extend({
  placeholder: z
    .string()
    .trim()
    .max(100, "Placeholder must be at most 100 characters")
    .default(""),

  shuffleOptions: z.boolean(),
  searchable: z.boolean(),
  clearable: z.boolean(),
  showOptionLetters: z.boolean(),

  showMedia: z.boolean(),
  mediaRatio: MediaRatioSchema,
  showOptionMedia: z.boolean(),
  optionMediaRatio: MediaRatioSchema,

  showExplanation: z.boolean(),
});

export const DropdownQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("DROPDOWN"),

  content: DropdownDataSchema,

  config: DropdownConfigSchema,
});

export type DropdownData = z.infer<typeof DropdownDataSchema>;
export type DropdownConfig = z.infer<typeof DropdownConfigSchema>;
export type DropdownQuestion = z.infer<typeof DropdownQuestionSchema>;
