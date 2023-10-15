"use client";

import { Button } from "@/components/ui/button";
import { isInPlaylist, removeInPlaylist, saveMedia } from "@/queryFns/user";
import { Movie, Series } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CheckCircle2, Info, Play, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  playLink: string;
  itemToSave: Movie | Series;
}

export default function Buttons({ playLink, itemToSave }: Props) {
  const [added, setAdded] = useState(false);
  const [removed, setRemoved] = useState(false);
  const {
    mutate,
    isLoading: addLoading,
    isSuccess: addSuccess,
  } = useMutation({
    mutationKey: ["playlist", itemToSave.id],
    mutationFn: () => addToList(),
    onSuccess: () => {
      setAdded(true);
      setRemoved(false);
    },
  });

  const {
    mutate: remove,
    isLoading: removeLoading,
    isSuccess: removeSuccess,
  } = useMutation({
    mutationKey: ["playlist", itemToSave.id],
    mutationFn: () => removeInPlaylist(itemToSave.id),
    onSuccess: () => {
      setAdded(false);
      setRemoved(true);
    },
  });

  const {
    data: isPlaylist,
    refetch,
    isLoading: playListLoading,
  } = useQuery({
    queryKey: ["isInplaylist", itemToSave.id],
    queryFn: () => isInPlaylist(itemToSave.id),
    refetchOnWindowFocus: false,
    onSuccess() {
      if (addSuccess || removeSuccess) {
        refetch();
      }
    },
  });

  const addToList = async () => {
    const { id, poster_path, name } = itemToSave;
    const title =
      "title" in itemToSave
        ? (itemToSave as Movie).title
        : (itemToSave as Series).name;

    const updatedItemToSave = {
      id,
      poster_path,
      name,
      title: "title" in itemToSave ? title : name,
    } as Movie | Series;

    await saveMedia(updatedItemToSave);
  };

  return (
    <div className="flex items-center space-x-3">
      <Link
        className="px-5 py-2 text-black bg-white flex items-center gap-x-3 rounded-sm"
        href={`${playLink}`}
      >
        <Play absoluteStrokeWidth fill="black" color="black" />
        <span>Play</span>
      </Link>
      <Button
        className={`bg-transparent hover:bg-transparent pointer-events-auto ${
          addLoading || (removeLoading && "cursor-progress pointer-events-none")
        }`}
      >
        {(isPlaylist === 201 || isPlaylist === 400) && added && !removed ? (
          <CheckCircle2 onClick={() => remove()} />
        ) : (
          <PlusCircle onClick={() => mutate()} absoluteStrokeWidth />
        )}
      </Button>
    </div>
  );
}
