"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  IconTrophy
} from "@tabler/icons-react";
import { Button } from "../ui/button";

export function SidebarLogo() {
  const { open } = useSidebar();

  return (
    <div className="flex w-full items-center gap-2 py-2">
      <Button size="icon">
        <IconTrophy className="size-5" stroke={2} />
      </Button>

      {open && <span className="truncate text-lg">QUIZORA</span>}

      {open && <SidebarTrigger className="ml-auto cursor-pointer" />}
    </div>
  );
}
