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

      <SidebarInset className="min-w-0 overflow-x-hidden bg-muted/20 dark:bg-muted/30">
        <Header />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden bg-linear-to-br from-primary/6 via-background to-violet-500/8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}