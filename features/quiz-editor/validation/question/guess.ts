import { z } from "zod";
import { AcceptedAnswerSchema, BaseQuestionSchema } from "./base";

export const GuessAssetSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO", "AUDIO"]).default("IMAGE"),

  url: z.url().optional(),
});

export const GuessDataSchema = z.object({
  asset: GuessAssetSchema,

  answers: z.array(AcceptedAnswerSchema).min(1).max(50),
});

export const GuessSettingsSchema = z.object({
  caseSensitive: z.boolean().default(false),

  trimWhitespace: z.boolean().default(true),

  ignoreExtraSpaces: z.boolean().default(true),

  revealAnswerAfterSubmit: z.boolean().default(true),

  maxAttempts: z.number().int().min(0).default(0),

  showHint: z.boolean().default(true),

  zoomable: z.boolean().default(true),
});

export const GuessQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("GUESS"),

  data: GuessDataSchema,

  settings: GuessSettingsSchema,
});

export type GuessAsset = z.infer<typeof GuessAssetSchema>;

export type GuessData = z.infer<typeof GuessDataSchema>;

export type GuessSettings = z.infer<typeof GuessSettingsSchema>;

export type GuessQuestion = z.infer<typeof GuessQuestionSchema>;
