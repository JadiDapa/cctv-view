import UpdateCameraDialog from "./UpdateCameraDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DeleteCameraDialog from "./DeleteCameraDialog";
import { MoreHorizontal } from "lucide-react";
import { CameraType } from "@/lib/types/camera";

export default function CameraActions({ camera }: { camera: CameraType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal size={18} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/cameras/${camera.id}`}>View</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <UpdateCameraDialog camera={camera} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <DeleteCameraDialog cameraId={camera.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
