import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useQueries } from "@tanstack/react-query";
import { getSeasonById, getSeriesById } from "@/queryFns/series";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import Link from "next/link";
import { Play } from "lucide-react";
import Spinner from "./Spinner";
import { FormEvent } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  series_id: number;
}

export default function EpisodeList({ series_id }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sourceSearchParam = searchParams.get("source");
  const seasonSearchParam = searchParams.get("season");
  const episodeSearchParam = searchParams.get("episode");
  const [seasonData, episodeData] = useQueries({
    queries: [
      {
        queryKey: ["series", seasonSearchParam],
        queryFn: () => getSeriesById(series_id),
      },
      {
        queryKey: ["episode", seasonSearchParam],
        queryFn: () => getSeasonById(series_id, Number(seasonSearchParam)),
      },
    ],
  });

  const { data: seasonItem, isLoading: seasonLoading } = seasonData;
  const { data: episodes, isLoading: epsLoading } = episodeData;

  const handleSeasonChange = (season: string) => {
    const EPS_ONE = 1;
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(
      "season",
      season != undefined ? season : (seasonSearchParam as string),
    );
    current.set("episode", EPS_ONE.toString());
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathName}${query}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const inputObject = Object.fromEntries(formData);
    const { episode_number } = inputObject;
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("episode", episode_number.toString());
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathName}${query}`);
  };

  return (
    <ScrollArea className="h-full max-h-[827px] md:max-w-[250px]">
      <div className="relative flex flex-col">
        {(!seasonLoading || !epsLoading) && seasonItem && seasonItem.seasons ? (
          <>
            <div className="flex gap-x-2 p-2 border-b">
              <Select
                onValueChange={(value) => handleSeasonChange(value)}
                defaultValue={`${Number(seasonSearchParam)}`}
              >
                <SelectTrigger className="w-full max-w-[108px] h-8 text-ellipsis overflow-hidden whitespace-nowrap">
                  <SelectValue
                    className="text-xs"
                    placeholder={`${seasonItem.seasons[0].name}`}
                  />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {seasonItem.seasons.map((season) => (
                    <SelectItem
                      className="text-xs"
                      key={season.id}
                      value={`${season.season_number}`}
                    >
                      {season.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Input
                  type="number"
                  name="episode_number"
                  placeholder="Eps number"
                  className="text-xs h-8 max-w-[108px]"
                  max={episodes?.episodes.length}
                  min={1}
                  defaultValue={undefined}
                />
              </form>
            </div>
            <ul className="flex flex-col gap-y-3 p-2 h-full">
              {episodes &&
                episodes.episodes.map((episode, index) => (
                  <li
                    key={episode.id}
                    className={`${
                      Number(episodeSearchParam) === index + 1
                        ? "bg-[#d82327]"
                        : "bg-[#292929]/40"
                    } py-2 px-3 rounded`}
                  >
                    <Link
                      className="flex items-center gap-x-2"
                      href={`${pathName}?source=${sourceSearchParam}&season=${seasonSearchParam}&episode=${
                        index + 1
                      }`}
                    >
                      <span>{index + 1}</span>
                      <span className="max-w-[165px] text-ellipsis overflow-hidden whitespace-nowrap">
                        {episode.name}
                      </span>
                      {Number(episodeSearchParam) === index + 1 && (
                        <Play className="ml-auto" size="18" />
                      )}
                    </Link>
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </ScrollArea>
  );
}
