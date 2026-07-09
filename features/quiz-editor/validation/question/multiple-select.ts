import { z } from "zod";
import { BaseQuestionSchema, OptionSchema } from "./base";



export const MultipleSelectDataSchema = z.object({
  options: z
    .array(OptionSchema)
    .min(2)
    .max(20),

  correctOptionIds: z
    .array(z.string().cuid())
    .min(1),
});

export const MultipleSelectSettingsSchema = z.object({
  randomizeOptions: z.boolean().default(false),

  layout: z
    .enum([
      "VERTICAL",
      "HORIZONTAL",
      "GRID",
    ])
    .default("VERTICAL"),

  showOptionLetters: z.boolean().default(true),

  minSelections: z
    .number()
    .int()
    .min(0)
    .default(0),

  maxSelections: z
    .number()
    .int()
    .min(1)
    .default(0),

  allowPartialCredit: z.boolean().default(true),
});

export const MultipleSelectQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("MULTIPLE_SELECT"),

  content: MultipleSelectDataSchema,

  config: MultipleSelectSettingsSchema,
});


export type MultipleSelectData = z.infer<
  typeof MultipleSelectDataSchema
>;

export type MultipleSelectSettings = z.infer<
  typeof MultipleSelectSettingsSchema
>;

export type MultipleSelectQuestion = z.infer<
  typeof MultipleSelectQuestionSchema
>;