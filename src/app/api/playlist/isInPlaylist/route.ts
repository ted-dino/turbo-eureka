import { getPlayList } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const dbResponse = await getPlayList(data);
  if (dbResponse.length !== 0) {
    return NextResponse.json({ status: 201 });
  } else {
    return NextResponse.json({ status: 400 });
  }
}
