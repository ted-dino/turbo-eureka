"use client";

import axiosEndpoint from "@/lib/axiosEndpoint";
import { getRandomMovie } from "@/queryFns/movie";
import { useQuery } from "@tanstack/react-query";
import { Info, Play } from "lucide-react";
import Image from "next/image";

export default function FeaturedMovie() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["random"],
    queryFn: getRandomMovie,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  console.log(data);
  return (
    <div className="relative w-full h-[900px]">
      <Image
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt={data.title}
        fill
        objectFit="cover"
      />
      <div className="absolute w-[50%] top-[50%] md:top-[70%] ml-4 md:ml-16">
        <h1 className="w-auto text-1xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl shadow-black">
          {data.title}
        </h1>
        <p className="my-5 drop-shadow-2xl shadow-black">{data.overview}</p>
        <div className="flex items-center gap-x-5">
          <button className="px-5 py-2 text-black bg-white flex items-center gap-x-3 rounded-sm">
            <Play absoluteStrokeWidth fill="black" color="black" />{" "}
            <span>Play</span>
          </button>
          <button className="px-5 py-2 flex items-center gap-x-3 rounded-sm bg-white/30">
            <Info absoluteStrokeWidth />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
