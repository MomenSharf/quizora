import { z } from "zod";

export const questionTypes = [
  "multiple_choice",
  "checkbox",
  "short_text",
  "long_text",
  "true_false",
  "rating",
] as const;

export const questionTypeSchema = z.enum(questionTypes);

const baseQuestionSchema = z.object({
  id: z.string(),
  type: questionTypeSchema,
  title: z.string(),
  description: z.string().optional(),
  required: z.boolean().default(false),
});

const multipleChoiceQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("multiple_choice"),
  config: z.object({
    options: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    ),
    allowMultiple: z.boolean().default(false),
    allowOther: z.boolean().default(false),
  }),
});

const checkboxQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("checkbox"),
  config: z.object({
    options: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    ),
    minSelections: z.number().optional(),
    maxSelections: z.number().optional(),
  }),
});

const shortTextQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("short_text"),
  config: z.object({
    placeholder: z.string().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
  }),
});

const longTextQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("long_text"),
  config: z.object({
    placeholder: z.string().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
  }),
});

const trueFalseQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("true_false"),
  config: z.object({}),
});

const ratingQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("rating"),
  config: z.object({
    min: z.number().default(1),
    max: z.number().default(5),
    step: z.number().default(1),
  }),
});

export const questionSchema = z.discriminatedUnion("type", [
  multipleChoiceQuestionSchema,
  checkboxQuestionSchema,
  shortTextQuestionSchema,
  longTextQuestionSchema,
  trueFalseQuestionSchema,
  ratingQuestionSchema,
]);

export const questionsSchema = z.array(questionSchema);

export type Question = z.infer<typeof questionSchema>;
export type Questions = z.infer<typeof questionsSchema>;
export type QuestionType = z.infer<typeof questionTypeSchema>;