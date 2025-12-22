"use client";

import PageHeader from "@/components/root/PageHeader";
import { useParams } from "next/navigation";
import { cameras } from "../../page";
import { MoreHorizontal, Wifi } from "lucide-react";
import { CameraCard } from "@/components/root/camera/CameraCard";

export default function SelectedCamera() {
  const { id } = useParams();

  const camera = cameras.find((camera) => camera.id === id);
  const otherCameras = cameras.filter((camera) => camera.id !== id);

  return (
    <main className="min-h-screen w-full space-y-8 overflow-hidden border p-4 md:rounded-2xl lg:p-6">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <PageHeader title={camera?.title} subtitle="Section : KM 0" />
      </div>
      <div className="flex h-[80vh] w-full flex-col gap-6 lg:flex-row">
        <div className="relative aspect-video flex-1 overflow-hidden rounded-2xl">
          <div className="relative block aspect-video overflow-hidden rounded-2xl">
            <iframe
              src={camera?.iframe}
              allow="fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />

            {/* Overlay */}

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
              <p className="font-medium">{camera?.title}</p>
              <p className="text-xs opacity-80">{new Date().toDateString()}</p>
            </div>
          </div>
        </div>
        <aside className="w-full overflow-x-scroll pr-2 lg:w-64 lg:overflow-y-scroll">
          <p className="mb-4 text-lg font-semibold">Other Cameras: </p>
          <div className="flex flex-row gap-2 lg:flex-col">
            {otherCameras.map((cameras) => (
              <CameraCard key={cameras.id} {...cameras} />
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
