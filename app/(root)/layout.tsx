import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/root/DashboardSidebar";
import DashboardNavbar from "@/components/root/DashboardNavbar";

type Props = {
  children: ReactNode;
};
export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-muted flex min-h-screen w-full flex-col overflow-hidden md:p-2 lg:ps-6">
        <DashboardNavbar />
        <div className="mb-14 md:pt-2">{children}</div>
      </main>
    </SidebarProvider>
  );
}
