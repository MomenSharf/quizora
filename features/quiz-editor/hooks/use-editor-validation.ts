"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import type { QuizEditor } from "../validation/quiz";

import {
  getEditorIssues,
  groupEditorIssues,
} from "../validation/editor-validation";

import { useEditorActions, useEditorStore } from "../store";

import { focusEditorField } from "../validation/quiz/focus-editor-field";

export function useEditorValidation() {
  const {
    trigger,
    getValues,
    clearErrors,
    control,
    formState: {
      errors,
      isValidating,
    },
  } = useFormContext<QuizEditor>();

  const formValues = useWatch({
    control,
  });

  const attempted = useEditorStore(
    (state) => state.validation.attempted,
  );

  const {
    setValidationState,
    resetValidation,
    setActivePanel,
    selectQuestion,
  } = useEditorActions();

  const validationRun = useRef(0);
  const isFirstValidationChange = useRef(true);

  const issues = useMemo(
    () => getEditorIssues(errors),
    [errors],
  );

  const issueGroups = useMemo(
    () => groupEditorIssues(issues),
    [issues],
  );

  const errorCount = issues.length;

  const firstErrorPath = issues[0]?.path ?? null;

  const firstQuestionWithError =
    issueGroups.find(
      (group) => group.questionIndex !== undefined,
    )?.questionIndex ?? null;

  const validate = useCallback(async () => {
    const run = ++validationRun.current;

    setValidationState({
      attempted: true,
      isValidating: true,
    });

    const valid = await trigger(undefined, {
      shouldFocus: false,
    });

    // Ignore an old validation result if validation was stopped
    // or another validation started after this one.
    if (run !== validationRun.current) {
      return false;
    }

    setValidationState({
      attempted: true,
      isValidating: false,
      lastValidatedAt: new Date(),
    });

    return valid;
  }, [trigger, setValidationState]);

  /**
   * Re-validate automatically after the user has
   * already attempted validation.
   */
  useEffect(() => {
    if (!attempted) {
      return;
    }

    // The values change after validate() has enabled attempted mode.
    // Don't trigger an unnecessary validation for that transition.
    if (isFirstValidationChange.current) {
      isFirstValidationChange.current = false;
      return;
    }

    void trigger(undefined, {
      shouldFocus: false,
    }).then(() => {
      setValidationState({
        attempted: true,
        isValidating: false,
        lastValidatedAt: new Date(),
      });
    });
  }, [formValues, attempted, trigger, setValidationState]);

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

  const stopValidation = useCallback(() => {
    validationRun.current += 1;

    clearErrors();
    resetValidation();

    isFirstValidationChange.current = true;
  }, [clearErrors, resetValidation]);

  return {
    errors,

    // Flat issues
    issues,

    // Issues grouped by question/section
    issueGroups,

    errorCount,
    firstErrorPath,
    firstQuestionWithError,

    attempted,
    isValidating,
    isValid: errorCount === 0,

    validate,
    stopValidation,
    focusIssue,
  };
}
