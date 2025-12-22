import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.item.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        documents: { select: { id: true } },
        section: true,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, description, sectionId } = body;

    const result = await prisma.item.create({
      data: {
        name,
        description,
        sectionId,
      },
      include: {
        documents: true,
        section: true,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { message: "Something went wrong!", error: (error as Error).message },
      { status: 500 }
    );
  }
}
