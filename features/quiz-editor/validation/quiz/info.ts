import { z } from "zod";

export const QuizInfoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(120, "Title must be at most 120 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description must be at most 1000 characters")
    .default(""),

  thumbnail: z.url().optional(),

  tags: z
    .array(
      z.string().trim().min(1).max(30)
    )
    .max(10)
    .default([]),

  language: z
    .string()
    .trim()
    .default("en"),

  category: z
    .string()
    .trim()
    .max(50)
    .optional(),
});

export type QuizInfo = z.infer<typeof QuizInfoSchema>;