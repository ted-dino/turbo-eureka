import { getAllPlayList } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Invalid data. Please try again." },
        { status: 400 },
      );
    }
    const response = await getAllPlayList(Number(id));

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Error: ${error.message}` },
        { status: 500 },
      );
    }
  }
}
