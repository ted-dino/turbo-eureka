import { Metadata } from "next";
import { Movie, Similar } from "@/types";
import VideoPlayer from "@/components/custom-ui/VideoPlayer";
import SimilarList from "@/components/custom-ui/SimilarList";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;
  const id = params.slug[0];

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

export default async function Watch({
  params,
}: {
  params: { slug: string[] };
}) {
  const [id, _] = params.slug;
  const similarMovies: Similar = await getData(Number(id));

  return (
    <main className="pt-16">
      <VideoPlayer video_id={Number(id)} />
      <SimilarList similar={similarMovies} />
    </main>
  );
}
