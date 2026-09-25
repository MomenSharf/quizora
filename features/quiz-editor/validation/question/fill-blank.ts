import { z } from "zod";

import {
  AcceptedAnswerSchema,
  BaseQuestionConfigSchema,
  BaseQuestionSchema,
} from "./base";
import { MediaRatioSchema } from "../image";

export const FillBlankBlockSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string().trim().min(1, "Text block ID is required"),

    type: z.literal("TEXT"),

    text: z
      .string()
      .trim()
      .min(1, "Text block cannot be empty")
      .max(5000, "Text block must be at most 5,000 characters"),
  }),

  z.object({
    id: z.string().trim().min(1, "Blank block ID is required"),

    type: z.literal("BLANK"),

    blankId: z.string().trim().min(1, "Blank ID is required"),
  }),
]);

export const BlankSchema = z.object({
  id: z.string().trim().min(1, "Blank ID is required"),

  answers: z
    .array(AcceptedAnswerSchema)
    .min(1, "Add at least one accepted answer")
    .max(20, "You can add up to 20 accepted answers"),

  placeholder: z
    .string()
    .trim()
    .max(100, "Placeholder must be at most 100 characters")
    .default(""),
});

export const FillBlankDataSchema = z
  .object({
    blocks: z
      .array(FillBlankBlockSchema)
      .min(1, "Add some text or a blank to your question"),

    blanks: z.array(BlankSchema).max(50, "You can add up to 50 blanks"),
  })
  .superRefine((data, ctx) => {
    const blankIds = new Set<string>();

    data.blanks.forEach((blank, index) => {
      if (blankIds.has(blank.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["blanks", index, "id"],
          message: "This blank ID is already in use",
        });
      }

      blankIds.add(blank.id);
    });

    const blockIds = new Set<string>();

    data.blocks.forEach((block, index) => {
      if (blockIds.has(block.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["blocks", index, "id"],
          message: "This block ID is already in use",
        });
      }

      blockIds.add(block.id);
    });

    const referencedBlankIds = new Set<string>();

    data.blocks.forEach((block, index) => {
      if (block.type !== "BLANK") return;

      if (!blankIds.has(block.blankId)) {
        ctx.addIssue({
          code: "custom",
          path: ["blocks", index, "blankId"],
          message: "This blank refers to an answer that does not exist",
        });
      }

      if (referencedBlankIds.has(block.blankId)) {
        ctx.addIssue({
          code: "custom",
          path: ["blocks", index, "blankId"],
          message: "This blank is already used in the question",
        });
      }

      referencedBlankIds.add(block.blankId);
    });

    data.blanks.forEach((blank, index) => {
      if (!referencedBlankIds.has(blank.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["blanks", index],
          message: "This blank is not used in the question",
    
        });
      }
    });
  });

export const FillBlankConfigSchema = BaseQuestionConfigSchema.extend({
  showMedia: z.boolean(),
  mediaRatio: MediaRatioSchema,

  caseSensitive: z.boolean(),
  trimWhitespace: z.boolean(),
  ignoreExtraSpaces: z.boolean(),

  autoResizeInputs: z.boolean(),

  showExplanation: z.boolean(),
});

export const FillBlankQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("FILL_BLANK"),

  content: FillBlankDataSchema,

  config: FillBlankConfigSchema,
});

export type FillBlankBlock = z.infer<typeof FillBlankBlockSchema>;
export type Blank = z.infer<typeof BlankSchema>;
export type FillBlankData = z.infer<typeof FillBlankDataSchema>;
export type FillBlankConfig = z.infer<typeof FillBlankConfigSchema>;
export type FillBlankQuestion = z.infer<typeof FillBlankQuestionSchema>;
