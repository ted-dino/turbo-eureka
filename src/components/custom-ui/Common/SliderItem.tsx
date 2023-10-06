import Image from "next/image";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { getBackdropImg } from "@/lib/utils";
import { shimmer, toBase64 } from "@/lib/shimmer";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import Spinner from "./Spinner";
interface Props {
  id: number;
  type: string;
  path: string;
  title: string;
}

export default function SliderItem({ id, type, path, title }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const setTransition = () => {
    startTransition(() => {
      router.push(
        `${pathname}?selectedShow=${
          type === "movie" ? `bW92aWVz${id}` : `dHYgc2VyaWVz${id}`
        }`,
      );
    });
  };

  return (
    <div className="relative card-item pl-2 cursor-pointer">
      <Dialog>
        <DialogTrigger asChild>
          <Link
            href={`${pathname}?selectedShow=${
              type === "movie" ? `bW92aWVz${id}` : `dHYgc2VyaWVz${id}`
            }`}
            scroll={false}
            className="focus-visible:outline-none"
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
              className={`rounded-lg object-cover ${isPending && "blur-sm"}`}
            />
            {isPending && <Spinner />}
          </Link>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}
