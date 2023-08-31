import { create } from "zustand";

interface State {
  isLoading: boolean;

  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setLoading: (isLoading: boolean) => void;
}

const useUIState = create<State>()((set) => ({
  isLoading: false,
  showModal: false,
  setShowModal: (showModal) => set({ showModal }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useUIState;
