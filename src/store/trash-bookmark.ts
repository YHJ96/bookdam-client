import { StateCreator, StoreApi, create } from 'zustand';
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';

import type { Bookmark } from '@/entities/bookmark';

import { useBookmarkStore } from './bookmark';
import { useTagStore } from './tag';

type TrashBookmarkStore = {
  bookmarks: Bookmark[];
  redoBookmark: (id: number) => void;
  undoBookmark: (id: number) => void;
  reset: () => void;
};

type TrashBookmarkStorePersistOptions = PersistOptions<TrashBookmarkStore, TrashBookmarkStore>;
type CreateTrashBookmarkStore = StateCreator<TrashBookmarkStore, [['zustand/persist', unknown]], []>;
type Setter = StoreApi<TrashBookmarkStore>['setState'];
type Getter = StoreApi<TrashBookmarkStore>['getState'];

const options: TrashBookmarkStorePersistOptions = {
  name: 'trash-bookmark',
  storage: createJSONStorage(() => localStorage),
  onRehydrateStorage: () => (state) => {
    useTrashBookmarkStore.setState({ bookmarks: state?.bookmarks });
  },
};

const findBookmarkIndexById = (get: Getter, id: number) => {
  const bookmarks = get().bookmarks;
  const idx = bookmarks.findIndex((_bookmarks) => _bookmarks.id === id);
  return idx;
};

const redoBookmark = (set: Setter, get: Getter, id: number) => {
  const trashBookmarks = get().bookmarks;
  const idx = findBookmarkIndexById(get, id);
  if (idx === -1) return;
  const filterTrashBookmarks = trashBookmarks.filter((_bookmark) => _bookmark.id !== id);
  set({ bookmarks: filterTrashBookmarks });

  const bookmarks = useBookmarkStore.getState().bookmarks;
  bookmarks.push(trashBookmarks[idx]);
  useBookmarkStore.setState({ bookmarks });
  const tags = useTagStore.getState().getUniqueTags();
  useTagStore.setState({ tags });
};

const undoBookmark = (set: Setter, get: Getter, id: number) => {
  const bookmarks = get().bookmarks;
  const filterBookmarks = bookmarks.filter((_bookmark) => _bookmark.id !== id);
  set({ bookmarks: filterBookmarks });
};

const createTrashBookmarkStore: CreateTrashBookmarkStore = (set, get) => ({
  bookmarks: [],
  redoBookmark: (id) => redoBookmark(set, get, id),
  undoBookmark: (id) => undoBookmark(set, get, id),
  reset: () => set({ bookmarks: [] }),
});

export const useTrashBookmarkStore = create(persist<TrashBookmarkStore>(createTrashBookmarkStore, options));
