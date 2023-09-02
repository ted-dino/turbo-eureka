import { OriginalLanguage, Result } from "@/types.d";
import { create } from "zustand";

interface State {
  isLoading: boolean;
  showModal: boolean;
  movieItem: Result;
  setShowModal: (showModal: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setMovieItem: (item: Result) => void;
}

const useUIState = create<State>()((set) => ({
  isLoading: false,
  showModal: false,
  movieItem: {
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
  setMovieItem: (movieItem) => set({ movieItem }),
}));

export default useUIState;
