"use client";

import { useState } from "react";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ToolbarItem } from "./menu-bar";

type CollapsibleToolbarGroupProps = {
  items: ToolbarItem[];
  collapsible?: boolean;
};

export default function CollapsibleToolbarGroup({
  items,
  collapsible = true,
}: CollapsibleToolbarGroupProps) {
  const [open, setOpen] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const expanded = !collapsible || open || mouseOver;

  const sortedItems = !collapsible ? items :  [...items].sort(
    (a, b) => Number(b.pressed) - Number(a.pressed),
  );

  return (
    <div className="flex">
      <div
        className={cn(
          "flex gap-0.5 overflow-hidden transition-[width] duration-300",
          collapsible ? "w-8" : "w-full",
          expanded && "w-full",
        )}
        onMouseEnter={() => collapsible && setMouseOver(true)}
        onMouseLeave={() => collapsible && setMouseOver(false)}
      >
        {sortedItems.map(({ key, icon: Icon, pressed, onClick , disabled}) => (
          <Tooltip key={key}>
            <TooltipTrigger disabled={disabled} asChild>
              <Toggle
                pressed={!!pressed}
                onPressedChange={onClick}
                size="sm"
                className={cn(pressed && "text-primary")}
              >
                <Icon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{key}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      {collapsible && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setOpen((v) => !v)}
        >
          {expanded ? <IconChevronsLeft /> : <IconChevronsRight />}
        </Button>
      )}

      <Separator orientation="vertical" className="ml-1" />
    </div>
  );
}
