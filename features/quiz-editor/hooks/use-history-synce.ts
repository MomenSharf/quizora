"use client";

import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useEditorActions } from "../store";
import type { QuizEditor } from "../validation/quiz";

export function useHistorySync() {
  const { reset, getValues, watch } = useFormContext<QuizEditor>();
  const { setHistory } = useEditorActions();

  // Maintain pristine historical undo and redo structural tracking states
  const pastStack = useRef<QuizEditor[]>([]);
  const futureStack = useRef<QuizEditor[]>([]);
  const lastCapturedState = useRef<string>("");

  // Helper to accurately refresh state flags across Zustand contexts
  const updateStoreMetrics = () => {
    setHistory({
      canUndo: pastStack.current.length > 0,
      canRedo: futureStack.current.length > 0,
      size: pastStack.current.length + futureStack.current.length,
      index: pastStack.current.length,
    });
  };

  // Push an explicit snapshot to the history stack
  const captureCheckpoint = (state: QuizEditor) => {
    const generalizedString = JSON.stringify(state);
    if (generalizedString === lastCapturedState.current) return;

    if (lastCapturedState.current) {
      pastStack.current.push(JSON.parse(lastCapturedState.current));
      // Cap timeline memory depth to protect performance profiles
      if (pastStack.current.length > 40) pastStack.current.shift();
      futureStack.current = []; // Clear the redo history path on new interactions
    }

    lastCapturedState.current = generalizedString;
    updateStoreMetrics();
  };

  // Initialize initial structural parameters
  useEffect(() => {
    const currentValues = getValues();
    lastCapturedState.current = JSON.stringify(currentValues);
    
    // Automatically capture structural variations (such as modifications to the questions array)
    const subscription = watch((value, { name, type }) => {
      if (name === "questions" || !name) {
        captureCheckpoint(getValues());
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  // Handle manual undo/redo operations
  useEffect(() => {
    const handleUndo = () => {
      if (pastStack.current.length === 0) return;

      const previous = pastStack.current.pop()!;
      if (lastCapturedState.current) {
        futureStack.current.unshift(JSON.parse(lastCapturedState.current));
      }

      lastCapturedState.current = JSON.stringify(previous);
      reset(previous, { keepDirty: true });
      updateStoreMetrics();
    };

    const handleRedo = () => {
      if (futureStack.current.length === 0) return;

      const next = futureStack.current.shift()!;
      if (lastCapturedState.current) {
        pastStack.current.push(JSON.parse(lastCapturedState.current));
      }

      lastCapturedState.current = JSON.stringify(next);
      reset(next, { keepDirty: true });
      updateStoreMetrics();
    };

    // Attach global hotkey event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      if (e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if (e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reset]);
}