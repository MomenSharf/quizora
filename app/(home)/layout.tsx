import DashboardLayout from "@/components/layout/dashboard-layout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
