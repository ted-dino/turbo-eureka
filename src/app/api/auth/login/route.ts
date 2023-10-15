import { getUserByEmail } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as argon2 from "argon2";
import { setUserSession } from "@/lib/session";
import { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and Password are required!" },
        { status: 400 },
      );
    }

    const dbResponse = await getUserByEmail(email);

    if (!dbResponse || !dbResponse[0]) {
      return NextResponse.json(
        { message: "No user found. Please sign up." },
        { status: 400 },
      );
    }

    const user = dbResponse[0];
    const hashedPassword = user.password;
    const isPasswordValid = await argon2.verify(hashedPassword, password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 400 },
      );
    }

    const cookie = await setUserSession(String(user.id));
    const response = NextResponse.json({}, { status: 200 });
    response.cookies.set({
      name: "tedflix.session-token",
      value: cookie,
      path: "/",
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data.message },
        { status: 500 },
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
