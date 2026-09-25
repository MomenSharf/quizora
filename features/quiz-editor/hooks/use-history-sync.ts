"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { useEditorActions } from "../store";
import type { QuizEditor } from "../validation/quiz";

const MAX_HISTORY = 40;

export function useHistorySync() {
  const { reset, getValues, watch } = useFormContext<QuizEditor>();
  const { setHistory } = useEditorActions();

  const pastStack = useRef<QuizEditor[]>([]);
  const futureStack = useRef<QuizEditor[]>([]);

  const currentState = useRef<string>("");
  const isRestoring = useRef(false);

  const updateHistoryState = useCallback(() => {
    const past = pastStack.current.length;
    const future = futureStack.current.length;

    setHistory({
      canUndo: past > 0,
      canRedo: future > 0,
      index: past,
      size: past + future,
    });
  }, [setHistory]);

  const serialize = (state: QuizEditor) => JSON.stringify(state);

  const capture = useCallback(
    (state: QuizEditor) => {
      if (isRestoring.current) return;

      const serialized = serialize(state);

      // Nothing actually changed.
      if (serialized === currentState.current) return;

      // Save the current state before moving to the new state.
      if (currentState.current) {
        pastStack.current.push(JSON.parse(currentState.current) as QuizEditor);

        if (pastStack.current.length > MAX_HISTORY) {
          pastStack.current.shift();
        }
      }

      // Any new edit invalidates redo history.
      futureStack.current = [];

      currentState.current = serialized;

      updateHistoryState();
    },
    [updateHistoryState],
  );

  const restore = useCallback(
    (state: QuizEditor) => {
      isRestoring.current = true;

      currentState.current = serialize(state);

      reset(state, {
        keepDirty: true,
      });

      // reset() can synchronously trigger RHF subscribers,
      // so release the flag after the reset cycle.
      queueMicrotask(() => {
        isRestoring.current = false;
      });

      updateHistoryState();
    },
    [reset, updateHistoryState],
  );

  const undo = useCallback(() => {
    const previous = pastStack.current.pop();

    if (!previous) return;

    if (currentState.current) {
      futureStack.current.unshift(
        JSON.parse(currentState.current) as QuizEditor,
      );
    }

    restore(previous);
  }, [restore]);

  const redo = useCallback(() => {
    const next = futureStack.current.shift();

    if (!next) return;

    if (currentState.current) {
      pastStack.current.push(JSON.parse(currentState.current) as QuizEditor);

      if (pastStack.current.length > MAX_HISTORY) {
        pastStack.current.shift();
      }
    }

    restore(next);
  }, [restore]);

  /*
   * Initialize history.
   */
  useEffect(() => {
    currentState.current = serialize(getValues());

    pastStack.current = [];
    futureStack.current = [];

    updateHistoryState();
  }, [getValues, updateHistoryState]);

  /*
   * Listen to form changes.
   */
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (isRestoring.current) return;

      const isQuestionChange =
        !name || name === "questions" || name.startsWith("questions.");

      if (!isQuestionChange) return;

      capture(getValues());
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues, capture]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifier = event.ctrlKey || event.metaKey;

      if (!modifier) return;

      const key = event.key.toLowerCase();

      if (key === "z") {
        event.preventDefault();

        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }

        return;
      }

      if (key === "y") {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  return {
    undo,
    redo,
  };
}
