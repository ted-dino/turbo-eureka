"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSeasonById } from "@/queryFns/series";
import { SeasonElement } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface Props {
  seriesId: number;
  seasonArray: SeasonElement[];
}

export const SeasonList = ({ seriesId, seasonArray }: Props) => {
  const [episodeId, setEpisodeId] = useState(seasonArray[0].season_number);
  const { data: seasons } = useQuery({
    queryKey: ["episode", episodeId],
    queryFn: () => getSeasonById(seriesId, episodeId),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Select onValueChange={(value) => setEpisodeId(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`${seasonArray[0].name}`} />
        </SelectTrigger>
        <SelectContent>
          {seasonArray.map((season) => (
            <SelectItem key={season.id} value={`${season.season_number}`}>
              {season.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ul className="my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-3 gap-x-4">
        {seasons && seasons.episodes.length > 0 ? (
          <>
            {seasons?.episodes.map((season) => (
              <li
                className="py-2 px-4 bg-[#292929] rounded-md cursor-pointer"
                key={season.id}
                onClick={() => console.log(season.episode_number)}
              >
                <Link href="#" className="flex items-center gap-x-2 ">
                  <div className="w-5">
                    <Play size={20} />
                  </div>
                  <span className="flex-grow max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">
                    {season.name}
                  </span>
                </Link>
              </li>
            ))}
          </>
        ) : (
          <Skeleton className="w-[200px] h-5" />
        )}
      </ul>
    </>
  );
};
