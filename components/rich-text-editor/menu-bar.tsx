"use client";

import type { Editor } from "@tiptap/react";

import { cn } from "@/lib/utils";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconClearFormatting,
  IconItalic,
  IconList,
  IconListNumbers,
  IconSeparatorHorizontal,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
  IconUnderline,
} from "@tabler/icons-react";
import { Heading1, Heading2, Heading3, LucideIcon } from "lucide-react";
import ToolbarGroup from "./toolbar-gruop";
import FontSizeSelect from "./menu-bar-items/font-size-select ";
import { Separator } from "../ui/separator";
import TextColorPicker from "./menu-bar-items/text-color-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { AddLink } from "./menu-bar-items/add-link";

export type ToolbarItem = {
  key: string;
  icon: LucideIcon;
  onClick: () => void;
  pressed?: boolean;
  disabled?: boolean;
};

export type ToolbarGroup = {
  label: string;
  collapsible: boolean;
  items: ToolbarItem[];
};

export default function MenuBar({ editor }: { editor: Editor }) {
  const groups: Record<string, ToolbarGroup> = {
    heading: {
      label: "Headings",
      collapsible: true,
      items: [
        {
          key: "heading-1",
          icon: Heading1,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
          pressed: editor.isActive("heading", { level: 1 }),
        },
        {
          key: "heading-2",
          icon: Heading2,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
          pressed: editor.isActive("heading", { level: 2 }),
        },
        {
          key: "heading-3",
          icon: Heading3,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
          pressed: editor.isActive("heading", { level: 3 }),
        },
      ],
    },

    formatting: {
      label: "Formatting",
      collapsible: false,
      items: [
        {
          key: "bold",
          icon: IconBold,
          onClick: () => editor.chain().focus().toggleBold().run(),
          pressed: editor.isActive("bold"),
        },
        {
          key: "italic",
          icon: IconItalic,
          onClick: () => editor.chain().focus().toggleItalic().run(),
          pressed: editor.isActive("italic"),
        },
        {
          key: "strike",
          icon: IconStrikethrough,
          onClick: () => editor.chain().focus().toggleStrike().run(),
          pressed: editor.isActive("strike"),
        },
        {
          key: "underline",
          icon: IconUnderline,
          onClick: () => editor.chain().focus().toggleUnderline().run(),
          pressed: editor.isActive("underline"),
        },
        {
          key: "horizontal-rule",
          icon: IconSeparatorHorizontal,
          onClick: () => editor.chain().focus().setHorizontalRule().run(),
        },
        {
          key: "clear-formatting",
          icon: IconClearFormatting,
          onClick: () =>
            editor.chain().focus().unsetAllMarks().clearNodes().run(),
        },
      ],
    },

    lists: {
      label: "Lists",
      collapsible: false,
      items: [
        {
          key: "bullet-list",
          icon: IconList,
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          pressed: editor.isActive("bulletList"),
        },
        {
          key: "ordered-list",
          icon: IconListNumbers,
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          pressed: editor.isActive("orderedList"),
        },
      ],
    },

    alignment: {
      label: "Alignment",
      collapsible: true,
      items: [
        {
          key: "align-left",
          icon: IconAlignLeft,
          onClick: () => editor.chain().focus().setTextAlign("left").run(),
          pressed: editor.isActive({ textAlign: "left" }),
        },
        {
          key: "align-center",
          icon: IconAlignCenter,
          onClick: () => editor.chain().focus().setTextAlign("center").run(),
          pressed: editor.isActive({ textAlign: "center" }),
        },
        {
          key: "align-right",
          icon: IconAlignRight,
          onClick: () => editor.chain().focus().setTextAlign("right").run(),
          pressed: editor.isActive({ textAlign: "right" }),
        },
        {
          key: "align-justify",
          icon: IconAlignJustified,
          onClick: () => editor.chain().focus().setTextAlign("justify").run(),
          pressed: editor.isActive({ textAlign: "justify" }),
        },
      ],
    },

    scripts: {
      label: "Scripts",
      collapsible: false,
      items: [
        {
          key: "superscript",
          icon: IconSuperscript,
          onClick: () => editor.chain().focus().toggleSuperscript().run(),
          pressed: editor.isActive("superscript"),
        },
        {
          key: "subscript",
          icon: IconSubscript,
          onClick: () => editor.chain().focus().toggleSubscript().run(),
          pressed: editor.isActive("subscript"),
        },
      ],
    },

    history: {
      label: "History",
      collapsible: false,
      items: [
        {
          key: "undo",
          icon: IconArrowBackUp,
          onClick: () => editor.chain().focus().undo().run(),
          disabled: !editor.can().undo(),
        },
        {
          key: "redo",
          icon: IconArrowForwardUp,
          onClick: () => editor.chain().focus().redo().run(),
          disabled: !editor.can().redo(),
        },
      ],
    },
  };
  return (
    <div
      className={cn(
        "flex items-center justify-start gap-1 bg-background p-1 overflow-y-auto scrollbar-thin rounded-t-md border border-b-0",
      )}
    >
     
            <FontSizeSelect editor={editor} />
            <TextColorPicker editor={editor} />
     
   

      <Separator orientation="vertical" className="ml-1" />
      {Object.entries(groups).map(([name, group]) => (
        <ToolbarGroup
          key={name}
          collapsible={group.collapsible}
          items={group.items}
        />
      ))}
      <AddLink editor={editor} />
      {/* 
      link
      code
      image
      */}
    </div>
  );
}
