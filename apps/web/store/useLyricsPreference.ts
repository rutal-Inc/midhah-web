import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LyricPreference = "original" | "transliterated";

interface LyricsState {
  preference: LyricPreference;
  setPreference: (preference: LyricPreference) => void;
}

export const useLyricsPreference = create<LyricsState>()(
  persist(
    (set) => ({
      preference: "original",
      setPreference: (preference) => {
        set({ preference });
        if (typeof document !== "undefined") {
          document.cookie = `lyric-preference=${preference}; path=/; max-age=31536000; SameSite=Lax`;
        }
      },
    }),
    {
      name: "lyric-preference",
      partialize: (state) => ({ preference: state.preference }),
      skipHydration: true,
    },
  ),
);
