import Image from "next/image";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { getBackdropImg } from "@/lib/utils";
import { shimmer, toBase64 } from "@/lib/shimmer";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  id: number;
  type: string;
  path: string;
  title: string;
}

export default function MovieCard({ id, type, path, title }: Props) {
  const pathname = usePathname();

  return (
    <div className="card-item pl-2 cursor-pointer">
      <Dialog>
        <DialogTrigger asChild>
          <Link
            href={`${pathname}?selectedShow=${
              type === "movie" ? `bW92aWVz${id}` : `dHYgc2VyaWVz${id}`
            }`}
            scroll={false}
            className="focus-visible:outline-none"
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
              className="rounded-lg object-cover"
            />
          </Link>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}
