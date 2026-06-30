"use client";

import type { Editor } from "@tiptap/react";
import { IconLink } from "@tabler/icons-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

interface AddLinkProps {
  editor: Editor;
}

export function AddLink({ editor }: AddLinkProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const isActive = editor.isActive("link");

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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Toggle size="sm" pressed={isActive} aria-label="Link">
          <IconLink className={cn("size-4", isActive && "text-primary")} />
        </Toggle>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isActive ? "Edit Link" : "Add Link"}
          </DialogTitle>
          <DialogDescription>
            Enter the URL for this link.
          </DialogDescription>
        </DialogHeader>

        <Input
          autoFocus
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

        <DialogFooter className="flex-row justify-between">
          <Button
            type="button"
            variant="destructive"
            onClick={handleRemove}
            disabled={!isActive}
          >
            <Trash2 className="mr-2 size-4" />
            Remove
          </Button>

          <Button type="button" onClick={handleApply}>
            {isActive ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}