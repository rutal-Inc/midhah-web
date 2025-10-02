import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SuggestionLyrics } from '../models/Lyrics';

interface LyricsState {
  recentSearches: SuggestionLyrics[];
  trendingLyrics: SuggestionLyrics[];
  addRecentSearch: (search: SuggestionLyrics) => void; 
  setTrendingLyrics: () => Promise<void>;
}

export const useLyricsStore = create<LyricsState>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      trendingLyrics: [],
      addRecentSearch: (search) => {
        const prev = get().recentSearches;
        const updated = [search, ...prev.filter((t) => t.title !== search.title)].slice(0, 3);


        set({ recentSearches: updated });
      },
      setTrendingLyrics: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/trending?size=7`,
        );
        const data = await res.json();

        const formatted = data.data.map(({ title }: { title: string }) => ({
          icon: "trend",
          title: title,
        }));


        set({ trendingLyrics: formatted })},
    }),
    {
      name: 'recent-searches',
      partialize: (state) => ({
        recentSearches: state.recentSearches,
      }),
    }
  )
);
