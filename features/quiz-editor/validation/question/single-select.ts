import { z } from "zod";
import { BaseQuestionSchema, OptionSchema } from "./base";

export const SingleSelectDataSchema = z.object({
  options: z.array(OptionSchema).min(2).max(20),

  correctOptionid: z.string(),
});

export const SingleSelectSettingsSchema = z.object({
  randomizeOptions: z.boolean(),

  layout: z.enum(["VERTICAL", "HORIZONTAL", "GRID"]),

  showOptionLetters: z.boolean(),
});

export const SingleSelectQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("SINGLE_SELECT"),

  content: SingleSelectDataSchema,

  config: SingleSelectSettingsSchema,
});

export type SingleSelectData = z.infer<typeof SingleSelectDataSchema>;

export type SingleSelectSettings = z.infer<typeof SingleSelectSettingsSchema>;

export type SingleSelectQuestion = z.infer<typeof SingleSelectQuestionSchema>;
