import { Metadata } from "next";
import { Movie, Similar } from "@/types";
import MoviePlayer from "@/components/custom-ui/MoviePlayer";
import SimilarList from "@/components/custom-ui/SimilarList";

type Props = {
  params: { id: number };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;
  const id = params.id;

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
    title: `Now Playing - ${movie.title}`,
    description: movie.overview,
  };
}

async function getData(id: number) {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const res = await fetch(`${TMBD_URL}/movie/${id}/similar`, options);

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}

export default async function Watch({ params }: { params: { id: number } }) {
  const { id } = params;
  const similarMovies: Similar = await getData(id);

  return (
    <main className="pt-16">
      <MoviePlayer video_id={id} />
      <SimilarList similar={similarMovies} />
    </main>
  );
}
