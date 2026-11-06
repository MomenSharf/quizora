import { z } from "zod";

import { BaseQuestionSchema } from "./base";
import { MediaRatioSchema } from "../image";

export const TrueFalseDataSchema = z.object({
  correctAnswer: z.boolean(),
});

export const TrueFalseQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TRUE_FALSE"),

  content: TrueFalseDataSchema,
});

export type TrueFalseData = z.infer<typeof TrueFalseDataSchema>;

export type TrueFalseQuestion = z.infer<typeof TrueFalseQuestionSchema>;
