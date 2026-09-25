import type { FieldPath, UseFormGetFieldState } from "react-hook-form";

import type { QuizEditor } from "../validation/quiz";

export function hasFieldError(
  getFieldState: UseFormGetFieldState<QuizEditor>,
  path: FieldPath<QuizEditor>,
) {
  return getFieldState(path).invalid;
}
