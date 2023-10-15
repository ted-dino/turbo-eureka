import { saveToPlaylist } from "@/lib/db";
import { deleteSession, verifySession } from "@/lib/session";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const cookie = cookies().get("tedflix.session-token")?.value;
  if (!cookie) {
    return NextResponse.json(
      { message: "Please login to save to your playlist." },
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

  try {
    if (!data) {
      return NextResponse.json({ status: 400, errors: "Invalid data" });
    }

    const dbResponse = await saveToPlaylist(data, Number(userId));
    return NextResponse.json(
      { message: dbResponse.data[0].message },
      { status: dbResponse.status },
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: `Unexpected Error: ${error}` },
      { status: 500 },
    );
  }
}
