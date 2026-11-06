import { z } from "zod";

import {
  BaseQuestionSchema,
  ContentSchema,
} from "./base";
import { MediaRatioSchema } from "../image";

export const MatchPairSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Match pair ID is required"),

  left: ContentSchema,

  right: ContentSchema,
});

export const MatchDataSchema = z
  .object({
    pairs: z
      .array(MatchPairSchema)
      .min(2, "Add at least 2 matching pairs")
      .max(50, "You can add up to 50 matching pairs"),
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>();

    data.pairs.forEach((pair, index) => {
      if (seen.has(pair.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["pairs", index, "id"],
          message: "This match pair ID is already in use",
          params: {
            errorCode: "DUPLICATE_PAIR_ID",
          },
        });
      }

      seen.add(pair.id);
    });
  });


export const MatchQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("MATCH"),

  content: MatchDataSchema,
});

export type MatchPair = z.infer<typeof MatchPairSchema>;
export type MatchData = z.infer<typeof MatchDataSchema>;
export type MatchQuestion = z.infer<typeof MatchQuestionSchema>;
