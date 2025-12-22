import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Camera } from "@/lib/types/camera";

export function CameraThumbnail({ feed }: { feed: Camera }) {
  return (
    <div className="relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-black">
      <Image
        src={feed.image}
        alt={feed.name}
        fill
        className="w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

      <div className="absolute top-1 right-1 text-white">
        <MoreHorizontal size={14} />
      </div>

      <div className="absolute bottom-1 left-1 text-xs text-white">
        <p className="font-medium">{feed.name}</p>
        <p className="opacity-80">{feed.time}</p>
      </div>
    </div>
  );
}
