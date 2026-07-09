import { config, z } from "zod";
import {
  AcceptedAnswerSchema,
  BaseQuestionSchema,
} from "./base";

export const FillBlankBlockSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string().cuid(),
    type: z.literal("TEXT"),
    text: z.string().default(""),
  }),

  z.object({
    id: z.string().cuid(),
    type: z.literal("BLANK"),
    blankId: z.string().cuid(),
  }),
]);

export const BlankSchema = z.object({
  id: z.string().cuid(),

  answers: z
    .array(AcceptedAnswerSchema)
    .min(1)
    .max(20),

  placeholder: z
    .string()
    .trim()
    .max(100)
    .default("Type here"),
});

export const FillBlankDataSchema = z.object({
  blocks: z
    .array(FillBlankBlockSchema)
    .min(1),

  blanks: z
    .array(BlankSchema)
    .min(1)
    .max(50),
});

export const FillBlankSettingsSchema = z.object({
  caseSensitive: z.boolean().default(false),

  trimWhitespace: z.boolean().default(true),

  ignoreExtraSpaces: z.boolean().default(true),

  allowAnyOrder: z.boolean().default(false),

  autoResizeInputs: z.boolean().default(true),
});

export const FillBlankQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("FILL_BLANK"),

  content: FillBlankDataSchema,

  config: FillBlankSettingsSchema,
});

export type FillBlankBlock = z.infer<
  typeof FillBlankBlockSchema
>;

export type Blank = z.infer<typeof BlankSchema>;

export type FillBlankData = z.infer<
  typeof FillBlankDataSchema
>;

export type FillBlankSettings = z.infer<
  typeof FillBlankSettingsSchema
>;

export type FillBlankQuestion = z.infer<
  typeof FillBlankQuestionSchema
>;