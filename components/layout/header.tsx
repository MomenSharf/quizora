import { IconSearch } from "@tabler/icons-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "./user-button";
import { auth } from "@/features/auth/lib/auth-options";

const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">

        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center">
          <div className="group relative w-full max-w-xl">
            <IconSearch
              size={18}
              stroke={1.8}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
            />

            <Input
              placeholder="Search quizzes, topics..."
              className="h-10 rounded-xl border-border/60 bg-muted/50 pl-10 pr-16 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 hover:bg-muted focus-visible:border-primary/40 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <ThemeToggle />

          <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

          <UserButton user={session?.user} />
        </div>
      </div>
    </header>
  );
};

export default Header;