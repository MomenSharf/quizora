import { Question } from "../validation/question";

export function moveItem<T>(
  items: T[],
  from: number,
  to: number,
): T[] {
  if (from === to) {
    return items;
  }

  const next = [...items];

  const [item] = next.splice(from, 1);

  next.splice(to, 0, item);

  return next;
}

export function duplicateQuestion<T extends Question>(
  question: T,
  id: string,
): T {
  return {
    ...structuredClone(question),
    id,
  };
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
  index: number,
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

export function getQuestionIndex(
  order: string[],
  id: string,
) {
  return order.indexOf(id);
}

export function getNextSelectedQuestionId(
  order: string[],
  deletedId: string,
) {
  const index = order.indexOf(deletedId);

  if (index === -1) {
    return null;
  }

  const nextOrder = removeQuestionFromOrder(
    order,
    deletedId,
  );

  if (nextOrder.length === 0) {
    return null;
  }

  return (
    nextOrder[Math.min(index, nextOrder.length - 1)] ??
    null
  );
}