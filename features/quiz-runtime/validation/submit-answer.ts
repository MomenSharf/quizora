import { z } from "zod";

const BaseAnswerFields = {
  questionId: z.string().min(1).max(128),
  answeredAt: z.number().int().nonnegative(),
  timeSpentSeconds: z.number().int().nonnegative().max(86400),
};

const SingleSelectAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("SINGLE_SELECT"),
  optionId: z.string().min(1).max(128),
});

const MultipleSelectAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("MULTIPLE_SELECT"),
  optionIds: z.array(z.string().min(1).max(128)).max(500),
});

const TrueFalseAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("TRUE_FALSE"),
  value: z.boolean(),
});

const OrderingAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("ORDERING"),
  orderedOptionIds: z
    .array(z.string().min(1).max(128))
    .max(500),
});

const MatchAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("MATCH"),
  selections: z
    .array(
      z.object({
        leftId: z.string().min(1).max(128),
        rightId: z.string().min(1).max(128),
      }),
    )
    .max(500),
});

const TypeAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("TYPE_ANSWER"),
  value: z.string().max(10000),
});

const FillBlankAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("FILL_BLANK"),
  entries: z
    .array(
      z.object({
        blankId: z.string().min(1).max(128),
        value: z.string().max(10000),
      }),
    )
    .max(500),
});

const FlashcardsAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("FLASHCARDS"),
  responses: z
    .array(
      z.object({
        cardId: z.string().min(1).max(128),
        rating: z.enum(["NEED_REVIEW", "KNOWN"]),
      }),
    )
    .max(500),
});

const RangeAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("RANGE"),
  value: z.number().finite(),
});

const GuessAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("GUESS"),
  value: z.number().finite(),
});

const TapFindAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("TAP_FIND"),
  targets: z
    .array(
      z.object({
        targetId: z.string().min(1).max(128),
        x: z.number().min(0).max(1),
        y: z.number().min(0).max(1),
      }),
    )
    .max(500),
});

const DropdownAnswerSchema = z.object({
  ...BaseAnswerFields,
  type: z.literal("DROPDOWN"),
  selections: z
    .array(
      z.object({
        blankId: z.string().min(1).max(128),
        optionId: z.string().min(1).max(128),
      }),
    )
    .max(500),
});

export const AnswerSchema = z.discriminatedUnion("type", [
  SingleSelectAnswerSchema,
  MultipleSelectAnswerSchema,
  TrueFalseAnswerSchema,
  OrderingAnswerSchema,
  MatchAnswerSchema,
  TypeAnswerSchema,
  FillBlankAnswerSchema,
  FlashcardsAnswerSchema,
  RangeAnswerSchema,
  GuessAnswerSchema,
  TapFindAnswerSchema,
  DropdownAnswerSchema,
]);

export const SubmitAnswerSchema = z.object({
  attemptId: z.string().min(1).max(128),
  questionId: z.string().min(1).max(128),
  answer: AnswerSchema,
  isFinalSubmission: z.boolean().default(false),
});

export type ValidatedAnswer = z.infer<typeof AnswerSchema>;

export type SubmitAnswerInput = z.infer<
  typeof SubmitAnswerSchema
>;