import { z } from "zod";
export const MediaRatioSchema = z.enum(["AUTO", "1:1", "4:3", "3:2", "16:9"]);

export const ImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string().trim().max(200),
  caption: z.string().trim().max(300).optional(),
  ratio: MediaRatioSchema,
});

export type ImageData = z.infer<typeof ImageSchema>;
export type MediaRatio = z.infer<typeof MediaRatioSchema>;
