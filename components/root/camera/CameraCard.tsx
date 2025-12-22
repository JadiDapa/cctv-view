import { MoreHorizontal, Wifi } from "lucide-react";

import Link from "next/link";

interface CameraCardProps {
  id: string;
  title: string;
  iframe: string;
}

export function CameraCard({ id, title, iframe }: CameraCardProps) {
  return (
    <Link
      href={`/camera/${id}`}
      className="relative block aspect-video overflow-hidden rounded-2xl"
    >
      <iframe src={iframe} className="absolute m-0 h-full w-full border p-0" />
      <div className="absolute inset-0 z-10"></div>

      {/* Top Icons */}

      <div className="absolute top-2 right-2 flex items-center gap-2 text-sm text-white">
        <div className="flex items-center gap-2 rounded-md border border-green-700 bg-green-200/20 px-2 text-green-700">
          <p className="">Active</p>
          <Wifi size={16} />
        </div>

        <MoreHorizontal size={18} />
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-2 left-2 text-sm text-white">
        <p className="font-medium">{title}</p>
        <p className="text-xs opacity-80">{new Date().toDateString()}</p>
      </div>
    </Link>
  );
}
