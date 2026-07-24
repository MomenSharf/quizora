"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import { IconLetterA, IconTextColor } from "@tabler/icons-react";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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

type Props = {
  editor: Editor;
};

export default function TextColorDialog({ editor }: Props) {
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const update = () => {
      setCurrentColor(
        editor.getAttributes("textStyle").color ?? "#000000",
      );
    };

    update();

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  const apply = () => {
    editor.chain().focus().setColor(color).run();
    setOpen(false);
  };

  const reset = () => {
    editor.chain().focus().unsetColor().run();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (nextOpen) {
          setColor(currentColor);
        }
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="dark:bg-muted">
                <IconTextColor style={{ color: currentColor }} />
              </Button>
            </DialogTrigger>
          </div>
        </TooltipTrigger>

        <TooltipContent>Text Color</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Text Color</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="palette">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="palette">Palette</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="palette" className="mt-4">
            <div className="grid grid-cols-6 gap-2">
              {COLORS.map(({ key, value }) => {
                const selected =
                  color.toLowerCase() === value.toLowerCase();

                return (
                  <Button
                    key={key}
                    size="icon"
                    variant="outline"
                    title={key}
                    onClick={() => setColor(value)}
                    className={cn(selected && "border-primary")}
                  >
                    <IconLetterA style={{ color: value }} />
                  </Button>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-4">
            <div className="flex flex-col items-center gap-4">
              <HexColorPicker color={color} onChange={setColor} />

              <div className="flex w-full items-center gap-3">
                <div
                  className="size-10 rounded-md border"
                  style={{ backgroundColor: color }}
                />

                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={reset}>
            Default
          </Button>

          <Button onClick={apply}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}