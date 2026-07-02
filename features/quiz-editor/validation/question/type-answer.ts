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
    .default("Type your answer..."),
});

export const TypeAnswerSettingsSchema = z.object({
  caseSensitive: z.boolean().default(false),

  trimWhitespace: z.boolean().default(true),

  ignoreExtraSpaces: z.boolean().default(true),

  acceptRegex: z.boolean().default(false),

  maxLength: z
    .number()
    .int()
    .min(1)
    .max(10000)
    .default(255),

  multiline: z.boolean().default(false),

  autoComplete: z.boolean().default(true),
});

export const TypeAnswerQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TYPE_ANSWER"),

  data: TypeAnswerDataSchema,

  settings: TypeAnswerSettingsSchema,
});

export type AcceptedAnswer = z.infer<typeof AcceptedAnswerSchema>;

export type TypeAnswerData = z.infer<typeof TypeAnswerDataSchema>;

export type TypeAnswerSettings = z.infer<
  typeof TypeAnswerSettingsSchema
>;

export type TypeAnswerQuestion = z.infer<
  typeof TypeAnswerQuestionSchema
>;