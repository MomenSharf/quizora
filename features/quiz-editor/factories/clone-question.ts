import { createId } from "@paralleldrive/cuid2";

import type { Question } from "@/features/quiz-editor/validation/question";

export function cloneQuestion<T extends Question>(
  question: T,
): T {
  const cloned = structuredClone(question);

  cloned.id = createId();

  switch (cloned.type) {
    case "SINGLE_SELECT": {
      const idMap = new Map<string, string>();

      cloned.data.options = cloned.data.options.map((option) => {
        const id = createId();

        idMap.set(option.id, id);

        return {
          ...option,
          id,
        };
      });

      cloned.data.correctOptionId =
        idMap.get(cloned.data.correctOptionId)!;

      break;
    }

    case "MULTIPLE_SELECT": {
      const idMap = new Map<string, string>();

      cloned.data.options = cloned.data.options.map((option) => {
        const id = createId();

        idMap.set(option.id, id);

        return {
          ...option,
          id,
        };
      });

      cloned.data.correctOptionIds =
        cloned.data.correctOptionIds.map(
          (id) => idMap.get(id)!,
        );

      break;
    }

    case "MATCH":
      cloned.data.pairs = cloned.data.pairs.map((pair) => ({
        ...pair,
        id: createId(),
      }));
      break;

    case "ORDERING":
      cloned.data.items = cloned.data.items.map((item) => ({
        ...item,
        id: createId(),
      }));
      break;

    case "FILL_BLANK":
      cloned.data.blanks = cloned.data.blanks.map((blank) => ({
        ...blank,
        id: createId(),
      }));
      break;

    case "FLASHCARD":
      cloned.data.cards = cloned.data.cards.map((card) => ({
        ...card,
        id: createId(),
      }));
      break;

    case "LOCATION":
      cloned.data.markers = cloned.data.markers.map((marker) => ({
        ...marker,
        id: createId(),
      }));
      break;

    case "RANGE":
      cloned.data.labels = cloned.data.labels.map((label) => ({
        ...label,
        id: createId(),
      }));
      break;

    case "TAB_FIND":
      cloned.data.targets = cloned.data.targets.map((target) => ({
        ...target,
        id: createId(),
      }));
      break;

    default:
      break;
  }

  return cloned;
}