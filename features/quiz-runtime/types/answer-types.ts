export type RuntimeQuestionType =
  | "SINGLE_SELECT"
  | "MULTIPLE_SELECT"
  | "TRUE_FALSE"
  | "ORDERING"
  | "MATCH"
  | "TYPE_ANSWER"
  | "FILL_BLANK"
  | "FLASHCARDS"
  | "RANGE"
  | "GUESS"
  | "TAP_FIND"
  | "DROPDOWN";

export type SingleSelectAnswer = {
  type: "SINGLE_SELECT";
  optionId: string;
};

export type MultipleSelectAnswer = {
  type: "MULTIPLE_SELECT";
  optionIds: string[];
};

export type TrueFalseAnswer = {
  type: "TRUE_FALSE";
  value: boolean;
};

export type OrderingAnswer = {
  type: "ORDERING";
  orderedOptionIds: string[];
};

export type MatchSelection = {
  leftId: string;
  rightId: string;
};

export type MatchAnswer = {
  type: "MATCH";
  selections: MatchSelection[];
};

export type TypeAnswer = {
  type: "TYPE_ANSWER";
  value: string;
};

export type FillBlankEntry = {
  blankId: string;
  value: string;
};

export type FillBlankAnswer = {
  type: "FILL_BLANK";
  entries: FillBlankEntry[];
};

export type FlashcardResponse = {
  cardId: string;
  rating: "NEED_REVIEW" | "KNOWN";
};

export type FlashcardsAnswer = {
  type: "FLASHCARDS";
  responses: FlashcardResponse[];
};

export type RangeAnswer = {
  type: "RANGE";
  value: number;
};

export type GuessAnswer = {
  type: "GUESS";
  value: number;
};

export type TapFindTarget = {
  targetId: string;
  x: number;
  y: number;
};

export type TapFindAnswer = {
  type: "TAP_FIND";
  targets: TapFindTarget[];
};

export type DropdownEntry = {
  blankId: string;
  optionId: string;
};

export type DropdownAnswer = {
  type: "DROPDOWN";
  selections: DropdownEntry[];
};

export type Answer =
  | SingleSelectAnswer
  | MultipleSelectAnswer
  | TrueFalseAnswer
  | OrderingAnswer
  | MatchAnswer
  | TypeAnswer
  | FillBlankAnswer
  | FlashcardsAnswer
  | RangeAnswer
  | GuessAnswer
  | TapFindAnswer
  | DropdownAnswer;
