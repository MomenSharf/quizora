"use client";

import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import type { QuizEditor } from "../validation/quiz";
import { getEditorIssues } from "../validation/editor-validation";
import { useEditorActions, useEditorStore } from "../store";
import { focusEditorField } from "../validation/quiz/focus-editor-field";

export function useEditorValidation() {
  const {
    trigger,
    getValues,
    formState: {
      errors,
      isValidating,
    },
  } = useFormContext<QuizEditor>();

  const attempted = useEditorStore(
    (state) => state.validation.attempted,
  );

  const { setValidationState, resetValidation, setActivePanel, selectQuestion } =
    useEditorActions();

  const issues = useMemo(
    () => getEditorIssues(errors),
    [errors],
  );

  const errorCount = issues.length;
  const firstErrorPath = issues[0]?.path ?? null;

  const validate = useCallback(async () => {
    setValidationState({
      attempted: true,
      isValidating: true,
    });

    const valid = await trigger(undefined, {
      shouldFocus: false,
    });

    setValidationState({
      attempted: true,
      isValidating: false,
      lastValidatedAt: new Date(),
    });

    return valid;
  }, [trigger, setValidationState]);

  const focusIssue = useCallback(
    (path: string) => {
      const values = getValues();

      const match = path.match(/^questions\.(\d+)(?:\.|$)/);

      if (match) {
        const questionIndex = Number(match[1]);
        const question = values.questions[questionIndex];

        if (question?.id) {
          setActivePanel("questions");
          selectQuestion(question.id);

          window.setTimeout(() => {
            focusEditorField(path);
          }, 0);

          return;
        }
      }

      focusEditorField(path);
    },
    [getValues, setActivePanel, selectQuestion],
  );

  const clearAttempt = useCallback(() => {
    resetValidation();
  }, [resetValidation]);

  return {
    errors,
    issues,
    errorCount,
    firstErrorPath,
    attempted,
    isValidating,
    isValid: errorCount === 0,
    validate,
    clearAttempt,
    focusIssue,
  };
}