"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import DataTable from "@/components/root/DataTable";
import { documentColumns } from "@/lib/column/document";
import SearchDataTable from "@/components/root/SearchDataTable";
import { getItemById } from "@/lib/networks/item";
import CreateDocumentDialog from "@/components/root/section/CreateDocumentDialog";

export default function ItemsDocuments() {
  const { id } = useParams();

  const {
    data: item,
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryFn: () => getItemById(id as string),
    queryKey: ["items", id],
  });

  const filteredDocuments = item?.documents;

  if (!filteredDocuments || !item || isLoading)
    return <Skeleton className="h-32 w-full rounded-2xl" />;

  return (
    <main className="min-h-screen w-full space-y-8 border p-4 md:rounded-2xl lg:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="">
          <p className="text-primary font-semibold">Item :</p>
          <PageHeader
            title={item.name}
            subtitle={
              "These are every " +
              item.name +
              " documents that you have created!"
            }
          />
        </div>

        <div className="flex gap-3">
          <CreateDocumentDialog itemId={id as string} />

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

      {/* REGION LIST */}
      <DataTable
        columns={documentColumns}
        data={filteredDocuments ?? []}
        title="Document List"
        filters={(table) => (
          <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
            <SearchDataTable
              table={table}
              column="title"
              placeholder="Search Document Title..."
            />
          </div>
        )}
      />
    </main>
  );
}
