import { SeasonList } from "@/components/custom-ui/TVSeries/SeasonList";
import { Button } from "@/components/ui/button";
import { shimmer, toBase64 } from "@/lib/shimmer";
import { formatDate, getBackdropImg, normalizeURL } from "@/lib/utils";
import { Series, SeriesList, Videos } from "@/types";
import { Clapperboard, Play, Plus } from "lucide-react";
import { default as NextImage } from "next/image";
import { default as ImageLegacy } from "next/legacy/image";
import Link from "next/link";
import { Metadata } from "next";
import SimilarList from "@/components/custom-ui/Common/SimilarList";
import AuthContainer from "@/components/custom-ui/Common/AuthContainer";
import AddToListButton from "@/components/custom-ui/Common/AddToListButton";

type Props = {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;
  const { id } = params;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const res = await fetch(
    `${TMBD_URL}/tv/${id}?language=en-US&page=1`,
    options,
  );

  const series: Series = await res.json();
  return {
    title: `TedFlix - ${series.name}`,
    description: series.overview,
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
    `${TMBD_URL}/tv/${id}?language=en-US&page=1&append_to_response=similar,credits,videos`,
    options,
  );

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
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
  const data: SeriesList = await getData(Number(id));
  const showLogin = searchParams && searchParams.showLogin;

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
      <section>
        {data && (
          <>
            <ImageLegacy
              src={getBackdropImg(data.backdrop_path)}
              alt={data.name}
              width={1400}
              height={720}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(1400, 720),
              )}`}
              className="hidden lg:block rounded-md"
            />
          </>
        )}
        <div className="px-5 lg:px-0 py-10 grid lg:grid-cols-6 gap-5">
          <NextImage
            src={getBackdropImg(data.backdrop_path)}
            alt={data.name}
            width={1400}
            height={720}
            className="lg:hidden rounded-md"
          />
          <NextImage
            src={getBackdropImg(data.poster_path)}
            alt={data.name}
            width={180}
            height={266}
            className="hidden lg:block rounded-md w-auto h-auto"
          />
          <div className="lg:col-span-4 flex flex-col justify-between gap-y-2">
            <div className="grid gap-y-2">
              <h1 className="text-2xl lg:text-5xl">{data.name}</h1>
              {renderTrailerLink(data.videos)}
              <p className="text-sm md:text-base">{data.overview}</p>
            </div>
            <ul className="text-sm md:text-base">
              {data.first_air_date && (
                <li>
                  <span className="font-bold mr-1">Release Date:</span>{" "}
                  {formatDate(data.first_air_date, "long")}
                </li>
              )}
              <li className="flex">
                <span className="font-bold mr-1">Genres:</span>
                <ul className="flex gap-x-1">
                  {data.genres.map((genre, index) => (
                    <li key={genre.id} className="hover:underline">
                      <Link href={`/genre/tv/${genre.id}?page=1`}>
                        {genre.name}
                        {index < data.genres.length - 1 && ","}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <span className="font-bold mr-1">Casts:</span>
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
                <span className="font-bold mr-1">Seasons:</span>
                <span>{data.number_of_seasons}</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-4 min-w-max">
            <Link
              href={`/tv-series/watch/${data.id}/${normalizeURL(
                data.name,
              )}?source=0&season=${data.seasons[0].season_number}&episode=1`}
              className="py-2 bg-[#d82327] flex justify-center items-center gap-x-2 rounded-md"
            >
              <Play size={20} />
              <span className="text-lg">Watch</span>
            </Link>
            <AddToListButton
              mediaType="tv-series"
              itemToSave={data}
              type="info"
            />
          </div>
        </div>
      </section>
      <section className="mx-5 lg:mx-0 p-10 rounded-md bg-[#292929]/40 max-h-96 overflow-y-scroll">
        <SeasonList
          seasonName={data.name}
          seasonIds={data.id}
          seriesId={data.id}
          seasonArray={data.seasons}
        />
      </section>
      <SimilarList similar={data.similar} route="tv-series" />
      <AuthContainer searchParams={searchParams} />
    </main>
  );
}
