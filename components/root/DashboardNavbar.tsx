"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Bell, Search } from "lucide-react";
import Image from "next/image";
import { useAccount } from "@/providers/AccountProvider";

export default function DashboardNavbar() {
  const account = useAccount();

  return (
    <header className="border-border hidden w-full items-center justify-between rounded-2xl border bg-white px-6 py-3 md:flex">
      {/* Search */}
      <div className="bg-card flex w-87 items-center gap-3 rounded-full border px-4 py-2">
        <Search />

        <Input
          type="text"
          placeholder="Search task"
          className="border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
        />

        <Badge className="rounded-md bg-gray-200 px-2 py-1 text-gray-600">
          ⌘ F
        </Badge>
      </div>

      {/* Icons + User */}
      <div className="flex items-center gap-2">
        <div className="bg-card rounded-full border p-2">
          <Mail className="size-5 text-gray-600" />
        </div>
        <div className="bg-card rounded-full border p-2">
          <Bell className="size-5 text-gray-600" />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s" // replace with actual avatar
            width={38}
            height={38}
            alt="avatar"
            className="rounded-full border"
          />

          <div className="flex flex-col leading-tight">
            <span className="font-medium">
              {account.account?.fullName || "Daffa Althaf"}
            </span>
            <span className="text-sm text-gray-500">
              daffaalthaf25@gmail.com
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
