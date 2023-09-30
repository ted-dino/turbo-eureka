"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { shimmer, toBase64 } from "@/lib/shimmer";
import { getBackdropImg } from "@/lib/utils";
import useUIState from "@/store/uiState";
import Image from "next/legacy/image";
import Buttons from "../Buttons";

export default function MovieDialog() {
  const { showModal, setShowModal, item } = useUIState();
  
  return (
    <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
      <DialogContent className="bg-none">
        <DialogHeader>
          <DialogTitle className="mb-5">
            {item.name ? item.name : item.title}
          </DialogTitle>
          <Image
            className="rounded"
            src={getBackdropImg(item.backdrop_path)}
            alt={item.name ? item.name : item.title}
            width={625}
            height={350}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(625, 350)
            )}`}
          />
          <DialogDescription className="pt-3 pb-5">
            {item.overview}
          </DialogDescription>
          <Buttons playLink="/porn" infoLink="/info-link" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
