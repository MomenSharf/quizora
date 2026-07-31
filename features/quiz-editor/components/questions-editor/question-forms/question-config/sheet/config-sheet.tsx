import { ReactNode } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface ConfigSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function ConfigSheet({
  open,
  onOpenChange,
  children,
}: ConfigSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-110 overflow-hidden border-l bg-background p-0 shadow-2xl sm:max-w-110"
      >
        <ScrollArea className="h-full">
          <div className="min-h-full px-6 py-6">
            <div className="space-y-6">{children}</div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}