import { z } from "zod";
import { BaseQuestionSchema } from "./base";

export const TapFindTargetSchema = z.object({
  id: z.string().cuid(),

  label: z
    .string()
    .trim()
    .max(200)
,
  shape: z.enum([
    "CIRCLE",
    "RECT",
    "POLYGON",
    "POINT",
  ]),

  coordinates: z
    .array(
      z.object({
        x: z.number().min(0).max(1),
        y: z.number().min(0).max(1),
      })
    )
    .min(1),
});

export const TapFindDataSchema = z.object({
  image: z.url(),

  targets: z
    .array(TapFindTargetSchema)
    .min(1)
    .max(50),
});

export const TapFindSettingsSchema = z.object({
  showHints: z.boolean(),

  showTargetOutline: z.boolean(),

  allowMultipleClicks: z.boolean(),

  tolerance: z
    .number()
    .int()
    .min(0)
    .max(50)
,
  zoomable: z.boolean(),

  revealTargetsAfterSubmit: z.boolean(),
});

export const TapFindQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TAP_FIND"),

  content: TapFindDataSchema,

  config: TapFindSettingsSchema,
});

export type TapFindTarget = z.infer<typeof TapFindTargetSchema>;

export type TapFindData = z.infer<typeof TapFindDataSchema>;

export type TapFindSettings = z.infer<
  typeof TapFindSettingsSchema
>;

export type TapFindQuestion = z.infer<
  typeof TapFindQuestionSchema
>;