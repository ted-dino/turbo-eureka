import * as argon2 from "argon2";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { users } from "./schema";

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
neonConfig.fetchConnectionCache = true;

export const db = drizzle(sql);

export async function getUserByEmail(email: string) {
  return db.select().from(users).where(eq(users.email, email));
}

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  interface Response {
    email: string;
    avatar: string;
    message?: string;
  }
  let toInsertData = {
    email,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/png?radius=10&size=30",
    password: await argon2.hash(password),
  };

  let response: Response[] = [
    {
      email,
      avatar: "",
      message: `Failed to register. Please try again.`,
    },
  ];
  let responseStatus = 418;

  try {
    const dbResponse = await db.insert(users).values(toInsertData).returning();
    const dbResponseData = dbResponse[0];
    response = [
      {
        email: dbResponseData.email,
        avatar: dbResponseData.avatar,
        message: "Registration completed successfully",
      },
    ];
    responseStatus = 201;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        response[0].message = `${email} has already been added.`;
      }
    }
  }
  return { data: response, status: responseStatus };
}
