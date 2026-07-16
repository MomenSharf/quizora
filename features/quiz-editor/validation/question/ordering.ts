import { z } from "zod";
import { BaseQuestionSchema, OptionSchema } from "./base";


export const OrderingDataSchema = z.object({
  options: z
    .array(OptionSchema)
    .min(2)
    .max(50),
});

export const OrderingSettingsSchema = z.object({
  randomizeItems: z.boolean(),

  layout: z
    .enum([
      "VERTICAL",
      "HORIZONTAL",
    ])
,
  showNumbers: z.boolean(),

  allowRetry: z.boolean(),
});

export const OrderingQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("ORDERING"),

  content: OrderingDataSchema,

  config: OrderingSettingsSchema,
});


export type OrderingData = z.infer<typeof OrderingDataSchema>;

export type OrderingSettings = z.infer<
  typeof OrderingSettingsSchema
>;

export type OrderingQuestion = z.infer<
  typeof OrderingQuestionSchema
>;