import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { createId } from "@paralleldrive/cuid2";
import { BlankNodeView } from "./blank-node-view";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blank: {
      insertBlank: () => ReturnType;
    };
  }
}

export const Blank = Node.create({
  name: "blank",

  group: "inline",

  inline: true,

  atom: true,

  selectable: true,

  addAttributes() {
    return {
      id: {
        default: "",
      },
      placeholder: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "blank",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["blank", HTMLAttributes];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlankNodeView);
  },

  addCommands() {
    return {
      insertBlank:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              id: createId(),
              placeholder: "",
            },
          });
        },
    };
  },
});
