import { QuestionType as QuestionTypePrisma } from "@/lib/db/generated/prisma/enums";
import { z } from "zod";
import { ImageSchema } from "../quiz/image";

export const QuestionTypeSchema = z.enum(QuestionTypePrisma);

export const BaseQuestionConfigSchema = z.object({
  required: z.boolean(),

  showExplanation: z.boolean(),

  showMedia: z.boolean(),

  allowSkip: z.boolean(),

  timeLimit: z.number().int().min(0),

  maxAttempts: z.number().int().min(0),

  points: z.number().min(0),
});

export const BaseQuestionSchema = z.object({
  id: z.string(),

  type: QuestionTypeSchema,

  title: z.string().trim().min(1, "Question title is required").max(500),

  description: z.string().trim().max(2000),

  explanation: z.string().trim().max(5000),

  hint: z.string().trim().max(1000),

  image: ImageSchema.optional(),

  tags: z.array(z.string().trim().min(1).max(30)).max(20),

  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),

});

export const OptionSchema = z.object({
  id: z.string(),

  text: z.string().trim().min(1).max(500),

  image: ImageSchema.optional(),

  explanation: z.string().trim().max(1000),
});

export const ContentSchema = z.object({
  text: z.string().trim().min(1).max(500),

  image: ImageSchema.optional(),
});

export const AcceptedAnswerSchema = z.object({
  id: z.string(),

  value: z.string().trim().min(1).max(500),
});

export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export type BaseQuestionConfig = z.infer<typeof BaseQuestionConfigSchema>;

export type BaseQuestion = z.infer<typeof BaseQuestionSchema>;

export type Option = z.infer<typeof OptionSchema>;

export type Content = z.infer<typeof ContentSchema>;

export type AcceptedAnswer = z.infer<typeof AcceptedAnswerSchema>;