import { z } from "zod";
import { BaseQuestionSchema } from "./base";

export const CoordinateSchema = z.object({
  lat: z.number().min(-90).max(90),

  lng: z.number().min(-180).max(180),
});

export const LocationAnswerSchema = z.object({
  coordinate: CoordinateSchema,

  radius: z.number().positive().default(100),
});

export const LocationDataSchema = z.object({
  answer: z.array(LocationAnswerSchema).min(1),
  initialCenter: CoordinateSchema.optional(),

  initialZoom: z.number().int().min(1).max(22).default(12),
});

export const LocationSettingsSchema = z.object({
  mapType: z
    .enum(["ROADMAP", "SATELLITE", "HYBRID", "TERRAIN"])
    .default("ROADMAP"),

  allowZoom: z.boolean().default(true),

  allowPan: z.boolean().default(true),

  showMarker: z.boolean().default(true),

  showRadius: z.boolean().default(false),

  showCoordinates: z.boolean().default(false),

  lockMapBounds: z.boolean().default(false),
});

export const LocationQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("LOCATION"),

  data: LocationDataSchema,

  settings: LocationSettingsSchema,
});

export type Coordinate = z.infer<typeof CoordinateSchema>;

export type LocationAnswer = z.infer<typeof LocationAnswerSchema>;

export type LocationData = z.infer<typeof LocationDataSchema>;

export type LocationSettings = z.infer<typeof LocationSettingsSchema>;

export type LocationQuestion = z.infer<typeof LocationQuestionSchema>;
