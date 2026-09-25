import { z } from "zod";

import { BaseQuestionConfigSchema, BaseQuestionSchema } from "./base";
import { ImageSchema } from "../image";

const RectTargetSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Target ID is required"),

  label: z
    .string()
    .trim()
    .max(200, "Target label must be at most 200 characters")
    .default(""),

  shape: z.literal("RECT"),

  x: z
    .number({
      message: "Target X position must be a number",
    })
    .min(0, "Target X position cannot be negative")
    .max(1, "Target X position cannot exceed 1"),

  y: z
    .number({
      message: "Target Y position must be a number",
    })
    .min(0, "Target Y position cannot be negative")
    .max(1, "Target Y position cannot exceed 1"),

  width: z
    .number({
      message: "Target width must be a number",
    })
    .positive("Target width must be greater than zero")
    .max(1, "Target width cannot exceed 1"),

  height: z
    .number({
      message: "Target height must be a number",
    })
    .positive("Target height must be greater than zero")
    .max(1, "Target height cannot exceed 1"),
});

const CircleTargetSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Target ID is required"),

  label: z
    .string()
    .trim()
    .max(200, "Target label must be at most 200 characters")
    .default(""),

  shape: z.literal("CIRCLE"),

  x: z
    .number({
      message: "Target X position must be a number",
    })
    .min(0, "Target X position cannot be negative")
    .max(1, "Target X position cannot exceed 1"),

  y: z
    .number({
      message: "Target Y position must be a number",
    })
    .min(0, "Target Y position cannot be negative")
    .max(1, "Target Y position cannot exceed 1"),

  radius: z
    .number({
      message: "Target radius must be a number",
    })
    .positive("Target radius must be greater than zero")
    .max(1, "Target radius cannot exceed 1"),
});

export const TapFindTargetSchema = z.discriminatedUnion("shape", [
  RectTargetSchema,
  CircleTargetSchema,
]);

export const TapFindDataSchema = z
  .object({
    image: ImageSchema.optional(),

    targets: z
      .array(TapFindTargetSchema)
      .min(1, "Add at least one target")
      .max(50, "You can add up to 50 targets"),
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>();

    data.targets.forEach((target, index) => {
      if (seen.has(target.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["targets", index, "id"],
          message: "This target ID is already in use",
          params: {
            errorCode: "DUPLICATE_TARGET_ID",
          },
        });
      }

      seen.add(target.id);

      if (target.shape === "RECT") {
        if (target.x + target.width > 1) {
          ctx.addIssue({
            code: "custom",
            path: ["targets", index, "width"],
            message: "Target extends beyond the right edge of the image",
            params: {
              errorCode: "TARGET_OUT_OF_BOUNDS",
            },
          });
        }

        if (target.y + target.height > 1) {
          ctx.addIssue({
            code: "custom",
            path: ["targets", index, "height"],
            message: "Target extends beyond the bottom edge of the image",
            params: {
              errorCode: "TARGET_OUT_OF_BOUNDS",
            },
          });
        }
      }

      if (target.shape === "CIRCLE") {
        if (target.x + target.radius > 1 || target.x - target.radius < 0) {
          ctx.addIssue({
            code: "custom",
            path: ["targets", index, "radius"],
            message: "Target extends beyond the horizontal image bounds",
            params: {
              errorCode: "TARGET_OUT_OF_BOUNDS",
            },
          });
        }

        if (target.y + target.radius > 1 || target.y - target.radius < 0) {
          ctx.addIssue({
            code: "custom",
            path: ["targets", index, "radius"],
            message: "Target extends beyond the vertical image bounds",
            params: {
              errorCode: "TARGET_OUT_OF_BOUNDS",
            },
          });
        }
      }
    });
  });

export const TapFindConfigSchema = BaseQuestionConfigSchema.extend({
  showExplanation: z.boolean(),
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
