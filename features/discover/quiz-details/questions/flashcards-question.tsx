
import {  IconCheck, IconLayersDifference } from "@tabler/icons-react";

export interface FlashcardsQuestionData {
  cards: {
    id: string;
    front: string;
    back: string;
  }[];
}

export function FlashcardsQuestion({
  data,
  showAnswers,
}: {
  data: FlashcardsQuestionData;
  showAnswers: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {data.cards.map((card, index) => (
        <div key={card.id} className="overflow-hidden rounded-xl border">
          <div className="flex items-center gap-2 border-b bg-muted/30 p-3">
            <IconLayersDifference className="size-4 text-muted-foreground" />
            <span className="text-xs font-semibold">CARD {index + 1}</span>
          </div>

          <div className="space-y-3 p-4">
            <div>
              <p className="mb-1 text-xs text-muted-foreground">FRONT</p>
              <p className="text-sm font-medium">{card.front}</p>
            </div>

            {showAnswers && (
              <div className="border-t pt-3">
                <p className="mb-1 flex items-center gap-1 text-xs text-emerald-600">
                  <IconCheck className="size-3.5" />
                  BACK
                </p>
                <p className="text-sm">{card.back}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
