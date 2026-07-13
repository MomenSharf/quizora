
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import type { LocationQuestion } from "../../validation/question/location";
import { createBaseQuestion } from "./create-default-question";

export function createLocationQuestion(): LocationQuestion {
  return {
   ...createBaseQuestion(),

    type: QuestionType.LOCATION,

    title: "Location",

    content: {
      answer: [
        {
          coordinate: {
            lat: 0,
            lng: 0,
          },

          radius: 100,
        },
      ],

      initialCenter: {
        lat: 0,
        lng: 0,
      },

      initialZoom: 12,
    },

    config: {
      mapType: "ROADMAP",
      allowZoom: true,
      allowPan: true,
      showMarker: true,
      showRadius: false,
      showCoordinates: false,
      lockMapBounds: false,
    },
  };
}
