"use client";

import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";

export default function TapFindPreview() {
   const color = QUESTION_TYPE_COLORS['FILL_BLANK'];
 

  const hotspots = [
    { x: "30%", y: "40%", active: false },
    { x: "55%", y: "60%", active: true },
    { x: "70%", y: "30%", active: false },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Tap on the Eiffel Tower location.
      </p>

      <div className="relative overflow-hidden rounded-xl border bg-muted/30">
        {/* mock image */}
        <div className="aspect-16/10 w-full bg-muted" />

        {/* hotspots */}
        {hotspots.map((h, i) => (
          <div
            key={i}
            className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              left: h.x,
              top: h.y,
              borderColor: color,
              backgroundColor: h.active ? color : "transparent",
            }}
          />
        ))}
      </div>

      <div
        className="flex items-center justify-center rounded-lg border border-dashed py-2 text-xs text-muted-foreground"
        style={{
          borderColor: `${color}55`,
        }}
      >
        Tap the correct area in the image
      </div>
    </div>
  );
}