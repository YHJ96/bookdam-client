import { StateCreator, create } from 'zustand';
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';

import type { Bookmark } from '@/entities';

type BookmarkStore = {
  bookmarks: Bookmark[];
  createBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: number) => void;
  reset: () => void;
};

type BookmarkStorePersistOptions = PersistOptions<BookmarkStore, BookmarkStore>;
type CreateBookmarkStore = StateCreator<BookmarkStore, [['zustand/persist', unknown]], []>;

const options: BookmarkStorePersistOptions = {
  name: 'bookmarks',
  storage: createJSONStorage(() => localStorage),
  onRehydrateStorage: () => (state) => {
    useBookmarkStore.setState({ bookmarks: state?.bookmarks });
  },
};

const createBookmarkStore: CreateBookmarkStore = (set) => ({
  bookmarks: [],
  createBookmark: (bookmark) =>
    set((state) => ({
      bookmarks: [...state.bookmarks, bookmark],
    })),
  removeBookmark: (id) => set((state) => ({ bookmarks: state.bookmarks?.filter((bookmark) => bookmark.id !== id) })),
  reset: () => set({ bookmarks: [] }),
});

export const useBookmarkStore = create(persist<BookmarkStore>(createBookmarkStore, options));
