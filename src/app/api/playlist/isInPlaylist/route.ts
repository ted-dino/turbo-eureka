import { getPlayList } from "@/lib/db";
import { deleteSession, verifySession } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const cookie = cookies().get("tedflix.session-token")?.value;
  if (!cookie) {
    return NextResponse.json(
      { message: "To save items to your playlist, kindly log in." },
      { status: 400 },
    );
  }
  const userId = await verifySession(cookie as string);
  if (!userId) {
    await deleteSession();
    return NextResponse.json(
      { message: "Session expired. Please log in again." },
      { status: 400 },
    );
  }

  const dbResponse = await getPlayList(data);
  if (dbResponse.length !== 0 && cookie && userId) {
    return NextResponse.json({ status: 201 });
  } else {
    return NextResponse.json({ status: 400 });
  }
}
