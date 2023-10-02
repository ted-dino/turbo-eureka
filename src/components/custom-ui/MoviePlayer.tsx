"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Props {
  video_id: number;
}

export default function VideoPlayer({ video_id }: Props) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sourceSearchParam = searchParams.get("source");

  const streamUrls = [
    process.env.NEXT_PUBLIC_STREAM_URL_ONE,
    process.env.NEXT_PUBLIC_STREAM_URL_TWO,
    process.env.NEXT_PUBLIC_STREAM_URL_THREE,
    process.env.NEXT_PUBLIC_STREAM_URL_FOUR,
  ] as string[];

  return (
    <section>
      {Number(sourceSearchParam) === 0 && (
        <iframe
          allowFullScreen
          id="series-iframe"
          src={`${streamUrls[0]}/movie/${video_id}`}
          className="w-full h-[calc(100vh-40px)]"
        />
      )}
      {Number(sourceSearchParam) === 1 && (
        <iframe
          allowFullScreen
          id="series-iframe"
          src={`${streamUrls[1]}/movie/tmdb/${video_id}`}
          className="w-full h-[calc(100vh-40px)]"
        />
      )}
      {Number(sourceSearchParam) === 2 && (
        <iframe
          allowFullScreen
          id="series-iframe"
          src={`${streamUrls[2]}=${video_id}&tmdb=1`}
          className="w-full h-[calc(100vh-40px)]"
        />
      )}
      {Number(sourceSearchParam) === 3 && (
        <iframe
          allowFullScreen
          id="series-iframe"
          src={`${streamUrls[3]}=${video_id}`}
          className="w-full h-[calc(100vh-40px)]"
        />
      )}

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
              <Link href={`${pathName}?source=${index}`}>
                Server {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
