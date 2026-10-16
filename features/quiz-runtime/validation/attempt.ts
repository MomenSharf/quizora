import { z } from "zod";

import {
  RuntimeEnvironmentSchema,
  SessionModeSchema,
  StartAttemptSettingsSchema,
} from "./attempt-settings";

const IdSchema = z.string().min(1).max(128);

export const StartAttemptSchema = z.object({
  quizId: IdSchema,
  mode: SessionModeSchema,
  environment: RuntimeEnvironmentSchema,
  settings: StartAttemptSettingsSchema.optional(),
});

export const GetAttemptSchema = z.object({
  attemptId: IdSchema,
});

export const NavigateQuestionSchema = z.object({
  attemptId: IdSchema,
  targetIndex: z.number().int().nonnegative(),
});

export const PauseAttemptSchema = z.object({
  attemptId: IdSchema,
});

export const ResumeAttemptSchema = z.object({
  attemptId: IdSchema,
});

export const AbandonAttemptSchema = z.object({
  attemptId: IdSchema,
});

export const CompleteAttemptSchema = z.object({
  attemptId: IdSchema,
  confirm: z.literal(true),
});

export const RestartAttemptSchema = z.object({
  attemptId: IdSchema,
});

export const SaveQuestionProgressSchema = z.object({
  attemptId: IdSchema,
  questionId: IdSchema,
  timeSpentSeconds: z.number().int().nonnegative().max(86400),
});

export type StartAttemptInput = z.infer<
  typeof StartAttemptSchema
>;

export type GetAttemptInput = z.infer<
  typeof GetAttemptSchema
>;

export type NavigateQuestionInput = z.infer<
  typeof NavigateQuestionSchema
>;

export type PauseAttemptInput = z.infer<
  typeof PauseAttemptSchema
>;

export type ResumeAttemptInput = z.infer<
  typeof ResumeAttemptSchema
>;

export type AbandonAttemptInput = z.infer<
  typeof AbandonAttemptSchema
>;

export type CompleteAttemptInput = z.infer<
  typeof CompleteAttemptSchema
>;

export type RestartAttemptInput = z.infer<
  typeof RestartAttemptSchema
>;

export type SaveQuestionProgressInput = z.infer<
  typeof SaveQuestionProgressSchema
>;