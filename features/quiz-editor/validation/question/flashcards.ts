import { z } from "zod";
import { BaseQuestionSchema } from "./base";

export const FlashcardSchema = z.object({
  id: z.string(),

  front: z.object({
    title: z.string().trim().max(200),
    content: z.string().trim(),
    image: z.url().optional(),
  }),

  back: z.object({
    title: z.string().trim().max(200),
    content: z.string().trim(),
    image: z.url().optional(),
  }),
});

export const FlashcardsDataSchema = z.object({
  cards: z.array(FlashcardSchema).min(1).max(500),
});

export const FlashcardsSettingsSchema = z.object({
  shuffleCards: z.boolean(),

  flipDirection: z.enum(["HORIZONTAL", "VERTICAL"]),
  startSide: z.enum(["FRONT", "BACK"]),
  allowFlip: z.boolean(),

  loopCards: z.boolean(),

  showProgress: z.boolean(),

  autoFlip: z.boolean(),

  autoFlipDelay: z.number().int().min(0),
});

export const FlashcardsQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("FLASHCARDS"),

  content: FlashcardsDataSchema,

  config: FlashcardsSettingsSchema,
});

export type Flashcard = z.infer<typeof FlashcardSchema>;

export type FlashcardsData = z.infer<typeof FlashcardsDataSchema>;

export type FlashcardsSettings = z.infer<typeof FlashcardsSettingsSchema>;

export type FlashcardsQuestion = z.infer<typeof FlashcardsQuestionSchema>;
