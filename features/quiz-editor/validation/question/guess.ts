import { z } from "zod";
import { AcceptedAnswerSchema, BaseQuestionConfigSchema, BaseQuestionSchema } from "./base";

export const GuessHintSchema = z.object({
  id: z.string(),
  value: z.string(),
});

export const GuessDataSchema = z.object({
  mode: z.enum(["TEXT", "IMAGE"]),

  text: z.string(),

  image: z.string().url().optional().or(z.literal("")),

  hints: z.array(GuessHintSchema).min(1).max(20),

  answers: z.array(AcceptedAnswerSchema).min(1).max(50),
});
// import AcceptedAnswerSchema

export const GuessConfigSchema = BaseQuestionConfigSchema.extend({
  caseSensitive: z.boolean(),

  trimWhitespace: z.boolean(),

  ignoreExtraSpaces: z.boolean(),

  revealAnswerAfterSubmit: z.boolean(),

  maxAttempts: z.number().int().min(0),

  showHint: z.boolean(),

  zoomable: z.boolean(),
});

export const GuessQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("GUESS"),

  content: GuessDataSchema,

  config: GuessConfigSchema,
});

export type GuessHint = z.infer<typeof GuessHintSchema>;

export type GuessData = z.infer<typeof GuessDataSchema>;

export type GuessConfig = z.infer<typeof GuessConfigSchema>;

export type GuessQuestion = z.infer<typeof GuessQuestionSchema>;
