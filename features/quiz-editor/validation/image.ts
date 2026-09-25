import { z } from "zod";

export const MediaRatioSchema = z.enum(["AUTO", "1:1", "4:3", "3:2", "16:9"], {
  message: "Please select a valid image ratio",
});

export const ImageSchema = z.object({
  id: z.string().trim().min(1, "Image ID is required"),

  url: z.string().trim().url("Please provide a valid image URL"),

  alt: z
    .string()
    .trim()
    .max(200, "Image alt text must be at most 200 characters")
    .default(""),

  caption: z
    .string()
    .trim()
    .max(300, "Image caption must be at most 300 characters")
    .optional(),

  key: z.string().trim().min(1, "Image storage key is required"),

  ratio: MediaRatioSchema,
});

export type ImageData = z.infer<typeof ImageSchema>;
export type MediaRatio = z.infer<typeof MediaRatioSchema>;
