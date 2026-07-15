"use client";

import { motion } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";

export default function NavCreateNew() {
  return (
    <SidebarGroup className="pb-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <motion.div initial="rest" animate="rest" whileHover="hover">
            <SidebarMenuButton
              size="lg"
              className={cn(
                "group relative h-12 w-full overflow-hidden rounded-xl border border-border/60 cursor-pointer",
                "bg-linear-to-r from-primary to-primary/90 text-primary-foreground",
                "transition-all duration-200",
                "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20",
                "hover:-translate-y-0.5 active:translate-y-0",
                "hover:text-primary-foreground active:text-primary-foreground",
              )}
            >
              <motion.div
                variants={{
                  rest: {
                    rotate: 0,
                    scale: 1,
                  },
                  hover: {
                    rotate: 90,
                    scale: 1.15,
                    transition: {
                      duration: 0.25,
                      ease: "easeOut",
                    },
                  },
                }}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm"
              >
                <IconPlus size={20} stroke={2.5} />
              </motion.div>

              <div className="flex flex-1 flex-col leading-none">
                <span className="font-semibold">Create</span>
                <span className="text-xs text-primary-foreground/70">
                  New quiz
                </span>
              </div>

              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </SidebarMenuButton>
          </motion.div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
