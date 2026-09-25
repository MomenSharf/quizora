import { z } from "zod";

import { QuestionSchema } from "./question";
import { ImageSchema } from "./image";
import { QuizStatus } from "@/lib/db/generated/prisma/enums";

export const QuizEditorSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Quiz ID is required"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug cannot be empty")
    .max(120, "Slug must be at most 120 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    )
    .optional(),





  visibility: z.enum(["PRIVATE", "UNLISTED", "PUBLIC"], {
    message: "Please select a valid visibility option",
  }),

  title: z
    .string()
    .trim()
    .min(1, "Give your quiz a title")
    .max(120, "Quiz titles can be at most 120 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Descriptions can be at most 1,000 characters")
    .default(""),

  thumbnail: ImageSchema.optional(),

  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Tags cannot be empty")
        .max(30, "Each tag can be at most 30 characters"),
    )
    .max(10, "You can add up to 10 tags")
    .superRefine((tags, ctx) => {
      const normalizedTags = tags.map((tag) => tag.toLowerCase());
      const seen = new Set<string>();

      normalizedTags.forEach((tag, index) => {
        if (seen.has(tag)) {
          ctx.addIssue({
            code: "custom",
            path: [index],
            message: "This tag has already been added",
          
          });
        }

        seen.add(tag);
      });
    }),

  language: z
    .string()
    .trim()
    .min(1, "Please select a language")
    .max(20, "Language name is too long"),

  category: z
    .string()
    .trim()
    .max(50, "Category must be at most 50 characters")
    .optional(),

  questions: z
    .array(QuestionSchema)
    .min(1, "Add at least one question to your quiz"),
});

export type QuizEditor = z.infer<typeof QuizEditorSchema>;
export type QuizEditorInput = z.input<typeof QuizEditorSchema>;