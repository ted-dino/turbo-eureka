"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { shimmer, toBase64 } from "@/lib/shimmer";
import { getBackdropImg } from "@/lib/utils";
import useUIState from "@/store/uiState";
import Image from "next/legacy/image";
import Buttons from "@/components/custom-ui/Buttons";
import { getSeriesById } from "@/queryFns/series";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export default function SeriesDialog() {
  const { showModal, setShowModal, item } = useUIState();
  const backdrop_path = process.env.NEXT_PUBLIC_BACKDROP_PATH as string;
  const { isFetching, data: series } = useQuery({
    queryKey: ["series-items", item.id],
    queryFn: () => getSeriesById(item.id),
    refetchOnWindowFocus: false,
    enabled: item.id !== 0,
  });

  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

  return (
    <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
      <DialogContent className="items-start bg-none">
        <DialogHeader>
          <DialogTitle className="mb-5 flex items-baseline">
            <span>{item.name}</span>
            {series && series.seasons && !isFetching ? (
              <small className="ml-5 text-xs">
                Total Series: {series.number_of_seasons}
              </small>
            ) : (
              <Skeleton className="ml-5 h-2 w-20" />
            )}
          </DialogTitle>
          <Image
            className="rounded"
            src={getBackdropImg(backdrop_path, item.backdrop_path)}
            alt={item.name}
            width={625}
            height={350}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(625, 350)
            )}`}
          />
          <DialogDescription className="pt-3">
            {item.overview}
          </DialogDescription>
          <ul className="pb-5 grid gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            {series ? (
              <>
                <li>Other name: {series.original_name}</li>
                <li>
                  Date aired: {date.format(new Date(series.first_air_date))} /{" "}
                  {series.last_air_date
                    ? date.format(new Date(series.last_air_date))
                    : "?"}
                </li>
                <li>Status: {series.status}</li>
                <li className="flex items-center gap-x-1">
                  Genre:
                  {series.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index < series.genres.length - 1 && ","}
                    </span>
                  ))}
                </li>
                <li>
                  {series.episode_run_time.length > 0 &&
                    `Duration: ${series.episode_run_time[0]} min`}
                </li>
              </>
            ) : (
              <>
                <Skeleton className="h-5 w-80" />
                <Skeleton className="h-5 w-80" />
                <Skeleton className="h-5 w-80" />
                <Skeleton className="h-5 w-80" />
                <Skeleton className="h-5 w-80" />
              </>
            )}
          </ul>
          <Buttons playLink="/porn" infoLink="/info-link" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
