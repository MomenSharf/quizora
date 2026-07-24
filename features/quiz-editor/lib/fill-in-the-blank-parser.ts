import { JSONContent } from "@tiptap/core";
import { createId } from "@paralleldrive/cuid2";

import {
  FillBlankBlock,
  FillBlankData,
} from "@/features/quiz-editor/validation/question";

export function parseFillInTheBlank(
  content: JSONContent,
): FillBlankData {
  const blocks: FillBlankBlock[] = [];
  const blanks = new Map<
    string,
    {
      id: string;
      placeholder: string;
      answers: [];
    }
  >();

  visit(content);

  return {
    blocks,
    blanks: [...blanks.values()],
  };

  function visit(node: JSONContent) {
    if (node.type === "text" && node.text) {
      pushText(node.text);

      return;
    }

    if (node.type === "blank") {
      const id = node.attrs?.id as string;
      const placeholder = (node.attrs?.placeholder as string) ?? "";

      blocks.push({
        id: createId(),
        type: "BLANK",
        blankId: id,
      });

      if (!blanks.has(id)) {
        blanks.set(id, {
          id,
          placeholder,
          answers: [],
        });
      }

      return;
    }

    node.content?.forEach(visit);
  }

  function pushText(text: string) {
  if (!text) return;

  const last = blocks.at(-1);

  if (last?.type === "TEXT") {
    last.text += text;
    return;
  }

  blocks.push({
    id: createId(),
    type: "TEXT",
    text,
  });
}
}