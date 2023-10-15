import { removeInPlayList } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await removeInPlayList(Number(id));
  return NextResponse.json({ status: 200 });
}
