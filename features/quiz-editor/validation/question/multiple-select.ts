import { z } from "zod";
import { BaseQuestionConfigSchema, BaseQuestionSchema, OptionSchema } from "./base";



export const MultipleSelectDataSchema = z.object({
  options: z
    .array(OptionSchema)
    .min(2)
    .max(20),

  correctOptionIds: z
    .array(z.string())
    .min(1),
});

export const MultipleSelectConfigSchema = BaseQuestionConfigSchema.extend({
  randomizeOptions: z.boolean(),

  layout: z
    .enum([
      "VERTICAL",
      "HORIZONTAL",
      "GRID",
    ])
,
  showOptionLetters: z.boolean(),

  minSelections: z
    .number()
    .int()
    .min(0)
,
  maxSelections: z
    .number()
    .int()
    .min(1)
,
  allowPartialCredit: z.boolean(),
});

export const MultipleSelectQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("MULTIPLE_SELECT"),

  content: MultipleSelectDataSchema,

  config: MultipleSelectConfigSchema,
});


export type MultipleSelectData = z.infer<
  typeof MultipleSelectDataSchema
>;

export type MultipleSelectConfig = z.infer<
  typeof MultipleSelectConfigSchema
>;

export type MultipleSelectQuestion = z.infer<
  typeof MultipleSelectQuestionSchema
>;