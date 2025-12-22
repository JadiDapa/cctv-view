import { CameraGroup } from "@/lib/types/camera";
import { CameraCard } from "./CameraCard";

export function CameraSection({ group }: { group: CameraGroup }) {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {group.cameras.map((camera) => (
          <CameraCard key={camera.id} camera={camera} />
        ))}
      </div>
    </section>
  );
}
