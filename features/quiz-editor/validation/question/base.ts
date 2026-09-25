
import { QuestionType as QuestionTypePrisma } from "@/lib/db/generated/prisma/enums";
import { z } from "zod";

import { ImageSchema } from "../image";

/**
 * Question type
 */
export const QuestionTypeSchema = z.enum(QuestionTypePrisma, {
  message: "Please select a valid question type",
});

/**
 * Shared configuration used by every question.
 */
export const BaseQuestionConfigSchema = z.object({
  required: z.boolean(),

  timeLimit: z
    .number({
      message: "Time limit must be a number",
    })
    .int("Time limit must be a whole number")
    .nonnegative("Time limit cannot be negative"),

  points: z
    .number({
      message: "Points must be a number",
    })
    .nonnegative("Points cannot be negative"),
});

/**
 * Shared fields used by every question.
 */
export const BaseQuestionSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Question ID is required"),

  type: QuestionTypeSchema,

  title: z
    .string()
    .trim()
    .min(1, "Give your question a title")
    .max(500, "Question title must be at most 500 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Question description must be at most 2,000 characters")
    .default(""),

  explanation: z
    .string()
    .trim()
    .max(5000, "Explanation must be at most 5,000 characters")
    .default(""),

  hint: z
    .string()
    .trim()
    .max(1000, "Hint must be at most 1,000 characters")
    .default(""),

  image: ImageSchema.optional(),

  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Question tags cannot be empty")
        .max(30, "Each question tag must be at most 30 characters"),
    )
    .max(20, "You can add up to 20 tags to a question")
    .superRefine((tags, ctx) => {
      const seen = new Set<string>();

      tags.forEach((tag, index) => {
        const normalizedTag = tag.toLowerCase();

        if (seen.has(normalizedTag)) {
          ctx.addIssue({
            code: "custom",
            path: [index],
            message: "This tag has already been added",
           
          });
        }

        seen.add(normalizedTag);
      });
    }),

  difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
    message: "Please select a valid difficulty level",
  }),
});

/**
 * Shared answer/choice option.
 */
export const OptionSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Option ID is required"),

  text: z
    .string()
    .trim()
    .min(1, "Option text cannot be empty")
    .max(500, "Option text must be at most 500 characters"),

  image: ImageSchema.optional(),

  explanation: z
    .string()
    .trim()
    .max(1000, "Option explanation must be at most 1,000 characters")
    .default(""),
});

/**
 * Generic content item used by question types
 * that support text and/or an image.
 */
export const ContentSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Content text cannot be empty")
    .max(500, "Content text must be at most 500 characters"),

  image: ImageSchema.optional(),
});

/**
 * Accepted answer used by question types
 * that can have multiple accepted answers.
 */
export const AcceptedAnswerSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Answer ID is required"),

  value: z
    .string()
    .trim()
    .min(1, "Accepted answer cannot be empty")
    .max(500, "Accepted answer must be at most 500 characters"),
});

export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export type BaseQuestionConfig = z.infer<
  typeof BaseQuestionConfigSchema
>;

export type BaseQuestion = z.infer<typeof BaseQuestionSchema>;

export type Option = z.infer<typeof OptionSchema>;

export type Content = z.infer<typeof ContentSchema>;

export type AcceptedAnswer = z.infer<
  typeof AcceptedAnswerSchema
>;