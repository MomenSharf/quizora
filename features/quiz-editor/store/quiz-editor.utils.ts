import { produce } from "immer";
import { Question } from "../validation/question";

export function moveArrayItem<T>(
  array: T[],
  from: number,
  to: number,
) {
  if (from === to) return array;

  const items = [...array];

  const [item] = items.splice(from, 1);

  items.splice(to, 0, item);

  return items;
}

export function duplicateQuestion<T extends Question>(
  question: T,
  id: string,
): T {
  return produce(question, (draft) => {
    draft.id = id;
  });
}

export function removeQuestion(
  questions: Record<string, Question>,
  id: string,
) {
  const next = { ...questions };

  delete next[id];

  return next;
}

export function insertQuestion(
  order: string[],
  id: string,
  index = order.length,
) {
  const next = [...order];

  next.splice(index, 0, id);

  return next;
}

export function removeQuestionFromOrder(
  order: string[],
  id: string,
) {
  return order.filter((questionId) => questionId !== id);
}

export function replaceQuestion(
  questions: Record<string, Question>,
  question: Question,
) {
  return {
    ...questions,
    [question.id]: question,
  };
}

export function markDirty<T extends { editor: { dirty: boolean } }>(
  state: T,
) {
  state.editor.dirty = true;
}

export function getQuestionIndex(
  order: string[],
  id: string,
) {
  return order.indexOf(id);
}

export function getSelectedQuestion(
  questions: Record<string, Question>,
  id: string | null,
) {
  if (!id) return undefined;

  return questions[id];
}