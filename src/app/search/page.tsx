import GenreItem from "@/components/custom-ui/Common/GenreItem";
import { normalizeURL } from "@/lib/utils";
import { Movie, Result } from "@/types";
import { Metadata } from "next";

type Propss = {
  searchParams: Record<string, string> | null | undefined;
};
export async function generateMetadata({
  searchParams,
}: Propss): Promise<Metadata> {
  const query = searchParams && searchParams.query;

  return {
    title: `TedFlix - Search results for ${query}`,
  };
}

async function getData(query: string): Promise<[Movie[], Movie[]]> {
  try {
    const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
    const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    const movieResponse = await fetch(
      `${TMBD_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options,
    );

    const seriesResponse = await fetch(
      `${TMBD_URL}/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
      options,
    );

    const [movieData, seriesData] = await Promise.all([
      movieResponse.json() as Promise<Result>,
      seriesResponse.json() as Promise<Result>,
    ]);

    return [movieData.results, seriesData.results];
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.message);
      throw error;
    }
    console.log("Unexpected Error: ", error);
    throw error;
  }
}

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Page({ searchParams }: Props) {
  const query = searchParams && searchParams.query;
  let data: [Movie[], Movie[]] = [[], []];
  if (query) {
    data = await getData(query);
  }
  const [movie, series] = data;

  return (
    <main className="mt-[85px] lg:container mx-auto min-h-screen">
      <h1 className="mb-5 text-xl lg:text-4xl capitalize font-bold">
        {movie.length > 0 || series.length > 0
          ? `Search result for ${query}`
          : `No result for ${query}`}
      </h1>
      <ul className="px-4 md:px-0 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-start gap-6 lg:gap-9">
        <>
          {movie &&
            movie.map((item) => (
              <li key={item.id} className="flex flex-col">
                <GenreItem
                  link={`/movies/info/${item.id}/${normalizeURL(item.title)}`}
                  path={item.backdrop_path}
                  title={item.name ? item.name : item.title}
                />
              </li>
            ))}

          {series &&
            series.map((item) => (
              <li key={item.id} className="flex flex-col">
                <GenreItem
                  link={`/tv-series/info/${item.id}/${normalizeURL(
                    item.name!,
                  )}`}
                  path={item.backdrop_path}
                  title={item.name ? item.name : item.title}
                />
              </li>
            ))}
        </>
      </ul>
    </main>
  );
}
