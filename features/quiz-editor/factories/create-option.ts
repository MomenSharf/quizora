import { createId } from "@paralleldrive/cuid2";

import type {
  Blank,
  Flashcard,
  MatchPair,
  Option,
  OrderingItem,
  // RangeLabel,
  // TapTarget,
} from "@/features/quiz-editor/validation/question";

export function createOption(
  text = "",
): Option {
  return {
    id: createId(),

    text,

    imageUrl: undefined,
  };
}

export function createMatchPair(): MatchPair {
  return {
    id: createId(),

    left: "",

    right: "",
  };
}

export function createOrderingItem(): OrderingItem {
  return {
    id: createId(),

    text: "",
  };
}

export function createBlank(): Blank {
  return {
    id: createId(),

    answer: "",

    alternatives: [],
  };
}

export function createFlashcard(): Flashcard {
  return {
    id: createId(),

    front: "",

    back: "",

    imageUrl: undefined,
  };
}

export function createRangeLabel(
  value: number,
): RangeLabel {
  return {
    id: createId(),

    value,

    label: "",
  };
}

export function createTapTarget(): TapTarget {
  return {
    id: createId(),

    x: 50,

    y: 50,

    radius: 24,

    label: "",
  };
}