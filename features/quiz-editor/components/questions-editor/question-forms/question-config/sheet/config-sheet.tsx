import { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConfigSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;

  children: ReactNode;
}

export function ConfigSheet({
  open,
  onOpenChange,
  title = "Question Settings",
  description = "Configure the selected question.",
  children,
}: ConfigSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-107.5 p-0 sm:max-w-107.5">
        <SheetHeader className="border-b px-6 py-5 text-left">
          <SheetTitle className="text-lg font-semibold tracking-tight">
            {title}
          </SheetTitle>

          <SheetDescription className="text-sm leading-relaxed">
            {description}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-88px)]">
          <div className="px-6 py-6">{children}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}