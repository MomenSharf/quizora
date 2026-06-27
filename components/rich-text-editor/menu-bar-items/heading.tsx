"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconLetterH,
} from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";
import { FilmIcon } from "lucide-react";
import { useState } from "react";

const HEADING_LEVELS = [
  { value: "0", label: "Heading", icon: IconLetterH },
  {
    value: "1",
    label: "Heading 1",
    icon: IconH1,
  },
  {
    value: "2",
    label: "Heading 2",
    icon: IconH2,
  },
  {
    value: "3",
    label: "Heading 3",
    icon: IconH3,
  },
  {
    value: "4",
    label: "Heading 4",
    icon: IconH4,
  },
] as const;
const Heading = ({ editor }: { editor: Editor }) => {
  const [value, setValue] = useState<string>();
  const selected = HEADING_LEVELS.find((item) => item.value === value);

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        setValue(value);

        if (value === "0") {
          editor.chain().focus().setParagraph().run();
          return;
        }

        const level = Number(value);

        if (![1, 2, 3, 4].includes(level)) return;

        editor
          .chain()
          .focus()
          .toggleHeading({ level: level as 1 | 2 | 3 | 4 })
          .run();
      }}
    >
      <SelectTrigger
        id="heading-select"
        className={cn(
          "relative hover:bg-accent border-none shadow-none dark:bg-transparent gap-0",
          selected?.value !== "0" && "bg-muted",
        )}
      >
        {selected ? (
          <selected.icon
            className={cn(
              "size-4",
              selected.value === "0" ? "text-muted-foreground" : "text-primary",
            )}
          />
        ) : (
          <IconLetterH className="size-4" />
        )}
      </SelectTrigger>
      <SelectContent position="popper" className="p-1">
        {HEADING_LEVELS.slice(1).map((item, index) => (
          <SelectItem
            key={index}
            value={item.value === selected?.value ? "0" : item.value}
          >
            <item.icon className="size-4" />
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Heading;
