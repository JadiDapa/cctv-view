"use client";

import { cn } from "@/lib/utils";

const tabs = ["All", "KM 1", "KM 0"];

export function CameraTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm whitespace-nowrap",
            active === tab
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
