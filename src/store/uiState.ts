import { Item, OriginalLanguage } from "@/types.d";
import { create } from "zustand";

interface State {
  isLoading: boolean;
  showModal: boolean;
  item: Item;
  setShowModal: (showModal: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setItem: (item: Item) => void;
}

const useUIState = create<State>()((set) => ({
  isLoading: false,
  showModal: false,
  item: {
    adult: false,
    backdrop_path: "",
    genre_ids: [],
    id: 0,
    original_language: OriginalLanguage.En,
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    release_date: new Date(),
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  setShowModal: (showModal) => set({ showModal }),
  setLoading: (isLoading) => set({ isLoading }),
  setItem: (item) => set({ item }),
}));

export default useUIState;
