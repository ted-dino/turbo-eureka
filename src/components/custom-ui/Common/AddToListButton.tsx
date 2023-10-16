"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { isInPlaylist, removeInPlaylist, saveMedia } from "@/queryFns/user";
import { Movie, Series } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CheckCircle2, Play, Plus, PlusCircle } from "lucide-react";
import Spinner from "./Spinner";

interface Props {
  type: "dialog" | "info";
  mediaType: string;
  itemToSave: Movie | Series;
}

export default function AddToListButton({
  type,
  mediaType,
  itemToSave,
}: Props) {
  const { mutate: add } = useMutation({
    mutationKey: ["playlist", itemToSave.id],
    mutationFn: () => addToList(),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: remove } = useMutation({
    mutationKey: ["playlist", itemToSave.id],
    mutationFn: () => removeInPlaylist(itemToSave.id),
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: isPlaylist,
    refetch,
    isLoading: playListLoading,
    isFetched,
    error,
  } = useQuery({
    queryKey: ["isInplaylist", itemToSave.id],
    queryFn: () => isInPlaylist(itemToSave.id),
    refetchOnWindowFocus: false,
  });

  const addToList = async () => {
    const { id, backdrop_path, name } = itemToSave;
    const title =
      "title" in itemToSave
        ? (itemToSave as Movie).title
        : (itemToSave as Series).name;

    const updatedItemToSave = {
      id,
      backdrop_path,
      name,
      title: "title" in itemToSave ? title : name,
    } as Movie | Series;

    await saveMedia(updatedItemToSave, mediaType);
  };
  return (
    <>
      {type === "dialog" && isPlaylist && !error && (
        <Button
          disabled={playListLoading}
          className={`bg-transparent hover:bg-transparent pointer-events-auto ${
            playListLoading && "cursor-progress pointer-events-none"
          }`}
        >
          {isFetched && isPlaylist === 201 ? (
            <CheckCircle2 onClick={() => remove()} />
          ) : (
            <PlusCircle onClick={() => add()} absoluteStrokeWidth />
          )}
        </Button>
      )}

      {type === "info" && (
        <Button
          disabled={playListLoading}
          className="relative bg-white text-black flex items-center gap-x-2 hover:bg-white"
        >
          {isFetched && isPlaylist === 201 ? (
            <div
              className="absolute inset-0 flex items-center justify-center gap-x-2"
              onClick={() => {
                if (error instanceof AxiosError) {
                  toast({
                    title: "Unauthorized!",
                    description: `${error.response?.data.message}`,
                  });
                } else {
                  remove();
                }
              }}
            >
              <CheckCircle2 size={20} />
              <span className="text-lg">Added</span>
            </div>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={() => {
                if (error instanceof AxiosError) {
                  toast({
                    title: "Unauthorized!",
                    description: `${error.response?.data.message}`,
                  });
                } else {
                  add();
                }
              }}
            >
              <Plus size={20} />
              <span className="text-lg">Add to My List</span>
            </div>
          )}
          {playListLoading && <Spinner />}
        </Button>
      )}
    </>
  );
}
