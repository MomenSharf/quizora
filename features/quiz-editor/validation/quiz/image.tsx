import { z } from "zod";
const RatioSchema = z.enum(["AUTO", "1:1", "4:3", "3:2", "16:9"]);

export const ImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string().trim().max(200),
  caption: z.string().trim().max(300).optional(),
  ratio: RatioSchema,
});

export type ImageData = z.infer<typeof ImageSchema>;
export type Ratio = z.infer<typeof RatioSchema>;
