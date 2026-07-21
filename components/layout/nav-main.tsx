"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { TablerIcon } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: TablerIcon | LucideIcon;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarMenu className="mt-1">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative overflow-visible"
            isActive={item.isActive}
          >
            <div className="flex aspect-square size-8 items-center justify-center">
              <item.icon
                className={cn("text-muted-foreground", {
                  "text-sidebar-primary": item.isActive,
                })}
                width={24}
                height={24}
              />
            </div>
            <span
              className={cn("truncate text-muted-foreground", {
                "text-foreground": item.isActive,
              })}
            >
              {item.title}
            </span>
            {item.isActive && (
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="absolute -right-2 top-1/2 w-1 bg-sidebar-primary rounded-sm -translate-y-1/2"
              />
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
