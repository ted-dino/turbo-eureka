import { Info, Play } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../../ui/skeleton";
import { getBackdropImg, normalizeURL } from "@/lib/utils";
import Link from "next/link";
import { Result } from "@/types";
import { notFound } from "next/navigation";

async function getFeaturedMovie() {
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
    `${TMBD_URL}/movie/top_rated?language=en-US&page=1`,
    options,
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export default async function FeaturedMovie() {
  const data: Result = await getFeaturedMovie();

  const { id, backdrop_path, title, overview } = data.results[0];

  return (
    <div className="px-4 pb-4 lg:space-y-10 lg:px-16 flex flex-col justify-center items-center md:items-start space-y-2 py-16 md:space-y-4 h-[30vh] md:h-[50vh] lg:h-[65vh] lg:justify-end lg:pb-12">
      {!data ? (
        <div className="h-full w-full flex items-center space-x-4 lg:h-[65vh]">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <>
          {data && data.results.length > 0 && (
            <>
              <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen hidden lg:block">
                <Image
                  src={getBackdropImg(backdrop_path)}
                  alt={title}
                  fill
                  className="object-cover"
                  priority={true}
                />
              </div>
              <h1 className="text-2xl w-full max-w-4xl font-bold md:text-4xl lg:text-7xl">
                {title}
              </h1>
              <p className="movie-description max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                {overview}
              </p>
              <div className="flex space-x-3">
                <Link
                  className="px-5 py-2 text-black bg-white flex items-center gap-x-3 rounded-sm"
                  href={`/movies/watch/${id}/${normalizeURL(title)}?source=0`}
                >
                  <Play absoluteStrokeWidth fill="black" color="black" />
                  <span>Play</span>
                </Link>
                <Link
                  className="px-5 py-2 flex items-center gap-x-3 rounded-sm bg-white/30"
                  href={`/movies/info/${id}/${normalizeURL(title)}`}
                >
                  <Info absoluteStrokeWidth />
                  <span>More Info</span>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
