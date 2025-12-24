import { Wifi } from "lucide-react";

import { useRouter } from "next/navigation";

import { CameraType } from "@/lib/types/camera";
import CameraActions from "./CameraActions";

interface CameraCardProps {
  camera: CameraType;
  isAdmin?: boolean;
}

export function CameraCard({ camera, isAdmin }: CameraCardProps) {
  const router = useRouter();

  return (
    <div className="relative block aspect-video overflow-hidden rounded-2xl">
      <video
        src={camera.url}
        autoPlay
        muted
        playsInline
        className="absolute h-full w-full bg-black object-contain"
      />

      <div
        onClick={() => router.push(`/cameras/${camera.id}`)}
        className="absolute inset-0 cursor-pointer"
      />
      {/* Top Icons */}
      <div className="absolute top-2 right-2 flex items-center gap-2 text-sm text-white">
        <div className="flex items-center gap-2 rounded-md border border-green-700 bg-green-200/20 px-2 text-green-700">
          <p className="">{camera.status}</p>
          <Wifi size={16} />
        </div>

        {isAdmin && <CameraActions camera={camera} />}
      </div>
      {/* Bottom Info */}
      <div className="absolute bottom-2 left-2 text-sm text-white">
        <p className="font-medium">{camera.title}</p>
        <p className="text-xs opacity-80">{new Date().toDateString()}</p>
      </div>
    </div>
  );
}
