import { getBackdropImg, normalizeURL } from "@/lib/utils";
import { Similar } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  similar: Similar;
}

export default function SimilarList({ similar }: Props) {
  return (
    <section className="lg:container lg:mx-auto mb-20 px-5 lg:px-0">
      <h2 className="mt-10 mb-5 text-xl lg:text-4xl">You may also like</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 place-items-center gap-8 md:gap-14">
        {similar.results.map((similar) => (
          <li key={similar.id} className="mb-5">
            <Link
              href={`/movies/info/${similar.id}/${normalizeURL(similar.title)}`}
              className="relative grid h-[150px] w-[150px] md:h-[330px] md:w-[217px]"
            >
              <Image
                src={getBackdropImg(similar.poster_path)}
                alt={similar.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="mb-5 object-cover rounded-md w-auto h-auto"
              />
              <span className="relative block mt-[100%] md:mt-[154%] text-sm leading-tight">
                {similar.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
