import { z } from "zod";
import { BaseQuestionSchema } from "./base";

export const CoordinateSchema = z.object({
  lat: z.number().min(-90).max(90),

  lng: z.number().min(-180).max(180),
});

export const LocationAnswerSchema = z.object({
  coordinate: CoordinateSchema,

  radius: z.number().positive(),
});

export const LocationDataSchema = z.object({
  answer: z.array(LocationAnswerSchema).min(1),
  initialCenter: CoordinateSchema.optional(),

  initialZoom: z.number().int().min(1).max(22),
});

export const LocationSettingsSchema = z.object({
  mapType: z
    .enum(["ROADMAP", "SATELLITE", "HYBRID", "TERRAIN"])
,
  allowZoom: z.boolean(),

  allowPan: z.boolean(),

  showMarker: z.boolean(),

  showRadius: z.boolean(),

  showCoordinates: z.boolean(),

  lockMapBounds: z.boolean(),
});

export const LocationQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("LOCATION"),

  content: LocationDataSchema,

  config: LocationSettingsSchema,
});

export type Coordinate = z.infer<typeof CoordinateSchema>;

export type LocationAnswer = z.infer<typeof LocationAnswerSchema>;

export type LocationData = z.infer<typeof LocationDataSchema>;

export type LocationSettings = z.infer<typeof LocationSettingsSchema>;

export type LocationQuestion = z.infer<typeof LocationQuestionSchema>;
