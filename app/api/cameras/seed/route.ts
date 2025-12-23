import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const users = await prisma.user.createMany({
      data: [
        {
          name: "Administrator",
          role: "ADMIN",
        },
        {
          name: "Guest",
          role: "GUEST",
        },
      ],
    });

    return NextResponse.json(
      {
        message: "Users created successfully",
        count: users.count,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating users:", error);

    return NextResponse.json(
      {
        message: "Failed to create users",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
