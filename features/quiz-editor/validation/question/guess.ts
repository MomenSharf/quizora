import { z } from "zod";

import {
  AcceptedAnswerSchema,
  BaseQuestionConfigSchema,
  BaseQuestionSchema,
} from "./base";

export const GuessHintSchema = z.object({
  id: z.string().trim().min(1, "Hint ID is required"),

  value: z
    .string()
    .trim()
    .min(1, "Hint cannot be empty")
    .max(500, "Hint must be at most 500 characters"),
});

export const GuessDataSchema = z
  .object({
    mode: z.enum(["TEXT", "IMAGE"], {
      message: "Please select a valid guess mode",
    }),

    text: z
      .string()
      .trim()
      .max(5000, "Guess text must be at most 5,000 characters")
      .default(""),

    image: z
      .string()
      .trim()
      .url("Please provide a valid image URL")
      .optional()
      .or(z.literal("")),

    hints: z
      .array(GuessHintSchema)
      .min(1, "Add at least one hint")
      .max(20, "You can add up to 20 hints"),

    answers: z
      .array(AcceptedAnswerSchema)
      .min(1, "Add at least one accepted answer")
      .max(50, "You can add up to 50 accepted answers"),
  })
  .superRefine((data, ctx) => {
    const hintIds = new Set<string>();

    data.hints.forEach((hint, index) => {
      if (hintIds.has(hint.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["hints", index, "id"],
          message: "This hint ID is already in use",
    
        });
      }

      hintIds.add(hint.id);
    });

    if (data.mode === "TEXT" && !data.text) {
      ctx.addIssue({
        code: "custom",
        path: ["text"],
        message: "Add some text for the player to guess",
   
      });
    }

    if (data.mode === "IMAGE" && !data.image) {
      ctx.addIssue({
        code: "custom",
        path: ["image"],
        message: "Add an image for the player to guess",
      
      });
    }
  });

export const GuessConfigSchema = BaseQuestionConfigSchema.extend({
  caseSensitive: z.boolean(),

  trimWhitespace: z.boolean(),

  ignoreExtraSpaces: z.boolean(),

  revealAnswerAfterSubmit: z.boolean(),

  maxAttempts: z
    .number({
      message: "Maximum attempts must be a number",
    })
    .int("Maximum attempts must be a whole number")
    .nonnegative("Maximum attempts cannot be negative"),

  showHint: z.boolean(),

  zoomable: z.boolean(),
});

export const GuessQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("GUESS"),

  content: GuessDataSchema,

  config: GuessConfigSchema,
});

export type GuessHint = z.infer<typeof GuessHintSchema>;
export type GuessData = z.infer<typeof GuessDataSchema>;
export type GuessConfig = z.infer<typeof GuessConfigSchema>;
export type GuessQuestion = z.infer<typeof GuessQuestionSchema>;
