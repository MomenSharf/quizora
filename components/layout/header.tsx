import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBell, IconMoonStars, IconSearch } from "@tabler/icons-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="flex min-h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex-1 flex max-md:flex-col-reverse items-center gap-2 px-4 justify-between max-md:items-start max-md:py-2 max-md:gap-4">
        {/* <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        /> */}
        <div className="flex flex-col justify-start">
          <h3 className="text-xs font-medium text-muted-foreground">
            App / Dashboard
          </h3>
          <h1 className="text-2xl font-semibold">Main Dashboard</h1>
        </div>
        <div className="flex items-center justify-end gap-1 bg-background p-2 rounded-full max-md:w-full">
          <SidebarTrigger className="mr-auto md:hidden" />
          <div className="relative flex justify-start items-center">
            <IconSearch
              className="absolute text-muted-foreground left-2"
              size={16}
            />
            <Input
              className="bg-secondary-background pl-7 rounded-full border-0 ring-0 outline-none focus-visible:ring-0  focus-visible:outline-none shadow-none"
              placeholder="Search..."
            />
          </div>
          <Button variant="ghost" className="rounded-full" size="icon">
            <IconBell className="text-muted-foreground" />
          </Button>
          <Button variant="ghost" className="rounded-full" size="icon">
            <IconMoonStars size={20} className="text-muted-foreground" />
          </Button>
          <div className="flex justify-center items-center bg-primary rounded-full min-w-8 min-h-8 text-primary-foreground">
            M
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
