"use client";

import { useState } from "react";
import { CameraCard } from "@/components/root/camera/CameraCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateCameraDialog from "@/components/root/camera/CreateCameraDialog";
import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "@/lib/networks/user";
import { useUser } from "@clerk/nextjs";
import { getAllCameras } from "@/lib/networks/camera";

const GRID_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

// const cameras = [
//   {
//     id: "fff1132e-0108-4cf5-861e-c25b10b6329a",
//     title: "KM 42 ARAH BETUNG",
//     url: "http://36.93.114.219:8080/c8f8786f1724c735ce8e2c4c9faac105/hls/syuxF84yDX/xEhv7GaEoP/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:55:50.057Z",
//     updatedAt: "2025-12-24T07:55:50.057Z",
//   },
//   {
//     id: "e1eba13c-9503-45f4-af80-34c7f1105780",
//     title: "DEPAN SPBU BETUNG ARAH BETUNG",
//     url: "http://36.93.114.219:8080/ad462ce3b6600efa7381f1e827de174b/hls/syuxF84yDX/9ppvsuJiaV/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:30:43.398Z",
//     updatedAt: "2025-12-24T07:30:43.398Z",
//   },
//   {
//     id: "d61a8db3-c3ab-48cd-8ef1-b5bf09285672",
//     title: "PASAR PANGKALAN BALAI ARAH BETUNG",
//     url: "http://36.93.114.219:8080/ad462ce3b6600efa7381f1e827de174b/hls/syuxF84yDX/dtDzjuhbsI/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:47:13.531Z",
//     updatedAt: "2025-12-24T07:47:13.531Z",
//   },
//   {
//     id: "c1ba7c90-e5fb-4e95-b5fb-62606e252912",
//     title: "SIMPANG TALANG BETUTU ARAH PALEMBANG",
//     url: "http://36.93.114.219:8080/c8f8786f1724c735ce8e2c4c9faac105/hls/syuxF84yDX/ehfGWBcIwQ/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:59:08.404Z",
//     updatedAt: "2025-12-24T07:59:08.404Z",
//   },
//   {
//     id: "86b76e88-5629-449d-a7bc-e209e17ca870",
//     title: "PANCUR ARAH PANGKALAN BALAI",
//     url: "http://36.93.114.219:8080/ad462ce3b6600efa7381f1e827de174b/hls/syuxF84yDX/k8G839BHlE/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:34:23.936Z",
//     updatedAt: "2025-12-24T07:34:23.936Z",
//   },
//   {
//     id: "7f83accf-87d7-43e3-ad43-d4b87767bfe8",
//     title: "PASAR SUNGAI LILIN ARAH JAMBI",
//     url: "http://36.93.114.219:8080/494a36be2dccf5b11997688d7c950825/hls/syuxF84yDX/GJKz25ua3H/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:11:48.413Z",
//     updatedAt: "2025-12-24T07:12:43.622Z",
//   },
//   {
//     id: "7bb64b33-8220-4ae6-8c85-b574c9c9df46",
//     title: "PASAR PANGKALAN BALAI ARAH PALEMBANG",
//     url: "http://36.93.114.219:8080/c8f8786f1724c735ce8e2c4c9faac105/hls/syuxF84yDX/DknvPUAsVk/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:52:32.165Z",
//     updatedAt: "2025-12-24T07:52:32.165Z",
//   },
//   {
//     id: "71ac9057-ec0f-4b38-ae89-baf2eed6275f",
//     title: "KM 42 ARAH PALEMBANG",
//     url: "http://36.93.114.219:8080/c8f8786f1724c735ce8e2c4c9faac105/hls/syuxF84yDX/7WzcdsSiEF/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:57:01.676Z",
//     updatedAt: "2025-12-24T07:57:01.676Z",
//   },
//   {
//     id: "6fc7ea76-476d-4d4c-ae02-014347d2022a",
//     title: "SIMPANG TALANG BETUTU ARAH BANYUASIN",
//     url: "http://36.93.114.219:8080/3433a0c05c0b7237a98549502a99e234/hls/syuxF84yDX/UX43pCI2b4/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T08:09:23.201Z",
//     updatedAt: "2025-12-24T08:09:23.201Z",
//   },
//   {
//     id: "6cfdc341-5f24-492e-a125-148ce56aeed7",
//     title: "PASAR KM 5",
//     url: "http://36.93.114.219:8080/494a36be2dccf5b11997688d7c950825/hls/syuxF84yDX/XSPrcCJN1m/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:09:05.107Z",
//     updatedAt: "2025-12-24T07:09:22.041Z",
//   },
//   {
//     id: "6ac45418-3faf-4366-ad76-bd55e2bfb4f6",
//     title: "PINTU MASUK TOL KRAMASAN",
//     url: "https://stream-cctv-wst.my.id:5443/LiveApp/streams/11150.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-23T10:13:04.645Z",
//     updatedAt: "2025-12-23T10:13:04.645Z",
//   },
//   {
//     id: "5e6639e3-5bbd-41b5-b8e2-2a921ea6dbe7",
//     title: "PINTU MASUK TOL PEMULUTAN",
//     url: "https://extstream.hk-opt2.com/LiveApp/streams/180147138812973317702348.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-23T10:13:38.937Z",
//     updatedAt: "2025-12-23T10:13:38.937Z",
//   },
//   {
//     id: "271b1e38-5ca8-4f92-93de-2200fa35d187",
//     title: "PANCUR ARAH BETUNG",
//     url: "http://36.93.114.219:8080/ad462ce3b6600efa7381f1e827de174b/hls/syuxF84yDX/IQYhtzRSyJ/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:38:42.375Z",
//     updatedAt: "2025-12-24T07:42:14.436Z",
//   },
//   {
//     id: "11669371-bb78-4d6c-8fb3-b2a0ed69c973",
//     title: "PASAR SUNGAI LILIN ARAH PALEMBANG",
//     url: "http://36.93.114.219:8080/ad462ce3b6600efa7381f1e827de174b/hls/syuxF84yDX/8fyo9pjr2J/s.m3u8",
//     status: "ACTIVE",
//     createdAt: "2025-12-24T07:19:23.680Z",
//     updatedAt: "2025-12-24T07:28:24.670Z",
//   },
// ];

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
            <CameraCard key={camera.id} camera={camera} isAdmin={isAdmin} />
          ))}

          {isAdmin && <CreateCameraDialog />}
        </div>
      </section>
    </main>
  );
}
