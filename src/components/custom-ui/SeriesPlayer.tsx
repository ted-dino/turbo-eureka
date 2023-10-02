"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import EpisodeList from "./EpisodeList";

interface Props {
  series_id: number;
}

export default function SeriesPlayer({ series_id }: Props) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sourceSearchParam = searchParams.get("source");
  const seasonSearchParam = searchParams.get("season");
  const episodeSearchParam = searchParams.get("episode");

  const streamUrls = [
    process.env.NEXT_PUBLIC_STREAM_URL_ONE,
    process.env.NEXT_PUBLIC_STREAM_URL_TWO,
    process.env.NEXT_PUBLIC_STREAM_URL_THREE,
    process.env.NEXT_PUBLIC_STREAM_URL_FOUR,
  ] as string[];

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-x-3">
        <div className="order-2 md:-order-1 ml-1 w-full md:w-72 bg-[#292929]/40">
          <EpisodeList series_id={series_id} />
        </div>
        <div className="relative w-full">
          {Number(sourceSearchParam) === 0 && (
            <iframe
              allowFullScreen
              id="series-iframe"
              src={`${streamUrls[0]}/tv/${series_id}/${seasonSearchParam}/${episodeSearchParam}`}
              className="w-full h-[calc(90vh-40px)]"
            />
          )}
          {Number(sourceSearchParam) === 1 && (
            <iframe
              allowFullScreen
              id="series-iframe"
              src={`${streamUrls[1]}/tv/tmdb/${series_id}-${seasonSearchParam}-${episodeSearchParam}`}
              className="w-full h-[calc(100vh-40px)]"
            />
          )}
          {Number(sourceSearchParam) === 2 && (
            <iframe
              allowFullScreen
              id="series-iframe"
              src={`${streamUrls[2]}=${series_id}&tmdb=1&s=${seasonSearchParam}&e=${episodeSearchParam}`}
              className="w-full h-[calc(100vh-40px)]"
            />
          )}
          {Number(sourceSearchParam) === 3 && (
            <iframe
              allowFullScreen
              id="series-iframe"
              src={`${streamUrls[3]}=${series_id}&season=${seasonSearchParam}&episode=${episodeSearchParam}`}
              className="w-full h-[calc(100vh-40px)]"
            />
          )}
        </div>
      </div>

      <div className="mx-auto my-10 p-14 w-3/4 bg-[#292929]/40">
        <h1 className="mb-3 text-center">
          If current server does not work please try other servers below.
        </h1>
        <ul className="flex items-center justify-center flex-wrap gap-2 md:gap-8 ">
          {streamUrls.map((url, index) => (
            <li
              className={`py-2 px-4 rounded-md ${
                sourceSearchParam === index.toString()
                  ? "bg-[#292929]/30"
                  : "bg-[#292929]"
              }`}
              key={index}
            >
              <Link
                href={`${pathName}?source=${index}&season=${seasonSearchParam}&episode=${episodeSearchParam}`}
              >
                Server {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
