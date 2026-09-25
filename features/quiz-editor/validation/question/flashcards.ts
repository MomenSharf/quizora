import { z } from "zod";

import { BaseQuestionConfigSchema, BaseQuestionSchema } from "./base";
import { ImageSchema } from "../image";

export const FlashcardSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Card ID is required"),

  front: z.object({
    title: z
      .string()
      .trim()
      .max(200, "Front title must be at most 200 characters")
      .default(""),

    content: z
      .string()
      .trim()
      .min(1, "Front content cannot be empty")
      .max(5000, "Front content must be at most 5,000 characters"),

    image: ImageSchema.optional(),
  }),

  back: z.object({
    title: z
      .string()
      .trim()
      .max(200, "Back title must be at most 200 characters")
      .default(""),

    content: z
      .string()
      .trim()
      .min(1, "Back content cannot be empty")
      .max(5000, "Back content must be at most 5,000 characters"),

    image: ImageSchema.optional(),
  }),
});

export const FlashcardsDataSchema = z
  .object({
    cards: z
      .array(FlashcardSchema)
      .min(1, "Add at least one flashcard")
      .max(500, "You can add up to 500 flashcards"),
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>();

    data.cards.forEach((card, index) => {
      if (seen.has(card.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["cards", index, "id"],
          message: "This card ID is already in use",
          
        });
      }

      seen.add(card.id);
    });
  });

export const FlashcardsConfigSchema = BaseQuestionConfigSchema.extend({
  shuffleCards: z.boolean(),

  flipDirection: z.enum(["HORIZONTAL", "VERTICAL"], {
    message: "Please select a valid flip direction",
  }),

  startSide: z.enum(["FRONT", "BACK"], {
    message: "Please select a valid starting side",
  }),

  allowFlip: z.boolean(),

  loopCards: z.boolean(),

  showProgress: z.boolean(),

  autoFlip: z.boolean(),

  autoFlipDelay: z
    .number({
      message: "Auto-flip delay must be a number",
    })
    .int("Auto-flip delay must be a whole number")
    .nonnegative("Auto-flip delay cannot be negative"),
});

export const FlashcardsQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("FLASHCARDS"),

  content: FlashcardsDataSchema,

  config: FlashcardsConfigSchema,
});

export type Flashcard = z.infer<typeof FlashcardSchema>;
export type FlashcardsData = z.infer<typeof FlashcardsDataSchema>;
export type FlashcardsConfig = z.infer<typeof FlashcardsConfigSchema>;
export type FlashcardsQuestion = z.infer<typeof FlashcardsQuestionSchema>;
