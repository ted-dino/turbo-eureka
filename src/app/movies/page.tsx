import AuthContainer from "@/components/custom-ui/Common/AuthContainer";
import SlidersWrapper from "@/components/custom-ui/Common/Wrapper";
import FeaturedMovie from "@/components/custom-ui/Movies/FeaturedMovie";
import MovieDialog from "@/components/custom-ui/Movies/MovieDialog";
import { moviesEndpoints } from "@/data/endpoints";
import { Movie } from "@/types";
import type { Metadata } from "next";

type Propss = {
  searchParams: Record<string, string> | null | undefined;
};
export async function generateMetadata({
  searchParams,
}: Propss): Promise<Metadata> {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;
  const modal = searchParams && searchParams.selectedShow;
  const id = modal?.replace(/dHYgc2VyaWVz|bW92aWVz/g, "") || "";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const res = await fetch(
    `${TMBD_URL}/movie/${id}?language=en-US&page=1`,
    options,
  );
  const movie: Movie = await res.json();
  return {
    title: `TedFlix - ${
      searchParams && searchParams.selectedShow ? `${movie.title}` : "Movies"
    }`,
    description: movie.overview,
  };
}
type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Movies({ searchParams }: Props) {
  const modal = searchParams && searchParams.selectedShow;

  return (
    <main>
      <FeaturedMovie />
      <SlidersWrapper page="movies" options={moviesEndpoints.slice(0, 9)} />
      {modal !== undefined && <MovieDialog />}
      <AuthContainer searchParams={searchParams} />
    </main>
  );
}
