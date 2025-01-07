import { StateCreator, StoreApi, create } from 'zustand';
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';

import type { Bookmark } from '@/entities/bookmark';
import { UpdateBookmark, bookmarkSchema } from '@/entities/bookmark';

import { useTagStore } from './tag';
import { useTrashBookmarkStore } from './trash-bookmark';

type BookmarkStore = {
  bookmarks: Bookmark[];
  createBookmark: (bookmark: Bookmark) => void;
  updateBookmark: (bookmark: UpdateBookmark) => void;
  removeBookmark: (id: number) => void;
  setBookmark: (bookmarks: Bookmark[]) => void;
  reset: () => void;
};

type BookmarkStorePersistOptions = PersistOptions<BookmarkStore, BookmarkStore>;
type CreateBookmarkStore = StateCreator<BookmarkStore, [['zustand/persist', unknown]], []>;
type Setter = StoreApi<BookmarkStore>['setState'];
type Getter = StoreApi<BookmarkStore>['getState'];

const options: BookmarkStorePersistOptions = {
  name: 'bookmark',
  storage: createJSONStorage(() => localStorage),
  onRehydrateStorage: () => (state) => {
    const { success } = bookmarkSchema.safeParse(state?.bookmarks);
    if (success) return;
    localStorage.clear();
    state?.reset();
  },
};

const addBookmark = (set: Setter, get: Getter, bookmark: Bookmark) => {
  const bookmarks = get().bookmarks;
  bookmarks.push(bookmark);
  set({ bookmarks });
  const tags = useTagStore.getState().getUniqueTags();
  useTagStore.setState({ tags });
};

const findBookmarkIndexById = (get: Getter, id: number) => {
  const bookmarks = get().bookmarks;
  const idx = bookmarks.findIndex((_bookmarks) => _bookmarks.id === id);
  return idx;
};

const updateBookmark = (set: Setter, get: Getter, bookmark: UpdateBookmark) => {
  const idx = findBookmarkIndexById(get, bookmark.id);
  if (idx === -1) return;
  const bookmarks = get().bookmarks;
  bookmarks[idx] = { ...bookmarks[idx], ...bookmark };
  set({ bookmarks });
  const tags = useTagStore.getState().getUniqueTags();
  useTagStore.setState({ tags });
};

const removeBookmark = (set: Setter, get: Getter, id: number) => {
  const bookmarks = get().bookmarks;
  const idx = findBookmarkIndexById(get, id);
  const filterBookmarks = bookmarks.filter((_bookmark) => _bookmark.id !== id);
  set({ bookmarks: filterBookmarks });

  const trashBookmarks = useTrashBookmarkStore.getState().bookmarks;
  trashBookmarks.push(bookmarks[idx]);
  useTrashBookmarkStore.setState({ bookmarks: trashBookmarks });
  const tags = useTagStore.getState().getUniqueTags();
  useTagStore.setState({ tags });
};

const setBookmark = (set: Setter, bookmarks: Bookmark[]) => {
  set({ bookmarks });
};

const createBookmarkStore: CreateBookmarkStore = (set, get) => ({
  bookmarks: [],
  createBookmark: (bookmark) => addBookmark(set, get, bookmark),
  updateBookmark: (bookmark) => updateBookmark(set, get, bookmark),
  removeBookmark: (id) => removeBookmark(set, get, id),
  setBookmark: (bookmarks) => setBookmark(set, bookmarks),
  reset: () => set({ bookmarks: [] }),
});

export const useBookmarkStore = create(persist<BookmarkStore>(createBookmarkStore, options));
