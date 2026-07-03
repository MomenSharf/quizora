"use client";

import { useMemo } from "react";
import {
  useFormContext,
  useFormState,
} from "react-hook-form";

import type { QuizEditorForm } from "../quiz-editor.types";

export function useQuestionErrors(
  questionId: string,
) {
  const { control } =
    useFormContext<QuizEditorForm>();

  const { errors } = useFormState({
    control,
  });

  return useMemo(() => {
    return (
      errors.questions?.[questionId] ?? null
    );
  }, [errors.questions, questionId]);
}

export function useQuestionError(
  questionId: string,
  field: string,
) {
  const errors =
    useQuestionErrors(questionId);

  return useMemo(() => {
    if (!errors) {
      return undefined;
    }

    return (errors as Record<string, any>)[field]
      ?.message as string | undefined;
  }, [errors, field]);
}

export function useHasQuestionErrors(
  questionId: string,
) {
  const errors =
    useQuestionErrors(questionId);

  return !!errors;
}

export function useQuestionTitleError(
  questionId: string,
) {
  return useQuestionError(
    questionId,
    "title",
  );
}

export function useQuestionDescriptionError(
  questionId: string,
) {
  return useQuestionError(
    questionId,
    "description",
  );
}

export function useQuestionDataErrors(
  questionId: string,
) {
  const errors =
    useQuestionErrors(questionId);

  return useMemo(() => {
    return (errors as any)?.data;
  }, [errors]);
}