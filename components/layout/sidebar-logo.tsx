"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icons } from "../icons";

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Icons.logo className="size-4 stroke-sidebar-primary-foreground  fill-sidebar-primary-foreground" />
          </div>
          <span className="truncate text-lg">QUIZORA</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
