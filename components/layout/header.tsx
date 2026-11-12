import { IconSearch } from "@tabler/icons-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "./user-button";
import { auth } from "@/features/auth/lib/auth-options";
import { QuizSearchInput } from "@/features/discover/components/search/quiz-search-input";

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
          <QuizSearchInput className="hidden md:flex md:w-64 lg:w-80" />
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
