
"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Session } from "next-auth";

export function UserButton({
  user,
}: {
  user: Session["user"] | null | undefined;
}) {
  if (!user) {
    return (
      <Button asChild className="h-10 rounded-xl px-5">
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group h-11 gap-2 rounded-xl px-2 hover:bg-muted/80 data-[state=open]:bg-muted"
        >
          <Avatar className="size-8 border border-border/70">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <span className="hidden max-w-32 truncate text-sm font-medium sm:block">
            {user.name?.split(" ")[0] ?? "Account"}
          </span>

          <IconChevronDown
            size={15}
            className="text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-2xl border-border/70 bg-popover p-2 shadow-xl"
      >
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-border/70">
              <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user.name ?? "User"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          asChild
          className="h-10 cursor-pointer gap-3 rounded-lg px-3"
        >
          <Link href="/settings">
            <IconSettings
              size={18}
              stroke={1.8}
              className="text-muted-foreground"
            />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onSelect={() => signOut({ callbackUrl: "/" })}
          className="h-10 cursor-pointer gap-3 rounded-lg px-3 text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <IconLogout size={18} stroke={1.8} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
