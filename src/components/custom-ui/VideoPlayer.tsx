"use client";

import { useState } from "react";
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
  const [source, setSource] = useState(
    `${streamUrls[0]}/movie?tmdb=${video_id}`,
  );

  const getSource = (index: number) => {
    let newSource = "";

    switch (index) {
      case 1:
        newSource = `${streamUrls[1]}/movie/tmdb/${video_id}`;
        break;
      case 2:
        newSource = `${streamUrls[2]}?video_id=${video_id}&tmdb=1`;
        break;
      case 3:
        newSource = `${streamUrls[3]}?tmdb=${video_id}`;
        break;
      default:
        newSource = `${streamUrls[0]}/movie?tmdb=${video_id}`;
        break;
    }

    setSource(newSource);
  };

  return (
    <section>
      <iframe
        allowFullScreen
        id="watch-iframe"
        src={source}
        className="w-full h-[calc(95vh-40px)]"
      />

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
                <button
                  onClick={() => {
                    getSource(index);
                  }}
                >
                  Server {index + 1}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
