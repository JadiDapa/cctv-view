"use client";

import {
  Home,
  LogOut,
  Newspaper,
  Settings,
  MapPin,
  Wrench,
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
  {
    title: "Sections",
    icon: MapPin,
    url: "/sections",
  },
  {
    title: "Items",
    url: "/items",
    icon: Wrench,
  },
  {
    title: "Documents",
    icon: Newspaper,
    url: "/documents",
  },
];

const settingsItems = [
  {
    title: "Pengaturan",
    url: "/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { signOut } = useClerk();

  return (
    <Sidebar className="hidden md:flex p-2 border-none bg-muted w-70">
      <SidebarContent className="bg-muted">
        <ScrollArea className="h-screen bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex px-6 py-6 pt-6">
            <div className="text-primary text-3xl font-semibold tracking-wide flex items-center gap-4">
              <figure className="relative size-10">
                <Image
                  src={"/logo.png"}
                  fill
                  className="object-center object-contain"
                  alt=""
                />
              </figure>
              <p>FileGear</p>
            </div>
          </div>
          {/* Overview */}
          <SidebarGroup className="pt-1 p-0">
            <SidebarGroupLabel className="ps-6 font-semibold text-sm">
              MENU
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {overviewItems.map((item) => {
                  const active = pathname === item.url;
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="relative p-0 rounded-none"
                    >
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex h-10 items-center gap-x-4 px-6"
                        >
                          <div
                            className={`${
                              active ? "block" : "hidden"
                            } absolute left-0 top-0 h-full bg-primary w-2 rounded-e-4xl`}
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
          <SidebarGroup className="mt-auto p-0 pt-6  pb-6">
            <SidebarGroupLabel className="ps-6 font-semibold text-sm">
              GENERAL
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => {
                  const active = pathname === item.url;

                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="relative p-0 rounded-none"
                    >
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex h-10 items-center gap-x-4 px-6"
                        >
                          <div
                            className={`${
                              active ? "block" : "hidden"
                            } absolute left-0 top-0 h-full bg-primary w-2 rounded-e-4xl`}
                          />
                          <item.icon className="size-5" />
                          <span className="text-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                <SidebarMenuItem className="relative p-0 rounded-none">
                  <SidebarMenuButton asChild>
                    <div
                      onClick={() => signOut({ redirectUrl: "/" })}
                      className="flex h-10 items-center gap-x-4 px-6"
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
