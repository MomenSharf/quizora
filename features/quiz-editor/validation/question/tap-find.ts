import { z } from "zod";
import { BaseQuestionConfigSchema, BaseQuestionSchema } from "./base";
import { ImageSchema } from "../quiz/image";

const RectTargetSchema = z.object({
  id: z.string(),
  label: z.string().trim().max(200),

  shape: z.literal("RECT"),

  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),

  width: z.number().positive().max(1),
  height: z.number().positive().max(1),
});

const CircleTargetSchema = z.object({
  id: z.string(),
  label: z.string().trim().max(200),

  shape: z.literal("CIRCLE"),

  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),

  radius: z.number().positive().max(1),
});

export const TapFindTargetSchema = z.discriminatedUnion("shape", [
  RectTargetSchema,
  CircleTargetSchema,
]);

export const TapFindDataSchema = z.object({
  image:ImageSchema.optional(),

  targets: z.array(TapFindTargetSchema).min(1).max(50),
});

export const TapFindConfigSchema = BaseQuestionConfigSchema.extend({
  showHints: z.boolean(),

  showTargetOutline: z.boolean(),

  allowMultipleClicks: z.boolean(),

  tolerance: z.number().int().min(0).max(50),
  zoomable: z.boolean(),

  revealTargetsAfterSubmit: z.boolean(),
});

export const TapFindQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("TAP_FIND"),

  content: TapFindDataSchema,

  config: TapFindConfigSchema,
});

export type TapFindTarget = z.infer<typeof TapFindTargetSchema>;

export type TapFindData = z.infer<typeof TapFindDataSchema>;

export type TapFindConfig = z.infer<typeof TapFindConfigSchema>;

export type TapFindQuestion = z.infer<typeof TapFindQuestionSchema>;
