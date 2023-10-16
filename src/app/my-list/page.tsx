import GenreItem from "@/components/custom-ui/Common/GenreItem";
import { verifySession } from "@/lib/session";
import { normalizeURL } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

async function getData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const cookie = cookies().get("tedflix.session-token")?.value;
  const userId = await verifySession(cookie as string);

  if (!userId) {
    redirect("/");
  }

  const res = await fetch(`${API_URL}/api/playlist/getAll/?id=${userId}`);

  if (!res.ok) {
    return NextResponse.json({
      message: "Something went wrong. Please contact the developer.",
    });
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();
  const { response } = data;

  return (
    <main className="mt-[85px] lg:container mx-auto min-h-screen">
      <h1 className="text-xl lg:text-4xl capitalize font-bold">My List</h1>
      <ul className="mt-5 px-4 md:px-0 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-start gap-6 lg:gap-9">
        {response &&
          response.length > 0 &&
          response.map((item: any) => (
            <li key={item.id} className="relative">
              <GenreItem
                link={`${
                  item.mediaType === "movies"
                    ? `/movies/info/${item.id}/${normalizeURL(item.title)}`
                    : `/tv-series/info/${item.id}/${normalizeURL(
                        item.title,
                      )}?source=0&season=1&episode=1`
                }`}
                path={item.backdropPath}
                title={item.title}
              />
            </li>
          ))}
      </ul>
    </main>
  );
}
