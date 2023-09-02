"use client";

import { getRandomMovie } from "@/queryFns/movie";
import { useQuery } from "@tanstack/react-query";
import { Info, Play } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { getBackdropImg } from "@/lib/utils";
import Buttons from "./Buttons";
import Link from "next/link";

export default function FeaturedMovie() {
  const backdrop_path = process.env.NEXT_PUBLIC_BACKDROP_PATH as string;
  const { isFetching, data } = useQuery({
    queryKey: ["featured-movie"],
    queryFn: getRandomMovie,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="px-4 pb-4 lg:space-y-10 lg:px-16 flex flex-col justify-center items-center md:items-start space-y-2 py-16 md:space-y-4 h-[30vh] md:h-[50vh] lg:h-[65vh] lg:justify-end lg:pb-12">
      {isFetching ? (
        <div className="h-full w-full flex items-center space-x-4 lg:h-[65vh]">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <>
          <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen hidden lg:block">
            <Image
              src={getBackdropImg(backdrop_path, data.backdrop_path)}
              alt={data.title}
              fill
              className="object-cover"
              priority={true}
            />
          </div>

          <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
            {data.title}
          </h1>
          <p className="movie-description max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
            {data.overview}
          </p>
          <div className="flex space-x-3">
            <Link
              className="px-5 py-2 text-black bg-white flex items-center gap-x-3 rounded-sm"
              href={`/`}
            >
              <Play absoluteStrokeWidth fill="black" color="black" />
              <span>Play</span>
            </Link>
            <Link
              className="px-5 py-2 flex items-center gap-x-3 rounded-sm bg-white/30"
              href={`/`}
            >
              <Info absoluteStrokeWidth />
              <span>More Info</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
