"use client";

import Image from "next/image";
import { getBackdropImg } from "@/lib/utils";
import { shimmer, toBase64 } from "@/lib/shimmer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spinner from "./Spinner";
import { revalidatePath } from "next/cache";
interface Props {
  link: string;
  path: string;
  title: string;
}

export default function CardItem({ link, path, title }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const setTransition = () => {
    revalidatePath("/my-list/");
    startTransition(() => {
      router.push(`${link}`);
    });
  };

  return (
    <>
      <Link
        className="relative flex flex-col"
        href={`${link}`}
        onClick={setTransition}
      >
        <Image
          src={getBackdropImg(path)}
          alt={title}
          width={300}
          height={150}
          priority
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(625, 350),
          )}`}
          className={`mb-2 rounded-lg object-cover ${isPending && "blur-sm"}`}
        />
        {isPending && <Spinner />}
      </Link>
      <p className="">{title}</p>
    </>
  );
}