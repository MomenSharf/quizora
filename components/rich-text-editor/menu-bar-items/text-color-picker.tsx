"use client";

import { useMemo } from "react";
import { Check, Palette } from "lucide-react";
import type { Editor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const COLORS = [
  "#000000",
  "#434343",
  "#666666",
  "#999999",
  "#cccccc",
  "#ffffff",

  "#e53935",
  "#fb8c00",
  "#fdd835",
  "#43a047",
  "#00acc1",
  "#1e88e5",

  "#3949ab",
  "#8e24aa",
  "#d81b60",
  "#6d4c41",
  "#546e7a",
  "#7cb342",

  "#ef5350",
  "#ffb74d",
  "#fff176",
  "#81c784",
  "#4dd0e1",
  "#64b5f6",
];

type Props = {
  editor: Editor;
};

export default function TextColorPicker({ editor }: Props) {
  const currentColor = useMemo(() => {
    return editor.getAttributes("textStyle").color ?? "#000000";
  }, [editor.state]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Palette className="size-4" />

          <span
            className="absolute bottom-1 left-1/2 h-1.5 w-5 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: currentColor }}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-60 p-3">
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() =>
              editor.chain().focus().unsetColor().run()
            }
          >
            Default
          </Button>

          <div className="grid grid-cols-6 gap-2">
            {COLORS.map((color) => {
              const active =
                currentColor?.toLowerCase() === color.toLowerCase();

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    editor.chain().focus().setColor(color).run()
                  }
                  className="flex size-8 items-center justify-center rounded-md border transition hover:scale-105"
                  style={{ backgroundColor: color }}
                >
                  {active && (
                    <Check
                      className={`size-4 ${
                        color === "#ffffff"
                          ? "text-black"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Custom
            </span>

            <input
              type="color"
              value={currentColor}
              onChange={(e) =>
                editor
                  .chain()
                  .focus()
                  .setColor(e.target.value)
                  .run()
              }
              className="h-9 w-12 cursor-pointer rounded border bg-transparent p-1"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}