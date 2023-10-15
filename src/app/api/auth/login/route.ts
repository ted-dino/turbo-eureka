import { getUserByEmail } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as argon2 from "argon2";
import { setUserSession } from "@/lib/session";
import { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, password } = data;

    const isValidData = email && password;

    if (!isValidData || !data) {
      return NextResponse.json(
        { message: "Email and Password are required!" },
        { status: 400 },
      );
    }

    const dbResponse = await getUserByEmail(email);
    if (!dbResponse) {
      return NextResponse.json(
        { message: "No found user. Please sign up." },
        { status: 400 },
      );
    }

    const user = dbResponse[0];
    if (!user) {
      return NextResponse.json(
        { message: "No found user. Please sign up." },
        { status: 400 },
      );
    }

    if (!user.email && !user.password) {
      return NextResponse.json(
        { message: "No found user. Please sign up." },
        { status: 400 },
      );
    }
    const hashedPassword = user.password;
    const isPasswordValid = await argon2.verify(hashedPassword, password);

    if (isPasswordValid && user.email !== email) {
      return NextResponse.json(
        { message: "No registered email. Please sign up." },
        { status: 400 },
      );
    }

    await setUserSession(email);
    return NextResponse.json({}, { status: 200 });
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
