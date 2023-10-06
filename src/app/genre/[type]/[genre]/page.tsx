import { normalizeURL } from "@/lib/utils";
import { Result } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { moviesEndpoints, seriesEndpoints } from "@/data/endpoints";
import GenreItem from "@/components/custom-ui/Common/GenreItem";

async function getData(type: string, genre: string | number, page?: string) {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const getUrl = (genre: string | number, type: string) => {
    const genreId = Number(genre);

    if (!isNaN(genreId)) {
      return `discover/${type}?language=en-US&with_genres=${genreId}`;
    } else {
      return `${type}/${genre}?language=en-US`;
    }
  };

  const res = await fetch(
    `${TMBD_URL}/${getUrl(genre, type)}&page=${page ? page : "1"}`,
    options,
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

type Endpoints = {
  type: string;
  params: string;
  title: string;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { type: string; genre: string | number; page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { type, genre } = params;

  const page = typeof searchParams.page === "string" ? searchParams.page : "1";

  let data: Result = await getData(type, genre, page);

  const formatTitle = (type: string, genres: string | number) => {
    const genreId = Number(genres);

    const findMatchingEndpoint = (endpoints: Endpoints[], genreId: number) => {
      return endpoints.find((endpoint) => endpoint.params === String(genreId));
    };

    if (type === "movie") {
      if (!isNaN(genreId)) {
        const matchingMovie = findMatchingEndpoint(moviesEndpoints, genreId);
        return matchingMovie
          ? `${matchingMovie.title} Movies`
          : "https://rb.gy/ilun8";
      } else {
        return genre === "top_rated" ? "Top Rated Movies" : "Popular Movies";
      }
    } else {
      if (!isNaN(genreId)) {
        const matchingSeries = findMatchingEndpoint(seriesEndpoints, genreId);
        return matchingSeries
          ? `${matchingSeries.title} Series`
          : "https://rb.gy/ilun8";
      } else {
        return genre === "popular" ? "Popular Series" : "Top Rated Series";
      }
    }
  };

  return (
    <main className="mt-[85px] lg:container mx-auto min-h-screen">
      <section>
        <div className="mb-5 flex items-center justify-between pb-3 gap-x-3">
          <h1 className="text-xl lg:text-4xl capitalize font-bold">
            {`${formatTitle(type, genre.toString())}`}
          </h1>
          <div className="flex gap-x-3">
            {data && data.results.length > 0 && (
              <>
                <Link
                  href={{
                    pathname: `/genre/${type}/${genre}`,
                    query: {
                      page: Number(page) > 1 ? Number(page) - 1 : 1,
                    },
                  }}
                  className={`w-20 rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800 text-center ${
                    Number(page) <= 1 && "pointer-events-none opacity-50"
                  }`}
                >
                  Previous
                </Link>
                <Link
                  href={{
                    pathname: `/genre/${type}/${genre}`,
                    query: {
                      page: Number(page) + 1,
                    },
                  }}
                  className="w-20 rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800 text-center"
                >
                  Next
                </Link>
              </>
            )}
          </div>
        </div>
        <ul className="px-4 md:px-0 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6 lg:gap-9">
          {data &&
            data.results &&
            data.results.map((item) => (
              <li key={item.id} className="relative">
                <GenreItem
                  link={`${
                    type === "movie"
                      ? `/movies/info/${item.id}/${normalizeURL(item.title)}`
                      : `/tv-series/info/${item.id}/${normalizeURL(
                          item.name!,
                        )}?source=0&season=1&episode=1`
                  }`}
                  path={item.backdrop_path}
                  title={item.name ? item.name : item.title}
                />
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
