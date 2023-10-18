"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { shimmer, toBase64 } from "@/lib/shimmer";
import {
  closeModal,
  formatDate,
  getBackdropImg,
  minsToHrs,
  normalizeURL,
} from "@/lib/utils";
import Image from "next/legacy/image";
import { getSeriesById } from "@/queryFns/series";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../../ui/skeleton";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import AddToListButton from "../Common/AddToListButton";
import Link from "next/link";
import { Play } from "lucide-react";

export default function SeriesDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedShow = searchParams.get("selectedShow");
  const id = selectedShow?.replace(/dHYgc2VyaWVz|bW92aWVz/g, "") || "";
  const { isFetching, data: series } = useQuery({
    queryKey: ["series-items"],
    queryFn: () => getSeriesById(Number(id)),
    refetchOnWindowFocus: false,
  });

  const { name, backdrop_path, overview } = series || {};

  return (
    <>
      {series && !isFetching && (
        <Dialog open={id ? true : false}>
          <DialogContent
            className="items-start bg-none"
            onInteractOutside={() => {
              const url = closeModal(pathname, searchParams);
              router.push(url, { scroll: false });
            }}
          >
            <DialogHeader>
              <DialogTitle className="mb-5 flex items-baseline">
                <span>{name}</span>
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
                src={getBackdropImg(backdrop_path as string)}
                alt={name}
                width={625}
                height={350}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(625, 350),
                )}`}
              />
              <DialogDescription className="pt-3">{overview}</DialogDescription>
              <ul className="pb-5 grid gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                {series ? (
                  <>
                    <li>
                      <strong className="mr-1 text-white">Other name:</strong>{" "}
                      {series.original_name}
                    </li>
                    <li>
                      <strong className="mr-1 text-white">Date aired:</strong>
                      {formatDate(series.first_air_date, "long")} /{" "}
                      {series.last_air_date
                        ? formatDate(series.last_air_date, "long")
                        : "?"}
                    </li>
                    <li>
                      <strong className="mr-1 text-white">Status:</strong>
                      {series.status}
                    </li>
                    <li className="flex items-center gap-x-1">
                      <strong className="mr-1 text-white">Genre:</strong>
                      {series.genres.map((genre, index) => (
                        <span key={genre.id} className="hover:underline">
                          <Link href={`/genre/movie/${genre.id}?page=1`}>
                            {genre.name}
                            {index < series.genres.length - 1 && ","}
                          </Link>
                        </span>
                      ))}
                    </li>
                    <li>
                      {series.episode_run_time.length > 0 && (
                        <>
                          <strong className="mr-1 text-white">Duration:</strong>
                          {`${minsToHrs(series.episode_run_time[0])}`}
                        </>
                      )}
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
              <div className="flex items-center space-x-3">
                <Link
                  className="px-5 py-2 text-black bg-white flex items-center gap-x-3 rounded-sm"
                  href={`/tv-series/watch/${id}/${normalizeURL(
                    name as string,
                  )}?source=0&season=${series?.seasons[0]
                    .season_number}&episode=1`}
                >
                  <Play absoluteStrokeWidth fill="black" color="black" />
                  <span>Play</span>
                </Link>
                <AddToListButton
                  mediaType="tv-series"
                  type="dialog"
                  itemToSave={series}
                />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
