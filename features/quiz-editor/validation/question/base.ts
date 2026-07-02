import { z } from "zod";

export const QuestionTypeSchema = z.enum([
  "SINGLE_SELECT",
  "MULTIPLE_SELECT",
  "TRUE_FALSE",
  "DROPDOWN",
  "ORDERING",
  "MATCH",
  "TYPE_ANSWER",
  "FILL_BLANK",
  "FLASHCARDS",
  "RANGE",
  "LOCATION",
  "GUESS",
  "TAP_FIND",
]);

export const MediaSchema = z.object({
  image: z.url().optional(),
  video: z.url().optional(),
  audio: z.url().optional(),
});

export const BaseQuestionSchema = z.object({
  id: z.string().cuid(),

  type: QuestionTypeSchema,

  title: z
    .string()
    .trim()
    .min(1, "Question title is required")
    .max(500),

  description: z
    .string()
    .trim()
    .max(2000)
    .default(""),

  required: z.boolean().default(true),

  points: z
    .number()
    .min(0)
    .default(1),

  hint: z
    .string()
    .trim()
    .max(1000)
    .default(""),

  explanation: z
    .string()
    .trim()
    .max(5000)
    .default(""),

  media: MediaSchema.default({}),

});

export const OptionSchema = z.object({
  id: z.string().cuid(),

  text: z.string().trim().min(1).max(500),

  image: z.url().optional(),

  explanation: z
    .string()
    .trim()
    .max(1000)
    .default(""),
});

export const ContentSchema = z.object({
  text: z.string().trim().min(1).max(500),
  image: z.url().optional(),
});

export const AcceptedAnswerSchema = z.object({
  id: z.string().cuid(),

  value: z.string().trim().min(1).max(500),
});

export type AcceptedAnswer = z.infer<typeof AcceptedAnswerSchema>;

export type Content = z.infer<typeof ContentSchema>;

export type Option = z.infer<typeof OptionSchema>;

export type QuestionType = z.infer<typeof QuestionTypeSchema>;
export type BaseQuestion = z.infer<typeof BaseQuestionSchema>;