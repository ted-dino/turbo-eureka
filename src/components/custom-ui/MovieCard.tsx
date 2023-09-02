import Image from "next/image";
import { Dialog, DialogTrigger } from "../ui/dialog";

interface Props {
  src: string;
  title: string;
  handleClick: () => void;
}

export default function MovieCard({ src, title, handleClick }: Props) {
  return (
    <div className="card-item pl-2 cursor-pointer">
      <Dialog>
        <DialogTrigger asChild>
          <Image
            src={src}
            alt={title}
            width={300}
            height={150}
            priority
            className="rounded-lg object-cover "
            onClick={handleClick}
          />
        </DialogTrigger>
      </Dialog>
    </div>
  );
}
