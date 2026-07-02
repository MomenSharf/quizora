import { useQuizEditorStore } from "@/features/quiz-editor/store/quiz-editor.store";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";


interface Options {
  onSave: (
    quiz: ReturnType<
      typeof useQuizEditorStore.getState
    >["quiz"],
  ) => Promise<void>;

  delay?: number;
}

export function useQuizEditorAutosave({
  onSave,
  delay = 1000,
}: Options) {
  const quiz = useQuizEditorStore(
    (state) => state.quiz,
  );

  const dirty = useQuizEditorStore(
    (state) => state.editor.dirty,
  );

  const setSaving = useQuizEditorStore(
    (state) => state.setSaving,
  );

  const setDirty = useQuizEditorStore(
    (state) => state.setDirty,
  );

  const setLastSavedAt = useQuizEditorStore(
    (state) => state.setLastSavedAt,
  );

  const save = useDebouncedCallback(async () => {
    if (!dirty) return;

    try {
      setSaving(true);

      await onSave(quiz);

      setDirty(false);

      setLastSavedAt(new Date());
    } finally {
      setSaving(false);
    }
  }, delay);

  useEffect(() => {
    save();
  }, [quiz, dirty, save]);
}