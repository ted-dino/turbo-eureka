import { removeInPlayList } from "@/lib/db";
import { deleteSession, verifySession } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
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

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await removeInPlayList(Number(id));
  return NextResponse.json({ status: 200 });
}
