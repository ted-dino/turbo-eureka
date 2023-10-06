"use client";

import Image from "next/image";
import { getBackdropImg } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spinner from "./Spinner";
interface Props {
  link: string;
  path: string;
  title: string;
}

export default function SimilarItem({ link, path, title }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const setTransition = () => {
    startTransition(() => {
      router.push(`${link}`);
    });
  };

  return (
    <Link
      href={`${link}`}
      className="relative grid h-[150px] w-[150px] md:h-[330px] md:w-[217px]"
      onClick={setTransition}
    >
      <Image
        src={getBackdropImg(path)}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`mb-5 object-cover rounded-md w-auto h-auto ${
          isPending && "blur-sm"
        }`}
      />
      <span className="relative block mt-[100%] md:mt-[154%] text-sm leading-tight">
        {title}
      </span>
      {isPending && <Spinner />}
    </Link>
  );
}
