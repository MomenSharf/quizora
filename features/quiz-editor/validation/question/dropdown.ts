import { z } from "zod";

import { BaseQuestionSchema, OptionSchema } from "./base";
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

    correctOptionId: z.string().trim().min(1, "Select the correct option"),
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

export const DropdownQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("DROPDOWN"),

  content: DropdownDataSchema,
});

export type DropdownData = z.infer<typeof DropdownDataSchema>;
export type DropdownQuestion = z.infer<typeof DropdownQuestionSchema>;
