import { NextResponse } from "next/server";
import { registerUser } from "@/lib/db";
import { setUserSession } from "@/lib/session";
import { AxiosError } from "axios";

interface Response {
  email: string;
  avatar: string;
  message?: string;
}

export async function POST(request: Request) {
  const data = await request.json();
  if (!data) {
    return NextResponse.json({ status: 400, errors: "Invalid data" });
  }

  const { email, password, confirmPassword } = data;
  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        message: "Password must match. Please try again.",
      },
      { status: 400 },
    );
  }

  try {
    const toSaveData = {
      email,
      password,
    };

    const dbResponse = await registerUser(toSaveData);

    if (dbResponse.status === 201) {
      await setUserSession(email);
    }
    const { message } = dbResponse.data[0];

    return NextResponse.json(
      {
        data: message,
      },
      { status: dbResponse.status },
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        message: `Unexpected Error: ${error}`,
      },
      { status: 500 },
    );
  }
}
