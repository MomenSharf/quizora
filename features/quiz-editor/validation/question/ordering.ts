import { z } from "zod";

import {
  BaseQuestionConfigSchema,
  BaseQuestionSchema,
  OptionSchema,
} from "./base";
import { MediaRatioSchema } from "../image";

export const OrderingDataSchema = z
  .object({
    options: z
      .array(OptionSchema)
      .min(2, "Add at least 2 items")
      .max(50, "You can add up to 50 items"),
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>();

    data.options.forEach((option, index) => {
      if (seen.has(option.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["options", index, "id"],
          message: "This option ID is already in use",
          params: {
            errorCode: "DUPLICATE_OPTION_ID",
          },
        });
      }

      seen.add(option.id);
    });
  });

export const OrderingConfigSchema = BaseQuestionConfigSchema.extend({
  showMedia: z.boolean(),

  mediaRatio: MediaRatioSchema,

  shuffleItems: z.boolean(),

  showNumbers: z.boolean(),

  layout: z.enum(["VERTICAL", "HORIZONTAL"], {
    message: "Please select a valid ordering layout",
  }),

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
