import { normalizeURL } from "@/lib/utils";
import { Movie, Similar } from "@/types";
import SimilarItem from "./SimilarItem";

interface Props {
  similar: Similar;
  route?: string;
}

async function getData() {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const res = await fetch(
    `${TMBD_URL}/movie/now_playing?language=en-US&page=1`,
    options,
  );

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }

  return res.json();
}

export default async function SimilarList({
  similar,
  route = "movies",
}: Props) {
  const suggestionArray = await getData();

  return (
    <section className="lg:container lg:mx-auto mb-20 px-5 lg:px-0">
      <h2 className="mt-10 mb-5 text-xl lg:text-4xl">You may also like</h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 place-items-center gap-8 md:gap-14">
        {similar.results.length > 0
          ? similar.results.map((similar) => (
              <li key={similar.id} className="mb-5">
                <SimilarItem
                  link={`/${route ? route : "tv-series"}/info/${
                    similar.id
                  }/${normalizeURL(
                    similar.title ? similar.title : similar.name!,
                  )}${route === "tv-series" ? "?season=1" : ""}`}
                  path={similar.poster_path}
                  title={similar.title ? similar.title : similar.name!}
                />
              </li>
            ))
          : suggestionArray &&
            suggestionArray.results.map((suggestion: Movie) => (
              <li key={suggestion.id} className="relative mb-5">
                <SimilarItem
                  link={`/movies/info/${suggestion.id}/${normalizeURL(
                    suggestion.title,
                  )}&source=0`}
                  path={suggestion.poster_path}
                  title={suggestion.title}
                />
              </li>
            ))}
      </ul>
    </section>
  );
}
