import { JSONContent } from "@tiptap/core";

import { FillBlankData } from "@/features/quiz-editor/validation/question";

export function serializeFillInTheBlank(
  data: FillBlankData,
): JSONContent {
  const blankMap = new Map(
    data.blanks.map((blank) => [blank.id, blank]),
  );

  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: data.blocks.flatMap((block) => {
          if (block.type === "TEXT") {
            if (!block.text.length) {
              return [];
            }

            return {
              type: "text",
              text: block.text,
            };
          }

          const blank = blankMap.get(block.blankId);

          if (!blank) {
            return [];
          }

          return {
            type: "blank",
            attrs: {
              id: blank.id,
              placeholder: blank.placeholder,
            },
          };
        }),
      },
    ],
  };
}