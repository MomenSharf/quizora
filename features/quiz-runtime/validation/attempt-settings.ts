import { z } from "zod";

export const SessionModeSchema = z.enum([
  "PRACTICE",
  "TEST",
]);

export const RuntimeEnvironmentSchema = z.enum([
  "PREVIEW",
  "PRODUCTION",
]);

export const QuestionNavigationSchema = z.enum([
  "SEQUENTIAL",
  "FREE",
]);

export const QuestionResultVisibilitySchema = z.enum([
  "IMMEDIATE",
  "AFTER_SUBMISSION",
  "HIDDEN",
]);

export const ScoreVisibilitySchema = z.enum([
  "ALWAYS",
  "AFTER_QUESTION",
  "AFTER_SUBMISSION",
  "HIDDEN",
]);

export const AttemptSettingsSchema = z
  .object({
    version: z.literal(1),

    mode: SessionModeSchema,

    navigation: QuestionNavigationSchema,

    allowSkip: z.boolean(),
    allowQuestionRetry: z.boolean(),
    allowAnswerChange: z.boolean(),

    questionTimerEnabled: z.boolean(),
    defaultQuestionTimeLimit: z
      .number()
      .int()
      .positive()
      .max(3600)
      .nullable(),

    totalTimerEnabled: z.boolean(),
    totalTimeLimitSeconds: z
      .number()
      .int()
      .positive()
      .max(86400)
      .nullable(),

    resultVisibility: QuestionResultVisibilitySchema,
    scoreVisibility: ScoreVisibilitySchema,
    showExplanations: z.boolean(),

    shuffleQuestions: z.boolean(),
    shuffleAnswers: z.boolean(),
  })
  .superRefine((settings, ctx) => {
    if (
      !settings.questionTimerEnabled &&
      settings.defaultQuestionTimeLimit !== null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["defaultQuestionTimeLimit"],
        message:
          "The default question time limit must be null when the question timer is disabled.",
      });
    }

    if (
      !settings.totalTimerEnabled &&
      settings.totalTimeLimitSeconds !== null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["totalTimeLimitSeconds"],
        message:
          "The total time limit must be null when the total timer is disabled.",
      });
    }
  });

export const StartAttemptSettingsSchema =
  AttemptSettingsSchema.omit({
    version: true,
    mode: true,
  }).partial();

export type AttemptSettingsInput = z.input<
  typeof AttemptSettingsSchema
>;

export type ValidatedAttemptSettings = z.output<
  typeof AttemptSettingsSchema
>;

export type StartAttemptSettings = z.output<
  typeof StartAttemptSettingsSchema
>;