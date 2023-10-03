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
import { Skeleton } from "../../ui/skeleton";
import Link from "next/link";
import { normalizeURL } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface Props {
  seasonName: string;
  seasonIds: number;
  seriesId: number;
  seasonArray: SeasonElement[];
}

export const SeasonList = ({
  seasonName,
  seasonIds,
  seriesId,
  seasonArray,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const seasonSearchParam = searchParams.get("season");
  const { data: seasons } = useQuery({
    queryKey: ["seasons-list", seasonSearchParam],
    queryFn: () => getSeasonById(seriesId, Number(seasonSearchParam)),
    refetchOnWindowFocus: false,
  });

  console.log(seasonSearchParam);

  const handleSeasonChange = (season: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("season", season);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return (
    <>
      <Select
        defaultValue={`${seasonSearchParam}`}
        onValueChange={(value) => handleSeasonChange(value)}
      >
        <SelectTrigger className="w-max">
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
              >
                <Link
                  href={`/tv-series/watch/${seasonIds}/${normalizeURL(
                    seasonName,
                  )}?source=0&season=${seasonSearchParam}&episode=${
                    season.episode_number
                  }`}
                  className="flex items-center gap-x-2 "
                >
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
