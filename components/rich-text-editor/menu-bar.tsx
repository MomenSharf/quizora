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
  IconChevronsLeft,
  IconChevronsRight,
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
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { AddLink } from "./menu-bar-items/add-link";
import FontSizeSelect from "./menu-bar-items/font-size-select ";
import TextColorPicker from "./menu-bar-items/text-color-picker";
import ToolbarGroup from "./toolbar-gruop";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSlider } from "@/hooks/use-slider";
import { HtmlEditorDialog } from "./menu-bar-items/html-editor";
import { createId } from "@paralleldrive/cuid2";
import { InsertBlank } from "./menu-bar-items/insert-blank";

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
  defaultFontSize?: string;
};

// TODO: add math formula editor
export default function MenuBar({
  editor,
  defaultFontSize,
  className,
  allowInsertBlank = false,
}: {
  editor: Editor;
  defaultFontSize?: string;
  className?: string;
  allowInsertBlank?: boolean;
}) {
  const {
    ref,
    canScrollLeft,
    canScrollRight,
    scrollNext,
    scrollPrevious,
    overflow,
  } = useSlider<HTMLDivElement>(100);

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
        "absolute left-0 -top-14 z-10 h-12 w-full  border border-primary rounded-md opacity-0 invisible pointer-events-none transition-all duration-200 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto",
        className,
      )}
    >
      <div
        ref={ref}
        className={cn(
          "w-full h-full flex items-center justify-start gap-1 bg-background rounded-md p-1 px-12 overflow-y-auto scrollbar-none",
          overflow === "none" && "px-1",
        )}
      >
        {allowInsertBlank && <InsertBlank editor={editor} />}

        <FontSizeSelect editor={editor} defaultFontSize={defaultFontSize} />

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
        <HtmlEditorDialog editor={editor} />
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-disabled={!canScrollLeft}
            className={cn(
              "h-full absolute left-0 top-0 z-10 bg-background border-0 border-r-2 border-primary rounded-r-none",
              overflow === "none" ? "hidden" : "flex",
              !canScrollLeft && "opacity-50 cursor-default",
            )}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (!canScrollLeft) return;
              scrollPrevious();
            }}
            style={{
              display: overflow === "none" ? "none" : "flex",
            }}
          >
            <IconChevronsLeft />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Scroll Left</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-disabled={!canScrollRight}
            className={cn(
              "h-full absolute right-0 top-0 z-10 bg-background border-0 border-l-2 border-primary rounded-l-none",
              overflow === "none" ? "hidden" : "flex",
              !canScrollRight && "opacity-50 cursor-default",
            )}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (!canScrollRight) return;
              scrollNext();
            }}
          >
            <IconChevronsRight />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Scroll Right</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
