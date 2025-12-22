import { Play, SkipBack, SkipForward, Volume2, Settings } from "lucide-react";

export function CameraControl({
  title,
  time,
}: {
  title: string;
  time: string;
}) {
  return (
    <div className="absolute right-0 bottom-0 left-0 space-y-2 bg-linear-to-t from-black/80 to-transparent p-4 text-white">
      {/* Info */}
      <div className="text-sm">
        <p className="font-medium">{title}</p>
        <p className="opacity-80">{time}</p>
      </div>

      {/* Timeline */}
      <input type="range" className="w-full accent-white" defaultValue={30} />

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Volume2 size={18} />
          <span className="text-xs">03:06 / 06:45</span>
        </div>

        <div className="flex items-center gap-4">
          <SkipBack size={18} />
          <Play size={22} />
          <SkipForward size={18} />
        </div>

        <Settings size={18} />
      </div>
    </div>
  );
}
