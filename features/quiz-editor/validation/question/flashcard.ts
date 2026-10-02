import { z } from "zod";

import { BaseQuestionConfigSchema, BaseQuestionSchema } from "./base";
import { ImageSchema } from "../image";

export const FlashcardSchema = z.object({
  id: z.string().trim().min(1, "Card ID is required"),

  front: z.object({
    title: z
      .string()
      .trim()
      .max(200, "Front title must be at most 200 characters"),

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
      .max(200, "Back title must be at most 200 characters"),

    content: z
      .string()
      .trim()
      .min(1, "Back content cannot be empty")
      .max(5000, "Back content must be at most 5,000 characters"),

    image: ImageSchema.optional(),
  }),
});

export const FlashcardConfigSchema = BaseQuestionConfigSchema.extend({
  flipDirection: z.enum(["HORIZONTAL", "VERTICAL"], {
    message: "Please select a valid flip direction",
  }),

  startSide: z.enum(["FRONT", "BACK"], {
    message: "Please select a valid starting side",
  }),

  allowFlip: z.boolean(),

  autoFlip: z.boolean(),

  autoFlipDelay: z
    .number({
      message: "Auto-flip delay must be a number",
    })
    .int("Auto-flip delay must be a whole number")
    .nonnegative("Auto-flip delay cannot be negative"),
});

export const FlashcardQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("FLASHCARD"),

  content: FlashcardSchema,

  config: FlashcardConfigSchema,
});

export type Flashcard = z.infer<typeof FlashcardSchema>;
export type FlashcardConfig = z.infer<typeof FlashcardConfigSchema>;
export type FlashcardQuestion = z.infer<typeof FlashcardQuestionSchema>;