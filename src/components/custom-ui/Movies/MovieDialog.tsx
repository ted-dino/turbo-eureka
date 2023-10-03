"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { shimmer, toBase64 } from "@/lib/shimmer";
import { getBackdropImg, minsToHrs, normalizeURL } from "@/lib/utils";
import Image from "next/legacy/image";
import Buttons from "../Buttons";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/queryFns/movie";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedShow = searchParams.get("selectedShow");
  const id = selectedShow?.replace(/dHYgc2VyaWVz|bW92aWVz/g, "") || "";

  const { data: item } = useQuery({
    queryKey: ["selected-movie", id],
    queryFn: () => getMovieById(Number(id)),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {item && (
        <Dialog open={id ? true : false} onOpenChange={() => router.back()}>
          <DialogContent className="bg-none">
            <DialogHeader>
              <DialogTitle className="mb-5">
                {item.name ? item.name : item.title}
              </DialogTitle>
              <Image
                className="rounded"
                src={getBackdropImg(item.backdrop_path)}
                alt={item.name ? item.name : item.title}
                width={625}
                height={350}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(625, 350),
                )}`}
              />
              <DialogDescription className="pt-3 pb-4">
                {item.overview}
              </DialogDescription>
              <ul>
                <ul className="pb-5 grid gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                  {item ? (
                    <>
                      <li className="flex">
                        <strong className="mr-1 text-white">Genres:</strong>
                        <ul className="flex gap-x-1">
                          {item.genres.map((genre, index) => (
                            <li key={genre.id}>
                              {genre.name}
                              {index < item.genres.length - 1 && ","}
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <strong className="mr-1 text-white">Casts:</strong>
                        <ul className="inline">
                          {item.credits.cast
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
                        <strong className="mr-1 text-white">Duration:</strong>
                        {minsToHrs(item.runtime)}
                      </li>
                    </>
                  ) : (
                    <>
                      <Skeleton className="h-5 w-80" />
                      <Skeleton className="h-5 w-80" />
                      <Skeleton className="h-5 w-80" />
                    </>
                  )}
                </ul>
              </ul>
              <Buttons
                playLink={`${pathname}movies/watch/${item.id}/${normalizeURL(
                  item.title,
                )}?source=0`}
                infoLink="/info-link"
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
