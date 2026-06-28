"use client";

import type { Editor } from "@tiptap/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { IconLink } from "@tabler/icons-react";

interface LinkPopoverProps {
  editor: Editor;
}

export function AddLink({ editor }: LinkPopoverProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setUrl(editor.getAttributes("link").href ?? "");
    }

    setOpen(nextOpen);
  };

  const handleApply = () => {
    const href = url.trim();

    if (!href) {
      editor.chain().focus().unsetLink().run();
      setOpen(false);
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href:
          href.startsWith("http://") || href.startsWith("https://")
            ? href
            : `https://${href}`,
      })
      .run();

    setOpen(false);
  };

  const handleRemove = () => {
    editor.chain().focus().unsetLink().run();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Toggle size="sm" pressed={editor.isActive("link")} aria-label="Link">
          <IconLink className="size-4" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-1">
        <Input
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleApply();
            }
          }}
        />

        <div className="flex justify-between">
          <Button variant="destructive" size="sm" onClick={handleRemove}>
            <Trash2 className="mr-2 size-4" />
            Remove
          </Button>

          <Button size="sm" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
