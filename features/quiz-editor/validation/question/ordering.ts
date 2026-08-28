import { z } from "zod";
import {
  BaseQuestionConfigSchema,
  BaseQuestionSchema,
  OptionSchema,
} from "./base";
import { MediaRatioSchema } from "../quiz/image";

export const OrderingDataSchema = z.object({
  options: z.array(OptionSchema).min(2).max(50),
});

export const OrderingConfigSchema = BaseQuestionConfigSchema.extend({
  showMedia: z.boolean(),
  mediaRatio: MediaRatioSchema,

  shuffleItems: z.boolean(),
  showNumbers: z.boolean(),

  layout: z.enum(["VERTICAL", "HORIZONTAL"]),

  showExplanation: z.boolean(),
});

export const OrderingQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("ORDERING"),

  content: OrderingDataSchema,

  config: OrderingConfigSchema,
});

export type OrderingData = z.infer<typeof OrderingDataSchema>;

export type OrderingConfig = z.infer<typeof OrderingConfigSchema>;

export type OrderingQuestion = z.infer<typeof OrderingQuestionSchema>;
