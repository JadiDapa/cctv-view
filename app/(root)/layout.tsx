import { ReactNode } from "react";
import DashboardNavbar from "@/components/root/DashboardNavbar";

type Props = {
  children: ReactNode;
};
export default function DashboardLayout({ children }: Props) {
  return (
    // <SidebarProvider>
    // <DashboardSidebar />
    <main className="bg-background relative flex min-h-screen w-full flex-col overflow-hidden md:p-2 lg:ps-6">
      <DashboardNavbar />
      <div className="mb-4 md:pt-2">{children}</div>
      <p className="text-center">Copyright 2025 © BID TIK Polda Sumsel </p>
    </main>
    // </SidebarProvider>
  );
}
