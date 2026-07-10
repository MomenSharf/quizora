import { z } from "zod";
import { BaseQuestionSchema } from "./base";

export const OrderingItemSchema = z.object({
  id: z.string().cuid(),

  text: z
    .string()
    .trim()
    .min(1)
    .max(500),

  image: z.url().optional(),
});

export const OrderingDataSchema = z.object({
  items: z
    .array(OrderingItemSchema)
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

export type OrderingItem = z.infer<typeof OrderingItemSchema>;

export type OrderingData = z.infer<typeof OrderingDataSchema>;

export type OrderingSettings = z.infer<
  typeof OrderingSettingsSchema
>;

export type OrderingQuestion = z.infer<
  typeof OrderingQuestionSchema
>;