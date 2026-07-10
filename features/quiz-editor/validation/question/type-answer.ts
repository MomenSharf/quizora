import { z } from "zod";
import { AcceptedAnswerSchema, BaseQuestionSchema } from "./base";



export const TypeAnswerDataSchema = z.object({
  answers: z
    .array(AcceptedAnswerSchema)
    .min(1)
    .max(50),

  placeholder: z
    .string()
    .trim()
    .max(100)
});

export const TypeAnswerSettingsSchema = z.object({
  caseSensitive: z.boolean(),

  trimWhitespace: z.boolean(),

  ignoreExtraSpaces: z.boolean(),

  acceptRegex: z.boolean(),

  maxLength: z
    .number()
    .int()
    .min(1)
 ,

  multiline: z.boolean(),

  autoComplete: z.boolean(),
});

export const TypeAnswerQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TYPE_ANSWER"),

  content: TypeAnswerDataSchema,

  config: TypeAnswerSettingsSchema,
});

export type TypeAnswerData = z.infer<typeof TypeAnswerDataSchema>;

export type TypeAnswerSettings = z.infer<
  typeof TypeAnswerSettingsSchema
>;

export type TypeAnswerQuestion = z.infer<
  typeof TypeAnswerQuestionSchema
>;