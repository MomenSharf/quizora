import { z } from "zod";
import {
  BaseQuestionConfigSchema,
  BaseQuestionSchema,
  OptionSchema,
} from "./base";
import { RatioSchema } from "../quiz/image";

export const SingleSelectDataSchema = z.object({
  options: z.array(OptionSchema).min(2).max(20),

  correctOptionid: z.string(),
});

export const SingleSelectConfigSchema = BaseQuestionConfigSchema.extend({
  showOptionMedia: z.boolean(),
  OptionMediaRatio: RatioSchema,
  suffleOptions: z.boolean(),
  showOptionLetters: z.boolean(),
  layout: z.enum(["VERTICAL", "HORIZONTAL", "GRID"]),
});

export const SingleSelectQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("SINGLE_SELECT"),

  content: SingleSelectDataSchema,

  config: SingleSelectConfigSchema,
});

export type SingleSelectData = z.infer<typeof SingleSelectDataSchema>;

export type SingleSelectConfig = z.infer<typeof SingleSelectConfigSchema>;

export type SingleSelectQuestion = z.infer<typeof SingleSelectQuestionSchema>;
