import { ReactNode } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ConfigPanelProps {
  open: boolean;
  children: ReactNode;
}

export function ConfigPanel({
  open,
  children,
}: ConfigPanelProps) {
  return (
    <aside
      className={cn(
        "transition-all duration-300",
        open ? "opacity-100" : "w-0 opacity-0"
      )}
      style={
        {
          "--primary": "var(--question-single)",
        } as React.CSSProperties
      }
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-sm font-semibold">Question Settings</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Configure how this question behaves.
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-5 p-5">{children}</div>
        </ScrollArea>
      </Card>
    </aside>
  );
}