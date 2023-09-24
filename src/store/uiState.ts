import { Item } from "@/types.d";
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
    backdrop_path: "",
    id: 0,
    original_title: "",
    overview: "",
    poster_path: "",
    release_date: new Date(),
    title: "",
    runtime: 0
  },
  setShowModal: (showModal) => set({ showModal }),
  setLoading: (isLoading) => set({ isLoading }),
  setItem: (item) => set({ item }),
}));

export default useUIState;
