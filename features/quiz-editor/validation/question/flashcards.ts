import { z } from "zod";
import { BaseQuestionSchema } from "./base";

export const FlashcardSchema = z.object({
  id: z.string().cuid(),

  front: z.object({
    title: z.string().trim().max(200).default(""),
    content: z.string().trim().default(""),
    image: z.url().optional(),
  }),

  back: z.object({
    title: z.string().trim().max(200).default(""),
    content: z.string().trim().default(""),
    image: z.url().optional(),
  }),
});

export const FlashcardsDataSchema = z.object({
  cards: z
    .array(FlashcardSchema)
    .min(1)
    .max(500),
});

export const FlashcardsSettingsSchema = z.object({
  shuffleCards: z.boolean().default(false),

  flipDirection: z
    .enum([
      "HORIZONTAL",
      "VERTICAL",
    ])
    .default("HORIZONTAL"),

  startSide: z
    .enum([
      "FRONT",
      "BACK",
    ])
    .default("FRONT"),

  allowFlip: z.boolean().default(true),

  loopCards: z.boolean().default(false),

  showProgress: z.boolean().default(true),

  autoFlip: z.boolean().default(false),

  autoFlipDelay: z
    .number()
    .int()
    .min(0)
    .default(3000),
});

export const FlashcardsQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("FLASHCARDS"),

  data: FlashcardsDataSchema,

  settings: FlashcardsSettingsSchema,
});

export type Flashcard = z.infer<typeof FlashcardSchema>;

export type FlashcardsData = z.infer<
  typeof FlashcardsDataSchema
>;

export type FlashcardsSettings = z.infer<
  typeof FlashcardsSettingsSchema
>;

export type FlashcardsQuestion = z.infer<
  typeof FlashcardsQuestionSchema
>;