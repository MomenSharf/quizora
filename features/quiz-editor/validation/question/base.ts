import { QuestionType as QuestionTypePrisma } from "@/lib/db/generated/prisma/enums";
import { z } from "zod";

import { ImageSchema } from "../image";

export const QuestionTypeSchema = z.enum(QuestionTypePrisma, {
  message: "Please select a valid question type",
});

export const BaseQuestionSchema = z.object({
  id: z.string().trim().min(1, "Question ID is required"),

  type: QuestionTypeSchema,

  image: ImageSchema.optional(),

  title: z
    .string()
    .trim()
    .min(1, "Give your question a title")
    .max(5000, "Question title must be at most 5,000 characters"),

  points: z
    .number({
      message: "Points must be a number",
    })
    .nonnegative("Points cannot be negative"),

  explanation: z
    .string()
    .trim()
    .max(5000, "Explanation must be at most 5,000 characters")
    .optional(),

  explanationImage: ImageSchema.optional(),
});

/**
 * Shared answer/choice option.
 */
export const OptionSchema = z.object({
  id: z.string().trim().min(1, "Option ID is required"),

  text: z
    .string()
    .trim()
    .min(1, "Option text cannot be empty")
    .max(500, "Option text must be at most 500 characters"),

  image: ImageSchema.optional(),
});

export const ContentSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Content text cannot be empty")
    .max(500, "Content text must be at most 500 characters"),

  image: ImageSchema.optional(),
});

export const AcceptedAnswerSchema = z.object({
  id: z.string().trim().min(1, "Answer ID is required"),

  value: z
    .string()
    .trim()
    .min(1, "Accepted answer cannot be empty")
    .max(500, "Accepted answer must be at most 500 characters"),
});

export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export type BaseQuestion = z.infer<typeof BaseQuestionSchema>;

export type Option = z.infer<typeof OptionSchema>;

export type Content = z.infer<typeof ContentSchema>;

export type AcceptedAnswer = z.infer<typeof AcceptedAnswerSchema>;
