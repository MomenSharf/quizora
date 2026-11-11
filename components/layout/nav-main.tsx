"use client";

import { type LucideIcon } from "lucide-react";
import { TablerIcon } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: TablerIcon | LucideIcon;
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarMenu className="mt-1">
      {items.map((item) => {
        const isActive =
          pathname === item.url || 
          (item.url !== "/" && pathname.startsWith(`${item.url}/`));

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              size="lg"
              isActive={isActive}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative overflow-visible"
              onClick={() => router.push(item.url)}
            >
              <div className="flex aspect-square size-8 items-center justify-center">
                <item.icon
                  className={cn("text-muted-foreground", {
                    "text-sidebar-primary": isActive,
                  })}
                  width={24}
                  height={24}
                />
              </div>

              <span
                className={cn("truncate text-muted-foreground", {
                  "text-foreground": isActive,
                })}
              >
                {item.title}
              </span>

              {isActive && (
                <motion.span
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  className="absolute -right-2 top-1/2 w-1 -translate-y-1/2 rounded-sm bg-sidebar-primary"
                />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}