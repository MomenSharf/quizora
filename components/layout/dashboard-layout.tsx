import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-muted/20 dark:bg-muted/30">
        <Header />
        <div className="flex-1 bg-gradient-to-br from-primary/[0.06] via-background to-violet-500/[0.08]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
