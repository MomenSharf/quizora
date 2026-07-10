import { z } from "zod";
import { AcceptedAnswerSchema, BaseQuestionSchema } from "./base";

export const GuessAssetSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO", "AUDIO"]),

  url: z.url().optional(),
});

export const GuessDataSchema = z.object({
  asset: GuessAssetSchema,

  answers: z.array(AcceptedAnswerSchema).min(1).max(50),
});

export const GuessSettingsSchema = z.object({
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

  config: GuessSettingsSchema,
});

export type GuessAsset = z.infer<typeof GuessAssetSchema>;

export type GuessData = z.infer<typeof GuessDataSchema>;

export type GuessSettings = z.infer<typeof GuessSettingsSchema>;

export type GuessQuestion = z.infer<typeof GuessQuestionSchema>;
