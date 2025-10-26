import { create } from "zustand";

type LyricState = {
  currentlyricId: number | null;
  collectionIds: number[];
  setCurrentLyricId: (id: number) => void;
  addCollectionId: (id: number) => void;
  removeCollectionId: (id: number) => void;
  reset: () => void;
};

export const useCollectionStore = create<LyricState>((set) => ({
  currentlyricId: null,
  collectionIds: [],

  setCurrentLyricId: (id) =>
    set({
      currentlyricId: id,
      collectionIds: [],
    }),

  addCollectionId: (id) =>
    set((state) => {
      if (state.collectionIds.includes(id)) return state;

      return {
        collectionIds: [...state.collectionIds, id],
      };
    }),

  removeCollectionId: (id) => {
    set((state) => ({
      collectionIds: state.collectionIds.filter((item) => item !== id),
    }));
  },

  reset: () => {
    set({
      currentlyricId: null,
      collectionIds: [],
    });
  },
}));
