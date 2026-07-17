"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  IconChartBar,
  IconChevronDown,
  IconLayoutDashboard,
  IconLogout,
  IconPlus,
  IconSettings,
  IconClipboardText,
} from "@tabler/icons-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Session } from "next-auth";

export function UserButton({ user }: {
  user: Session["user"] | null | undefined;
}) {
  if (!user) {
    return (
      <Link href="/login">
        <Button className="h-10 rounded-xl px-5">
          Login
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-11 rounded-2xl px-2.5 hover:bg-muted"
        >
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

          <span className="hidden max-w-32 truncate text-sm font-medium md:block">
            {user.name}
          </span>

          <IconChevronDown
            size={16}
            className="hidden text-muted-foreground md:block"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-2xl p-2"
      >
        <DropdownMenuLabel className="flex items-center gap-3 rounded-xl p-2">
          <Avatar className="h-11 w-11">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="">
            <p className="font-semibold">{user.name}d</p>
            <p className="text-xs text-muted-foreground truncate max-w-full">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <IconLayoutDashboard size={18} />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/dashboard/quizzes">
              <IconClipboardText size={18} />
              My Quizzes
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/dashboard/new">
              <IconPlus size={18} />
              Create Quiz
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/dashboard/analytics">
              <IconChartBar size={18} />
              Analytics
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/settings">
            <IconSettings size={18} />
            Account Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <IconLogout size={18} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}