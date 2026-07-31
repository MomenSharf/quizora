import { z } from "zod";
import { BaseQuestionConfigSchema, BaseQuestionSchema, ContentSchema } from "./base";

export const MatchPairSchema = z.object({
  id: z.string(),

  left: ContentSchema,
  right: ContentSchema,
});

export const MatchDataSchema = z.object({
  pairs: z.array(MatchPairSchema).min(2).max(50),
});

export const MatchConfigSchema = BaseQuestionConfigSchema.extend({
  randomizeLeft: z.boolean(),

  randomizeRight: z.boolean(),

  layout: z.enum(["LINES", "DROPDOWN", "DRAG_DROP"]),
  showImages: z.boolean(),

  allowRetry: z.boolean(),
});

export const MatchQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("MATCH"),

  content: MatchDataSchema,

  config: MatchConfigSchema,
});

export type MatchPair = z.infer<typeof MatchPairSchema>;

export type MatchData = z.infer<typeof MatchDataSchema>;

export type MatchSettings = z.infer<typeof MatchConfigSchema>;

export type MatchQuestion = z.infer<typeof MatchQuestionSchema>;
