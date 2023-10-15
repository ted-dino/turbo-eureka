import * as argon2 from "argon2";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { shows, users } from "./schema";
import { Movie } from "@/types";

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
    id: string;
    email: string;
    message?: string;
  }
  let toInsertData = {
    email,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/png?radius=10&size=30",
    password: await argon2.hash(password),
  };

  let response: Response[] = [
    {
      id: "",
      email: "",
      message: `Failed to register. Please try again.`,
    },
  ];
  let responseStatus = 418;

  try {
    const dbResponse = await db.insert(users).values(toInsertData).returning();
    const dbResponseData = dbResponse[0];
    response = [
      {
        id: dbResponseData.id.toString(),
        email: dbResponseData.email,
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

export async function saveToPlaylist(item: Movie, userId: number) {
  const { id, poster_path, title } = item;

  let response = [
    {
      message: "",
    },
  ];
  let responseStatus = 400;

  let toInsertData = {
    id,
    posterPath: poster_path,
    title,
    userId,
  };

  try {
    await db.insert(shows).values(toInsertData).returning();
    response = [
      {
        message: `${title} has been saved successfully.`,
      },
    ];
    responseStatus = 201;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        response[0].message = `${title} has already been added.`;
      }
    }
  }
  return { data: response, status: responseStatus };
}

export const getPlayList = (id: number) => {
  return db.select().from(shows).where(eq(shows.id, id));
};
export const removeInPlayList = (id: number) => {
  return db.delete(shows).where(eq(shows.id, id));
};
