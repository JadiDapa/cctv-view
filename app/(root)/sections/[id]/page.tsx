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
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!filteredInternetPackages || !section || isLoading)
    return <Skeleton className="h-32 w-full rounded-2xl" />;

  return (
    <main className="bg-white w-full md:rounded-2xl lg:p-6 p-4 min-h-screen border space-y-8">
      {/* PAGE HEADER */}
      <div className="flex lg:flex-row gap-6 flex-col justify-between items-center">
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
            className="rounded-full py-4 px-4"
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
        <div className="w-full bg-card border p-2 rounded-2xl flex justify-between items-center px-6">
          <div className="flex items-center gap-3 w-100 border bg-card px-4 py-1 rounded-full">
            <Search />
            <Input
              placeholder="Search Section Name..."
              className="border-none bg-transparent shadow-none p-0 focus-visible:ring-0 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* REGION LIST */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-60 w-full" />
          ))}
        </div>
      ) : filteredInternetPackages?.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
