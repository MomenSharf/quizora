import { z } from "zod";

import {  BaseQuestionSchema } from "./base";
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

export const FlashcardQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("FLASHCARD"),

  content: FlashcardSchema,
});

export type Flashcard = z.infer<typeof FlashcardSchema>;
export type FlashcardQuestion = z.infer<typeof FlashcardQuestionSchema>;