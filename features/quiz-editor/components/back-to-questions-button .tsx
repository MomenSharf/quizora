import { Button } from "@/components/ui/button";
import React from "react";
import { useEditorActions } from "../store";
import { IconArrowLeft } from "@tabler/icons-react";

export default function BackToQuestuonsButton() {
  const { setActivePanel } = useEditorActions();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setActivePanel("questions")}
      className="group -ml-2 h-9 gap-2 rounded-lg px-2.5 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
    >
      <IconArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      <span>Back to questions</span>
    </Button>
  );
}
