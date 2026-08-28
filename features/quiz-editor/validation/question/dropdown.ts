import { z } from "zod";
import { BaseQuestionConfigSchema, BaseQuestionSchema, OptionSchema } from "./base";
import { MediaRatioSchema } from "../quiz/image";

export const DropdownDataSchema = z.object({
    label: z
    .string()
    .trim()
    .min(1, "Label is required")
    .max(100, "Label is too long"),

  options: z
    .array(OptionSchema)
    .min(2)
    .max(100),

  correctOptionId: z.string(),
});

export const DropdownConfigSchema = BaseQuestionConfigSchema.extend({
  placeholder: z.string().trim().max(100),

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

export type DropdownConfig = z.infer<
  typeof DropdownConfigSchema
>;

export type DropdownQuestion = z.infer<
  typeof DropdownQuestionSchema
>;