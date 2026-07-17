"use client";

import * as React from "react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconBooks, IconSmartHome } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FrameIcon,
  Inbox,
  MapIcon,
  PieChartIcon,
  Sparkles,
} from "lucide-react";
import { Separator } from "../ui/separator";
import NavCreateNew from "./nav-create-new";
import { NavMain } from "./nav-main";
import { SidebarLogo } from "./sidebar-logo";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/",
      icon: IconSmartHome,
      isActive: true,
    },
    {
      title: "library",
      url: "/library",
      icon: IconBooks,
    },
    {
      title: "Ask AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <FrameIcon />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <PieChartIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, isMobile } = useSidebar();

  const collapsed = !isMobile && !open;

  return (
    <Sidebar collapsible="icon" className="bg-white dark:bg-sidebar" {...props}>
      <SidebarHeader className="relative">
        <div className="flex items-center justify-between">
          <SidebarLogo />
          {isMobile && <SidebarTrigger className="ml-auto" />}
        </div>

        <AnimatePresence>
          {collapsed && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12, transition: { duration: 0 } }}
              transition={{ duration: 0.2, delay: 0.15 }}
            >
              <SidebarTrigger className="ml-auto cursor-pointer" />
            </motion.div>
          )}
        </AnimatePresence>

        <Separator className="space-y-2" />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <NavMain items={data.navMain} />
        <NavCreateNew />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
