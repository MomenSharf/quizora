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
,

  randomizeOptions: z.boolean(),

  searchable: z.boolean(),

  clearable: z.boolean(),

  showOptionLetters: z.boolean(),
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