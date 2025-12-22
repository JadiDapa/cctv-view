"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { SectionType } from "@/lib/types/section";
import { format } from "date-fns";
import Link from "next/link";

export default function SectionCard({ section }: { section: SectionType }) {
  return (
    <Link href={`/sections/${section.id}`}>
      <Card className="w-full rounded-2xl border shadow-sm">
        <CardContent className="space-y-4 p-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black font-bold text-white">
                a
              </div>
              <div>
                <p className="text-sm font-semibold">{section.name}</p>
                <p className="text-muted-foreground text-xs">
                  {format(section.createdAt, "d MMMM yyyy")}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 px-3 text-xs"
            >
              Save <Bookmark className="h-3 w-3" />
            </Button>
          </div>

          {/* Title */}
          <h3 className="text-lg leading-snug font-semibold capitalize">
            {section.name}
          </h3>

          {/* Tags */}
          {/* <div className="flex gap-2">
          <Badge variant="secondary" className="rounded-md">
            Part-time
          </Badge>
          <Badge variant="secondary" className="rounded-md">
            Senior level
          </Badge>
        </div> */}

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="font-semibold">
                {section.items.length} Items Available
              </p>
              <p className="text-muted-foreground text-xs">San Francisco, CA</p>
            </div>

            <Button className="rounded-lg px-5">See Items</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
