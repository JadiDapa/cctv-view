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
      <Card className="w-full rounded-2xl shadow-sm border bg-white">
        <CardContent className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white font-bold">
                a
              </div>
              <div>
                <p className="font-semibold text-sm">{section.name}</p>
                <p className="text-xs text-muted-foreground">
                  {format(section.createdAt, "d MMMM yyyy")}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs gap-1"
            >
              Save <Bookmark className="h-3 w-3" />
            </Button>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold leading-snug capitalize">
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
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-semibold">
                {section.items.length} Items Available
              </p>
              <p className="text-xs text-muted-foreground">San Francisco, CA</p>
            </div>

            <Button className="rounded-lg px-5">See Items</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
