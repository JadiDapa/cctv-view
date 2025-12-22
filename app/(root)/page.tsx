import LatestItem from "@/components/root/home/LatestItem";
import LatestSection from "@/components/root/home/LatestSection";
import PageHeader from "@/components/root/PageHeader";

export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full space-y-8 overflow-hidden border bg-white p-4 md:rounded-2xl lg:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <PageHeader
          title="Dashboard Overview"
          subtitle="Selamat datang di dashboard FileGear!"
        />
      </div>
      <div className="space-y-8">
        <LatestSection />
        <LatestItem />
      </div>
    </main>
  );
}
