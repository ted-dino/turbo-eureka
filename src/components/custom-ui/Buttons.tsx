import { Info, Play, PlusCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  playLink: string;
  infoLink: string;
}

export default function Buttons({ playLink,infoLink }: Props) {
  return (
    <div className="flex items-center space-x-3">
      <Link
        className="px-5 py-2 text-black bg-white flex items-center gap-x-3 rounded-sm"
        href={`${playLink}`}
      >
        <Play absoluteStrokeWidth fill="black" color="black" />
        <span>Play</span>
      </Link>
      <Link
        // className="px-5 py-2 flex items-center gap-x-3 rounded-sm bg-white/30"
        href={`${infoLink}`}
      >
        <PlusCircle absoluteStrokeWidth />
      </Link>
    </div>
  );
}
