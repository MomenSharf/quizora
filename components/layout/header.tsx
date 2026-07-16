import { IconBell, IconSearch } from "@tabler/icons-react";


import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "./user-button";
import { auth } from "@/features/auth/lib/auth-options";

const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <SidebarTrigger className="md:hidden" />

        <div className="relative hidden max-w-sm flex-1 md:flex">
          <IconSearch
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            placeholder="Search quizzes..."
            className="h-10 rounded-xl border-0 bg-muted pl-10 shadow-none transition-colors focus-visible:ring-1"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-xl"
          >
            <IconBell size={20} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <ThemeToggle />

          <UserButton user={session?.user} />
        </div>
      </div>

      <div className="border-t px-4 py-3 md:hidden">
        <div className="relative">
          <IconSearch
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            placeholder="Search quizzes..."
            className="h-10 rounded-xl border-0 bg-muted pl-10 shadow-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;