"use client";

import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Icons } from "../icons";

export function SidebarLogo() {
  const { open } = useSidebar();

  return (
    <div className="flex w-full items-center gap-2 py-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary">
        <Icons.logo className="size-5 fill-sidebar-primary-foreground stroke-sidebar-primary-foreground" />
      </div>

      {open && (
        <span className="truncate text-lg">
          QUIZORA
        </span>
      )}

      {open && <SidebarTrigger className="ml-auto cursor-pointer" />}
    </div>
  );
}