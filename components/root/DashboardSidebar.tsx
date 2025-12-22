"use client";

import {
  Home,
  LogOut,
  Newspaper,
  Settings,
  MapPin,
  Wrench,
  Camera,
  Users,
  ChevronLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const overviewItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  // {
  //   title: "Sections",
  //   icon: MapPin,
  //   url: "/sections",
  // },
  // {
  //   title: "Cameras",
  //   url: "/cameras",
  //   icon: Camera,
  // },
  // {
  //   title: "Users",
  //   icon: Users,
  //   url: "/users",
  // },
];

// const settingsItems = [
//   // {
//   //   title: "Pengaturan",
//   //   url: "/settings",
//   //   icon: Settings,
//   // },
// ];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const { signOut } = useClerk();

  return (
    <Sidebar className="hidden w-70 border-none p-2 md:flex">
      <div
        onClick={toggleSidebar}
        className="bg-primary absolute top-6 -right-8 grid size-10 cursor-pointer place-items-center rounded-e-md border text-white"
      >
        <ChevronLeft className="size-5" />
      </div>
      <SidebarContent className="bg-background">
        <ScrollArea className="border-border h-screen overflow-hidden rounded-2xl border">
          <div className="flex px-6 py-6 pt-6">
            <div className="text-primary flex items-center gap-4 text-center text-3xl font-semibold tracking-wide">
              <figure className="relative size-10">
                <Image
                  src={
                    "https://www.citypng.com/public/uploads/preview/png-video-camera-recording-green-icon-701751694974681hz4bkhiqlp.png?v=2025090410"
                  }
                  fill
                  className="object-contain object-center"
                  alt=""
                />
              </figure>
              <p>SurveiCam</p>
            </div>
          </div>
          {/* Overview */}
          <SidebarGroup className="p-0 pt-1">
            <SidebarGroupLabel className="ps-6 text-sm font-semibold">
              MENU
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {overviewItems.map((item) => {
                  const active = pathname === item.url;
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="relative rounded-none p-0"
                    >
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex h-10 items-center gap-x-4 px-6"
                        >
                          <div
                            className={`${
                              active ? "block" : "hidden"
                            } bg-primary absolute top-0 left-0 h-full w-2 rounded-e-4xl`}
                          />
                          <item.icon className="size-5" />
                          <span className="text-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* SETTINGS pinned to bottom */}
          <SidebarGroup className="mt-auto p-0 pt-6 pb-6">
            <SidebarGroupLabel className="ps-6 text-sm font-semibold">
              GENERAL
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {/* {settingsItems.map((item) => {
                  const active = pathname === item.url;

                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="relative rounded-none p-0"
                    >
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex h-10 items-center gap-x-4 px-6"
                        >
                          <div
                            className={`${
                              active ? "block" : "hidden"
                            } bg-primary absolute top-0 left-0 h-full w-2 rounded-e-4xl`}
                          />
                          <item.icon className="size-5" />
                          <span className="text-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })} */}
                <SidebarMenuItem className="relative rounded-none p-0">
                  <SidebarMenuButton asChild>
                    <div
                      onClick={() => signOut({ redirectUrl: "/" })}
                      className="flex h-10 cursor-pointer items-center gap-x-4 px-6"
                    >
                      <LogOut className="size-5" />
                      <span className="text-base">Log Out</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
