import { Progress } from "@/components/ui/progress";
import { SectionType } from "@/lib/types/section";
import { Folder, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SectionCard({ section }: { section: SectionType }) {
  return (
    <Link
      href={`/sections/${section.id}`}
      className="w-64  rounded-2xl block  bg-indigo-100/80 p-4 space-y-4 shadow-sm "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
          <Folder className="h-5 w-5 text-slate-700" />
        </div>
        <span className="text-slate-500">•••</span>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <p className="text-sm text-slate-600">{section.name}</p>
        <h2 className="text-xl font-bold">640 Files</h2>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <Progress value={49} className="h-2 bg-white" />
        <div className="flex justify-between text-xs text-slate-600">
          <span>24.5 GB</span>
          <span>50 GB</span>
        </div>
      </div>

      {/* Footer */}
      <button className="w-full flex items-center justify-between text-sm font-medium">
        View
        <ArrowRight className="h-4 w-4" />
      </button>
    </Link>
  );
}
