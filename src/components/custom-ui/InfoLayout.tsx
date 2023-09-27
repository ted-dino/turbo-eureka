import { shimmer, toBase64 } from "@/lib/shimmer";
import { getBackdropImg, normalizeURL } from "@/lib/utils";
import { Show, Videos } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard, Play, Plus, Video } from "lucide-react";

interface Props {
  id: number;
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
    options
  );

  if (!res.ok) {
    throw new Error(`Error: ${res.text}`);
  }

  return res.json();
}
export const InfoLayout = async ({ id }: Props) => {
  const backdrop_path = process.env.NEXT_PUBLIC_BACKDROP_PATH as string;
  const data: Show = await getData(id);

  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

  function minsToHrs(minutes: number) {
    if (typeof minutes !== "number" || minutes < 0) {
      return "Invalid input";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
    } else if (remainingMinutes === 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    } else {
      return `${hours} hour${
        hours !== 1 ? "s" : ""
      } and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
    }
  }

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
    <section className="lg:container lg:mx-auto">
      {data && (
        <>
          <Image
            src={getBackdropImg(data.backdrop_path)}
            alt={data.name ? data.name : data.title}
            width={1400}
            height={720}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(1280, 720)
            )}`}
            className="hidden lg:block rounded-md"
          />
          <div className="px-5 lg:px-0 py-10 grid lg:grid-cols-6 gap-5">
            <Image
              src={getBackdropImg(data.backdrop_path)}
              alt={data.name ? data.name : data.title}
              width={1400}
              height={720}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(1280, 720)
              )}`}
              className="lg:hidden rounded-md"
            />
            <Image
              src={getBackdropImg(data.poster_path)}
              alt={data.name ? data.name : data.title}
              width={180}
              height={266}
              className="hidden lg:block rounded-md w-auto h-auto"
            />
            <div className="lg:col-span-4 flex flex-col justify-between gap-y-2">
              <div className="grid gap-y-2">
                <h1 className="text-2xl lg:text-5xl">
                  {data.name ? data.name : data.title}
                </h1>
                {renderTrailerLink(data.videos)}
                <p className="text-sm md:text-base">{data.overview}</p>
              </div>
              <ul className="text-sm md:text-base">
                <li>
                  <span className="font-bold mr-1">Release Date:</span>{" "}
                  {date.format(new Date(data.release_date))}
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
                  <span className="font-bold mr-1">Duration:</span>{" "}
                  {minsToHrs(data.runtime)}
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
          <div className="mb-20 px-5 lg:px-0">
            <h2 className="mt-10 mb-5 text-xl lg:text-4xl">
              You may also like
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 place-items-center gap-8 md:gap-14">
              {data.similar.results.map((similar) => (
                <li key={similar.id} className="mb-5">
                  <Link
                    href={`/movies/info/${similar.id}/${normalizeURL(
                      similar.title
                    )}`}
                    className="relative grid h-[150px] w-[150px] md:h-[330px] md:w-[217px]"
                  >
                    <Image
                      src={getBackdropImg(similar.poster_path)}
                      alt={similar.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="mb-5 object-cover rounded-md w-auto h-auto"
                    />
                    <span className="relative block mt-[100%] md:mt-[154%] text-sm leading-tight">
                      {similar.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
};
