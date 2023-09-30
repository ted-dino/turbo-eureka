import { SeasonList } from "@/components/custom-ui/SeasonList";
import { Button } from "@/components/ui/button";
import { shimmer, toBase64 } from "@/lib/shimmer";
import { getBackdropImg, normalizeURL } from "@/lib/utils";
import { SeriesList, Videos } from "@/types";
import { Clapperboard, Play, Plus } from "lucide-react";
import { default as NextImage } from "next/image";
import { default as ImageLegacy } from "next/legacy/image";
import Link from "next/link";

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
    options
  );

  if (!res.ok) {
    throw new Error(`Error: ${res.text}`);
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: number } }) {
  const data: SeriesList = await getData(params.id);

  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

  function renderTrailerLink(videos: Videos) {
    if (videos.results.length > 0) {
      const trailerVideo = videos.results.find(
        (video) => video.type === "Trailer"
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
                shimmer(1400, 720)
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
              <li>
                <span className="font-bold mr-1">Release Date:</span>{" "}
                {date.format(new Date(data.first_air_date))}
              </li>
              <li className="flex">
                <span className="font-bold mr-1">Genres:</span>
                <ul className="flex gap-x-1">
                  {data.genres.map((genre, index) => (
                    <li key={genre.id}>
                      {genre.name}
                      {index < data.genres.length - 1 && ","}
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
              href="/"
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
        </div>
      </section>
      <section className="mx-5 lg:mx-0 p-10 rounded-md bg-[#292929]/40 max-h-96 overflow-y-scroll">
        <SeasonList seriesId={data.id} seasonArray={data.seasons} />
      </section>
      <section className="mb-20 px-5 lg:px-0">
        <h2 className="mt-10 mb-5 text-xl lg:text-4xl">You may also like</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 place-items-center gap-8 md:gap-14">
          {data.similar.results.map((similar) => (
            <li key={similar.id} className="mb-5">
              <Link
                href={`/tv-series/info/${similar.id}/${normalizeURL(
                  similar.name!
                )}`}
                className="relative grid h-[150px] w-[150px] md:h-[330px] md:w-[217px]"
              >
                <NextImage
                  src={getBackdropImg(similar.poster_path)}
                  alt={similar.name!}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="mb-5 object-cover rounded-md w-auto h-auto"
                />
                <span className="relative block mt-[100%] md:mt-[154%] text-sm leading-tight">
                  {similar.name!}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
