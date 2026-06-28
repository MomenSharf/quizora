"use client";

import type { Editor } from "@tiptap/react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconLetterA, IconTextColor } from "@tabler/icons-react";
import { HexColorPicker } from "react-colorful";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const COLORS = [
  { key: "black", value: "#000000" },
  { key: "dark-gray", value: "#434343" },
  { key: "gray", value: "#666666" },
  { key: "light-gray", value: "#999999" },
  { key: "silver", value: "#cccccc" },
  { key: "white", value: "#ffffff" },

  { key: "red", value: "#e53935" },
  { key: "orange", value: "#fb8c00" },
  { key: "yellow", value: "#fdd835" },
  { key: "green", value: "#43a047" },
  { key: "cyan", value: "#00acc1" },
  { key: "blue", value: "#1e88e5" },

  { key: "indigo", value: "#3949ab" },
  { key: "purple", value: "#8e24aa" },
  { key: "pink", value: "#d81b60" },
  { key: "brown", value: "#6d4c41" },
  { key: "blue-gray", value: "#546e7a" },
  { key: "lime", value: "#7cb342" },

  { key: "light-red", value: "#ef5350" },
  { key: "light-orange", value: "#ffb74d" },
  { key: "light-yellow", value: "#fff176" },
  { key: "light-green", value: "#81c784" },
  { key: "light-cyan", value: "#4dd0e1" },
  { key: "light-blue", value: "#64b5f6" },
] as const;

export type ColorKey = (typeof COLORS)[number]["key"];
type Props = {
  editor: Editor;
};

export default function TextColorPicker({ editor }: Props) {
  const [color, setColor] = useState("#aabbcc");

  const currentColor = useMemo(() => {
    return editor.getAttributes("textStyle").color ?? "#000000";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor.state]);

  const textCurrentColor = COLORS.find(
    ({ value }) => value === currentColor,
  )?.key;

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <IconTextColor style={{ color: currentColor }} />
              </Button>
            </PopoverTrigger>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Text Color - {textCurrentColor ? textCurrentColor : color}
        </TooltipContent>
      </Tooltip>

      <PopoverContent className="w-60 p-3">
        <Tabs defaultValue="colors" className="">
          <TabsList className="w-full">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          <TabsContent value="colors">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="justify-start w-full cursor-pointer"
                onClick={() => editor.chain().focus().unsetColor().run()}
              >
                Default
              </Button>

              <div className="grid grid-cols-6 gap-2">
                {COLORS.map(({ key, value: color }) => {
                  const active =
                    currentColor?.toLowerCase() === color.toLowerCase();

                  return (
                    <Tooltip key={key}>
                      <TooltipTrigger asChild>
                        <Toggle
                          onPressedChange={() =>
                            editor.chain().focus().setColor(color).run()
                          }
                          pressed={active}
                          style={{ color: color }}
                          className="flex justify-center items-center p-0 cursor-pointer"
                        >
                          <span
                            className="flex items-center justify-center rounded-full border size-6"
                            style={{ borderColor: color }}
                          >
                            <IconLetterA />
                          </span>
                        </Toggle>
                      </TooltipTrigger>

                      <TooltipContent>{key}</TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="custom">
            <div className="flex flex-col items-center gap-3">
              <HexColorPicker color={color} onChange={setColor} />
              <p style={{ color: color }} className="font-bold self-start">
                Current Color
              </p>
              <Button
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="cursor-pointer"
              >
                Apply
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
