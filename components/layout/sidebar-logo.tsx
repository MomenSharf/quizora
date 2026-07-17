"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Logo } from "../logo";
import { cn } from "@/lib/utils";

export function SidebarLogo() {
  const { open, isMobile } = useSidebar();

  const collapsed = !isMobile && !open;

  return (
    <div className="flex w-full items-center py-2">
      <Logo
        iconOnly={collapsed}
        className="flex-1 gap-2"
        containerClassName={cn(collapsed && "size-8")}
        iconClassName={cn(collapsed && "size-4")}
        textClassName="text-base font-semibold"
      />

      {!isMobile && open && <SidebarTrigger className="ml-auto" />}
    </div>
  );
}