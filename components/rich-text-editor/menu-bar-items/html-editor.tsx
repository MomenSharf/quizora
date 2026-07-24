"use client";

import { autocompletion } from "@codemirror/autocomplete";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import type { Editor as TiptapEditor } from "@tiptap/react";
import CodeMirror from "@uiw/react-codemirror";
import htmlParser from "prettier/plugins/html";
import prettier from "prettier/standalone";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  IconCode,
  IconCopy,
  IconRotateClockwise,
  IconWand,
} from "@tabler/icons-react";

interface HtmlEditorDialogProps {
  editor: TiptapEditor;
}

export function HtmlEditorDialog({ editor }: HtmlEditorDialogProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function formatHtml(html: string) {
    try {
      return await prettier.format(html, {
        parser: "html",
        plugins: [htmlParser],
      });
    } catch {
      return html;
    }
  }

  async function format() {
    setValue(await formatHtml(value));
  }

  function apply() {
    editor.commands.setContent(value);
  }

  function reset() {
    setValue(editor.getHTML());
  }

  async function copy() {
    await navigator.clipboard.writeText(value);
  }

  return (
    <Dialog
      onOpenChange={async (open) => {
        if (!open) return;

        setLoading(true);
        setValue(await formatHtml(editor.getHTML()));
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <IconCode className="mr-2 h-4 w-4" />
          HTML
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-[90vh] w-[95vw] max-w-5xl flex-col overflow-hidden p-0 gap-0" showCloseButton={false}>
        <DialogHeader className="px-4 py-5">
          <DialogTitle>Edit HTML</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 border-b bg-muted/50 p-2">
          <Button size="sm" variant="secondary" onClick={format}>
            <IconWand className="mr-2 h-4 w-4" />
            Format
          </Button>

          <Button size="sm" variant="secondary" onClick={copy}>
            <IconCopy className="mr-2 h-4 w-4" />
            Copy
          </Button>

          <Button size="sm" variant="secondary" onClick={reset}>
            <IconRotateClockwise className="mr-2 h-4 w-4" />
            Reset
          </Button>

          <span className="ml-auto text-xs text-muted-foreground">
            {value.length} chars
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background text-sm text-muted-foreground">
              Loading editor...
            </div>
          )}

          <CodeMirror
            value={value}
            height="100%"
            theme={oneDark}
            extensions={[html(), autocompletion()]}
            onChange={setValue}
            onCreateEditor={() => setLoading(false)}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              highlightActiveLine: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
            }}
            className="h-full text-sm"
          />
        </div>

        <DialogFooter className="border-t px-4 py-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={apply}>Apply Changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
