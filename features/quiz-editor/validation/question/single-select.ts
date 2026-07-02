import { z } from "zod";
import { BaseQuestionSchema, OptionSchema } from "./base";



export const SingleSelectDataSchema = z.object({
  options: z
    .array(OptionSchema)
    .min(2)
    .max(20),

  correctOptionId: z.string().cuid(),
});

export const SingleSelectSettingsSchema = z.object({
  randomizeOptions: z.boolean().default(false),

  layout: z.enum([
    "VERTICAL",
    "HORIZONTAL",
    "GRID",
  ]).default("VERTICAL"),

  showOptionLetters: z.boolean().default(true),
});

export const SingleSelectQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("SINGLE_SELECT"),

  data: SingleSelectDataSchema,

  settings: SingleSelectSettingsSchema,
});


export type SingleSelectData = z.infer<typeof SingleSelectDataSchema>;

export type SingleSelectSettings = z.infer<
  typeof SingleSelectSettingsSchema
>;

export type SingleSelectQuestion = z.infer<
  typeof SingleSelectQuestionSchema
>;