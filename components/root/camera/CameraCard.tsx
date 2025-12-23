import { MoreHorizontal, Wifi } from "lucide-react";

import { useRouter } from "next/navigation";
import UpdateCameraDialog from "./UpdateCameraDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DeleteCameraDialog from "./DeleteCameraDialog";

interface CameraCardProps {
  id: string;
  title: string;
  url: string;
  status: string;
}

export function CameraCard({ id, title, url, status }: CameraCardProps) {
  const router = useRouter();
  return (
    <div className="relative block aspect-video overflow-hidden rounded-2xl">
      <iframe
        onClick={() => router.push(`/cameras/${id}`)}
        src={url}
        className="absolute m-0 h-full w-full cursor-pointer border p-0"
      />

      <div
        onClick={() => router.push(`/cameras/${id}`)}
        className="absolute inset-0 cursor-pointer"
      />

      {/* Top Icons */}

      <div className="absolute top-2 right-2 flex items-center gap-2 text-sm text-white">
        <div className="flex items-center gap-2 rounded-md border border-green-700 bg-green-200/20 px-2 text-green-700">
          <p className="">{status}</p>
          <Wifi size={16} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal size={18} className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={`/cameras/${id}`}>View</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <UpdateCameraDialog camera={{ id, title, url, status }} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <DeleteCameraDialog cameraId={id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-2 left-2 text-sm text-white">
        <p className="font-medium">{title}</p>
        <p className="text-xs opacity-80">{new Date().toDateString()}</p>
      </div>
    </div>
  );
}
