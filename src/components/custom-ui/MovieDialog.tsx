"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { shimmer, toBase64 } from "@/lib/shimmer";
import { getBackdropImg } from "@/lib/utils";
import useUIState from "@/store/uiState";
import Image from "next/legacy/image";
import Link from "next/link";

export default function MovieDialog() {
  const { showModal, setShowModal, movieItem } = useUIState();
  const backdrop_path = process.env.NEXT_PUBLIC_BACKDROP_PATH as string;

  return (
    <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
      <DialogContent className="bg-none">
        <DialogHeader>
          <DialogTitle>{movieItem.title}</DialogTitle>
          <Image
            src={getBackdropImg(backdrop_path, movieItem.backdrop_path)}
            alt={movieItem.title}
            width={625}
            height={350}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(625, 350)
            )}`}
          />
          <DialogDescription>{movieItem.overview}</DialogDescription>
          <div>
            <Link href="">nobodys love</Link>
            <Link href="">marong 5</Link>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
