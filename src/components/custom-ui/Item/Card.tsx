import Image from "next/image";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { getBackdropImg } from "@/lib/utils";
import { shimmer, toBase64 } from "@/lib/shimmer";

interface Props {
  path: string;
  title: string;
  handleClick: () => void;
}

export default function MovieCard({ path, title, handleClick }: Props) {
  const backdrop_path = process.env.NEXT_PUBLIC_BACKDROP_PATH as string;

  return (
    <div className="card-item pl-2 cursor-pointer">
      <Dialog>
        <DialogTrigger asChild>
          <Image
            src={getBackdropImg(path)}
            alt={title}
            width={300}
            height={150}
            priority
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(625, 350)
            )}`}
            className="rounded-lg object-cover "
            onClick={handleClick}
          />
        </DialogTrigger>
      </Dialog>
    </div>
  );
}
