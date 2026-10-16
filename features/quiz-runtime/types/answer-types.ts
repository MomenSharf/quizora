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

export type BaseAnswer = {
  questionId: string;
  answeredAt: number;
  timeSpentSeconds: number;
};

export type SingleSelectAnswer = BaseAnswer & {
  type: "SINGLE_SELECT";
  optionId: string;
};

export type MultipleSelectAnswer = BaseAnswer & {
  type: "MULTIPLE_SELECT";
  optionIds: string[];
};

export type TrueFalseAnswer = BaseAnswer & {
  type: "TRUE_FALSE";
  value: boolean;
};

export type OrderingAnswer = BaseAnswer & {
  type: "ORDERING";
  orderedOptionIds: string[];
};

export type MatchSelection = {
  leftId: string;
  rightId: string;
};

export type MatchAnswer = BaseAnswer & {
  type: "MATCH";
  selections: MatchSelection[];
};

export type TypeAnswer = BaseAnswer & {
  type: "TYPE_ANSWER";
  value: string;
};

export type FillBlankEntry = {
  blankId: string;
  value: string;
};

export type FillBlankAnswer = BaseAnswer & {
  type: "FILL_BLANK";
  entries: FillBlankEntry[];
};

export type FlashcardResponse = {
  cardId: string;
  rating: "NEED_REVIEW" | "KNOWN";
};

export type FlashcardsAnswer = BaseAnswer & {
  type: "FLASHCARDS";
  responses: FlashcardResponse[];
};

export type RangeAnswer = BaseAnswer & {
  type: "RANGE";
  value: number;
};

export type GuessAnswer = BaseAnswer & {
  type: "GUESS";
  value: number;
};

export type TapFindTarget = {
  targetId: string;
  x: number;
  y: number;
};

export type TapFindAnswer = BaseAnswer & {
  type: "TAP_FIND";
  targets: TapFindTarget[];
};

export type DropdownEntry = {
  blankId: string;
  optionId: string;
};

export type DropdownAnswer = BaseAnswer & {
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

export type AnswerPayload = Answer extends infer T
  ? T extends BaseAnswer
    ? Omit<T, keyof BaseAnswer>
    : never
  : never;

export type SaveAnswerInput = {
  attemptId: string;
  questionId: string;
  answer: Answer;
  isFinalSubmission: boolean;
};