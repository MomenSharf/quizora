import { AppSidebar } from "./app-sidebar";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import Header from "./header";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-secondary-background">
      <Header />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
