import { z } from "zod";
import { BaseQuestionSchema, OptionSchema } from "./base";

export const DropdownDataSchema = z.object({
  options: z
    .array(OptionSchema)
    .min(2)
    .max(100),

  correctOptionId: z.string().cuid(),
});

export const DropdownSettingsSchema = z.object({
  placeholder: z
    .string()
    .trim()
    .max(100)
    .default("Select an option"),

  randomizeOptions: z.boolean().default(false),

  searchable: z.boolean().default(false),

  clearable: z.boolean().default(false),

  showOptionLetters: z.boolean().default(false),
});

export const DropdownQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("DROPDOWN"),

  content: DropdownDataSchema,

  config: DropdownSettingsSchema,
});

export type DropdownData = z.infer<typeof DropdownDataSchema>;

export type DropdownSettings = z.infer<
  typeof DropdownSettingsSchema
>;

export type DropdownQuestion = z.infer<
  typeof DropdownQuestionSchema
>;