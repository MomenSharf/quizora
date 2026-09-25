"use client";

import { useState } from "react";
import { useWatch } from "react-hook-form";
import { IconCheck, IconPencilBolt } from "@tabler/icons-react";

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
import { useQuizForm } from "../../hooks/use-quiz-form";

const MAX_TITLE_LENGTH = 80;

export function EditableTitle() {
  const { control, setValue } = useQuizForm();

  const title = useWatch({
    control,
    name: "title",
  });

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setDraft(title ?? "");
    }
  };

  const handleSave = () => {
    const value = draft.trim();

    if (!value) return;

    setValue("title", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="group flex min-w-0 cursor-pointer items-center gap-0.5 md:gap-1">
          <h1 className="max-w-28 truncate text-xs font-semibold sm:max-w-36 sm:text-sm md:max-w-50 md:text-lg">
            {title || "Untitled quiz"}
          </h1>

          <IconPencilBolt
            className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground md:size-4"
          />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit quiz title</DialogTitle>
          <DialogDescription>
            Give your quiz a clear name.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={MAX_TITLE_LENGTH}
            placeholder="Enter quiz title"
            autoFocus
            className="h-11 rounded-xl"
            onKeyDown={(e) => {
              if (e.key === "Enter" && draft.trim()) {
                e.preventDefault();
                handleSave();
              }
            }}
          />

          <div className="flex justify-end">
            <span className="text-xs tabular-nums text-muted-foreground">
              {draft.length}/{MAX_TITLE_LENGTH}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!draft.trim()}
            className="gap-2 rounded-xl"
          >
            <IconCheck size={16} />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}