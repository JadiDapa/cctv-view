// components/ItemCard.tsx
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ItemType } from "@/lib/types/item";
import { EllipsisVertical, FolderOpenDot } from "lucide-react";
import Link from "next/link";

export default function ItemCard({ item }: { item: ItemType }) {
  return (
    <Link href={`/items/${item.id}`} className="block">
      <Card className="w-64 rounded-sm hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <FolderOpenDot className="size-8" />
              <CardTitle className="capitalize ">{item.name}</CardTitle>
            </div>
            <EllipsisVertical className="size-5" strokeWidth={1.4} />
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          <Separator />
          <div className="flex -space-x-2"></div>
        </CardContent>
      </Card>
    </Link>
  );
}
