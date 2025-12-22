"use client";

import { Home, LogOut } from "lucide-react";
import Image from "next/image";
import { useAccount } from "@/providers/AccountProvider";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

export default function DashboardNavbar() {
  const account = useAccount();
  const { signOut } = useClerk();

  return (
    <header className="border-border bg-background fixed z-999 hidden w-[98%] items-center justify-between rounded-2xl border px-6 py-2 md:flex">
      {/* Search */}

      <div className="">
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-3">
            <figure className="relative size-14">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Lambang_Polda_Sumsel.png"
                fill
                className="object-contain object-center"
                alt="Logo Polda Sumsel"
              />
            </figure>
            <figure className="relative size-14">
              <Image
                src="/images/tik.png"
                fill
                className="object-contain object-center"
                alt="Logo TIK Polri"
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="ps-40">
        <p className="text-primary text-3xl font-semibold">
          {"Dashboard CCTV Polda Sumsel"}
        </p>
      </div>

      {/* Icons + User */}
      <div className="flex items-center gap-2">
        <div className="mr-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hover:bg-primary flex flex-col items-center rounded-md border p-2 px-6 hover:text-white"
            >
              <Home />
              <p className="text-sm">Dashboard</p>
            </Link>
          </div>
        </div>
        <div
          onClick={() => signOut}
          className="bg-card hover:bg-primary rounded-full border p-2 hover:text-white"
        >
          <LogOut className="size-5 text-gray-600" />
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
