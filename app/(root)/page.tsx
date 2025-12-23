"use client";

import { useState } from "react";
import { CameraCard } from "@/components/root/camera/CameraCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateCameraDialog from "@/components/root/camera/CreateCameraDialog";
import { getAllCameras } from "@/lib/networks/camera";
import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "@/lib/networks/user";
import { useUser } from "@clerk/nextjs";

const GRID_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export default function DashboardPage() {
  const [grid, setGrid] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(2);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const { data: cameras } = useQuery({
    queryFn: getAllCameras,
    queryKey: ["cameras"],
  });

  const { user } = useUser();

  const { data: account } = useQuery({
    queryFn: () => getUserByUsername(user?.username as string),
    queryKey: ["user"],
  });

  const isAdmin = account?.role === "ADMIN";

  const filteredCameras = cameras?.filter((camera) =>
    camera.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (!cameras || !filteredCameras) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen w-full space-y-8 overflow-hidden border p-4 md:rounded-2xl lg:p-6">
      <div className="mt-20 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-80 flex-col gap-3">
          <div className="bg-muted/40 flex items-center gap-3 rounded-lg border p-1.5">
            <div className="text-muted-foreground flex items-center gap-2 px-2 text-sm font-medium">
              <LayoutGrid className="h-4 w-4" />
              Grid
            </div>

            <div className="flex gap-1">
              {GRID_OPTIONS.map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant={grid === value ? "default" : "ghost"}
                  className="size-7 rounded-lg p-0"
                  onClick={() => setGrid(value)}
                  aria-label={`Set grid to ${value} columns`}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cameras..."
                className="pl-9"
              />
            </div>

            <Button onClick={() => setSearch(query)} className="h-9 px-3">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div
          className={cn(
            "grid transition-all",
            grid === 1 && "grid-cols-1 gap-4",
            grid === 2 && "grid-cols-2 gap-4",
            grid === 3 && "grid-cols-3 gap-4",
            grid === 4 && "grid-cols-4 gap-2",
            grid === 5 && "grid-cols-5 gap-2",
            grid === 6 && "grid-cols-6 gap-1",
            grid === 7 && "grid-cols-6 gap-1",
          )}
        >
          {filteredCameras.map((camera) => (
            <CameraCard key={camera.id} {...camera} />
          ))}

          {isAdmin && <CreateCameraDialog />}
        </div>
      </section>
    </main>
  );
}

// export const cameras = [
//   {
//     id: "1",
//     title: "AIR BATU ARAH PALEMBANG",
//     iframe:
//       "https://cctv.banyuasinkab.go.id/zm/cgi-bin/nph-zms?user=tamu&pass=tamu123&monitor=4",
//   },
//   {
//     id: "2",
//     title: "AIR BATU ARAH BETUNG",
//     iframe:
//       "https://cctv.banyuasinkab.go.id/zm/cgi-bin/nph-zms?user=tamu&pass=tamu123&monitor=9",
//   },
//   {
//     id: "3",
//     title: "SEMBAWA ARAH PALEMBANG",
//     iframe:
//       "https://cctv.banyuasinkab.go.id/zm/cgi-bin/nph-zms?user=tamu&pass=tamu123&monitor=15",
//   },
//   {
//     id: "4",
//     title: "PINTU MASUK TOL KRAMASAN",
//     iframe: "https://stream-cctv-wst.my.id:5443/LiveApp/streams/11150.m3u8",
//   },
//   {
//     id: "5",
//     title: "PINTU MASUK TOL PEMULUTAN",
//     iframe:
//       "https://extstream.hk-opt2.com/LiveApp/streams/180147138812973317702348.m3u8",
//   },
//   // {
//   //   id: "6",
//   //   title: "KM 000+150 (Akses Kramasan)",
//   //   iframe: "https://stream-cctv-wst.my.id:5443/LiveApp/play.html?name=10362",
//   // },
//   // {
//   //   id: "7",
//   //   title: "KM 000+150 (Akses Kramasan)",
//   //   iframe: "https://stream-cctv-wst.my.id:5443/LiveApp/play.html?name=11150",
//   // },
//   // {
//   //   id: "8",
//   //   title: "KM 000+150 (Akses Kramasan)",
//   //   iframe: "https://stream-cctv-wst.my.id:5443/LiveApp/play.html?name=11150",
//   // },
//   // {
//   //   id: "9",
//   //   title: "KM 000+150 (Akses Kramasan)",
//   //   iframe: "https://stream-cctv-wst.my.id:5443/LiveApp/play.html?name=11150",
//   // },
//   // {
//   //   id: "10",
//   //   title: "KM 000+150 (Akses Kramasan)",
//   //   iframe: "https://stream-cctv-wst.my.id:5443/LiveApp/play.html?name=11150",
//   // },
// ];
