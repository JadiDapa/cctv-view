"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllSections } from "@/lib/networks/section";
import CreateSectionDialog from "@/components/root/section/CreateSectionDialog";
import { SectionType } from "@/lib/types/section";
import SectionCard from "@/components/root/section/SectionCard";
import PageHeader from "@/components/root/PageHeader";

export default function SectionsPage() {
  const {
    data: sections,
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryFn: getAllSections,
    queryKey: ["section"],
  });

  const [search, setSearch] = useState("");

  const filteredInternetPackages = sections?.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen w-full space-y-8 border p-4 md:rounded-2xl lg:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <PageHeader
          title="Section List"
          subtitle="These are all the sections that you have created!"
        />

        <div className="flex gap-3">
          <CreateSectionDialog />

          <Button
            variant="outline"
            className="rounded-full px-4 py-4"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCcw className={isFetching ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div>
        <div className="bg-card flex w-full items-center justify-between rounded-2xl border p-2 px-6">
          <div className="bg-card flex w-100 items-center gap-3 rounded-full border px-4 py-1">
            <Search />
            <Input
              placeholder="Search Section Name..."
              className="border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* REGION LIST */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-60 w-full" />
          ))}
        </div>
      ) : filteredInternetPackages?.length ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {filteredInternetPackages?.map((section: SectionType) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-6">
          No sections found for &quot;{search}&quot;
        </p>
      )}
    </main>
  );
}
