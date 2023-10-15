import AuthContainer from "@/components/custom-ui/Common/AuthContainer";
import SimilarList from "@/components/custom-ui/Common/SimilarList";
import { Button } from "@/components/ui/button";
import { shimmer, toBase64 } from "@/lib/shimmer";
import {
  formatDate,
  getBackdropImg,
  minsToHrs,
  normalizeURL,
} from "@/lib/utils";
import { Movie, Show, Videos } from "@/types";
import { Clapperboard, Play, Plus } from "lucide-react";
import { Metadata } from "next";
import { default as ImageLegacy } from "next/legacy/image";
import Link from "next/link";

type Props = {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
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
    title: `TedFlix - ${movie.title}`,
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

  const res = await fetch(
    `${TMBD_URL}/movie/${id}?language=en-US&page=1&append_to_response=similar,credits,videos`,
    options,
  );

  if (!res.ok) {
    throw new Error(`Error: ${res.text}`);
  }

  return res.json();
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: Record<string, string> | null | undefined;
}) {
  const { id } = params;
  const data: Show = await getData(Number(id));

  function renderTrailerLink(videos: Videos) {
    if (videos.results.length > 0) {
      const trailerVideo = videos.results.find(
        (video) => video.type === "Trailer",
      );
      const videoToUse = trailerVideo || videos.results[0];

      const videoSite =
        videoToUse.site === "YouTube"
          ? "www.youtube.com/watch?v="
          : "vimeo.com/";
      const videoUrl = `https://${videoSite}${videoToUse.key}`;

      return (
        <Link
          key={videoToUse.key}
          href={videoUrl}
          target="_blank"
          className="px-4 py-1 text-sm md:text-base text-black bg-white w-fit flex items-center gap-x-1 rounded-md"
        >
          <Clapperboard className="w-5 h-5" />
          <span>Trailer</span>
        </Link>
      );
    }
  }

  return (
    <main className="lg:container lg:mx-auto">
      <figure className="hidden lg:block rounded-md">
        <ImageLegacy
          src={getBackdropImg(data.backdrop_path)}
          alt={data.title}
          width={1400}
          height={720}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(1400, 720),
          )}`}
        />
      </figure>

      <section className="px-5 lg:px-0 py-10 grid lg:grid-cols-6 gap-5">
        <figure className="lg:hidden rounded-md">
          <ImageLegacy
            src={getBackdropImg(data.backdrop_path)}
            alt={data.name ? data.name : data.title}
            width={1400}
            height={720}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(1280, 720),
            )}`}
          />
        </figure>
        <figure className="hidden lg:block rounded-md w-auto h-auto">
          <ImageLegacy
            src={getBackdropImg(data.poster_path)}
            alt={data.title}
            width={180}
            height={266}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(180, 266),
            )}`}
          />
        </figure>
        <div className="lg:col-span-4 flex flex-col justify-between gap-y-2">
          <div className="grid gap-y-2">
            <h1 className="text-2xl lg:text-5xl">{data.title}</h1>
            {renderTrailerLink(data.videos)}
            <p className="text-sm md:text-base">{data.overview}</p>
          </div>
          <ul className="text-sm md:text-base">
            {data.release_date && (
              <li>
                <strong className="mr-1">Release Date:</strong>{" "}
                {formatDate(data.release_date, "long")}
              </li>
            )}
            <li className="flex">
              <strong className="mr-1">Genres:</strong>
              <ul className="flex gap-x-1">
                {data.genres.map((genre, index) => (
                  <li key={genre.id} className="hover:underline">
                    <Link href={`/genre/movie/${genre.id}?page=1`}>
                      {genre.name}
                      {index < data.genres.length - 1 && ","}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <strong className="mr-1">Casts:</strong>
              <ul className="inline">
                {data.credits.cast
                  .map((cast, index) => (
                    <li key={cast.id} className="inline">
                      {cast.name}
                      {index < 5 && ","}
                    </li>
                  ))
                  .slice(0, 6)}
              </ul>
            </li>
            <li>
              <strong className="mr-1">Duration:</strong>{" "}
              {minsToHrs(data.runtime)}
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-y-4 min-w-max">
          <Link
            href={`/movies/watch/${data.id}/${normalizeURL(
              data.title,
            )}?source=0`}
            className="py-2 bg-[#d82327] flex justify-center items-center gap-x-2 rounded-md"
          >
            <Play size={20} />
            <span className="text-lg">Watch</span>
          </Link>
          <Button className="bg-white text-black flex items-center gap-x-2 hover:bg-white">
            <Plus size={20} />
            <span className="text-lg">Add to My List</span>
          </Button>
        </div>
      </section>
      <SimilarList similar={data.similar} />
      <AuthContainer searchParams={searchParams} />
    </main>
  );
}
