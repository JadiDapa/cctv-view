"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, Search } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import CreateItemDialog from "@/components/root/item/CreateItemDialog";
import { ItemType } from "@/lib/types/item";
import ItemCard from "@/components/root/item/ItemCard";
import { useParams } from "next/navigation";
import { getSectionById } from "@/lib/networks/section";

export default function SectionsItem() {
  const { id } = useParams();

  const {
    data: section,
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryFn: () => getSectionById(id as string),
    queryKey: ["sections", id],
  });

  const [search, setSearch] = useState("");

  const filteredInternetPackages = section?.items?.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (!filteredInternetPackages || !section || isLoading)
    return <Skeleton className="h-32 w-full rounded-2xl" />;

  return (
    <main className="min-h-screen w-full space-y-8 border p-4 md:rounded-2xl lg:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="">
          <p className="text-primary font-semibold">Section :</p>
          <PageHeader
            title={section.name}
            subtitle={
              "These are all " + section.name + " items that you have created!"
            }
          />
        </div>

        <div className="flex gap-3">
          <CreateItemDialog sectionId={id as string} />

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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-60 w-full" />
          ))}
        </div>
      ) : filteredInternetPackages?.length ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {filteredInternetPackages?.map((item: ItemType) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-6">
          No items found for &quot;{search}&quot;
        </p>
      )}
    </main>
  );
}
