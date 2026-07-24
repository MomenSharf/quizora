import { z } from "zod";
import { AcceptedAnswerSchema, BaseQuestionSchema } from "./base";

export const FillBlankBlockSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("TEXT"),
    text: z.string(),
  }),

  z.object({
    id: z.string(),
    type: z.literal("BLANK"),
    blankId: z.string(),
  }),
]);

export const BlankSchema = z.object({
  id: z.string(),

  answers: z.array(AcceptedAnswerSchema).min(1).max(20),

  placeholder: z.string().trim().max(100),
});

export const FillBlankDataSchema = z.object({
  blocks: z.array(FillBlankBlockSchema).min(1),

  blanks: z.array(BlankSchema).max(50),
});

export const FillBlankSettingsSchema = z.object({
  caseSensitive: z.boolean(),

  trimWhitespace: z.boolean(),

  ignoreExtraSpaces: z.boolean(),

  allowAnyOrder: z.boolean(),

  autoResizeInputs: z.boolean(),
});

export const FillBlankQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("FILL_BLANK"),

  content: FillBlankDataSchema,

  config: FillBlankSettingsSchema,
});

export type FillBlankBlock = z.infer<typeof FillBlankBlockSchema>;

export type Blank = z.infer<typeof BlankSchema>;

export type FillBlankData = z.infer<typeof FillBlankDataSchema>;

export type FillBlankSettings = z.infer<typeof FillBlankSettingsSchema>;

export type FillBlankQuestion = z.infer<typeof FillBlankQuestionSchema>;
