import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="min-w-0 overflow-x-hidden bg-muted/20 dark:bg-muted/30">
          <Header />

          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden bg-linear-to-br from-primary/6 via-background to-violet-500/8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
