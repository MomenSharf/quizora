"use client";

import type { Editor } from "@tiptap/react";
import { Check } from "lucide-react";

import { COLORS } from "./colors";
import type { ColorPickerConfig } from "./color-picker-config";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  editor: Editor;
  config: ColorPickerConfig;
};

export default function ColorPicker({
  editor,
  config,
}: Props) {
  const color = config.getValue(editor);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative"
        >
          <config.Icon className="size-4" />

          <span
            className="absolute bottom-1 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full"
            style={{
              backgroundColor: color ?? "#000",
            }}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-60 space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => config.reset(editor)}
        >
          Default
        </Button>

        <div className="grid grid-cols-6 gap-2">
          {COLORS.map((item) => {
            const active =
              item.toLowerCase() === color?.toLowerCase();

            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  config.setValue(editor, item)
                }
                className="flex size-8 items-center justify-center rounded-md border"
                style={{
                  backgroundColor: item,
                }}
              >
                {active && (
                  <Check
                    className={
                      item === "#ffffff"
                        ? "size-4 text-black"
                        : "size-4 text-white"
                    }
                  />
                )}
              </button>
            );
          })}
        </div>

        <input
          type="color"
          value={color ?? "#000000"}
          onChange={(e) =>
            config.setValue(editor, e.target.value)
          }
          className="h-10 w-full cursor-pointer"
        />
      </PopoverContent>
    </Popover>
  );
}