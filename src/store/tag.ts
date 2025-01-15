import { StateCreator, create } from 'zustand';
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';

import { useBookmarkStore } from './bookmark';

type TagStore = {
  tags: string[];
  getUniqueTags: () => string[];
  reset: () => void;
};

type TagStorePersistOptions = PersistOptions<TagStore, TagStore>;
type CreateTagStore = StateCreator<TagStore, [['zustand/persist', unknown]], []>;

const options: TagStorePersistOptions = {
  name: 'tag',
  storage: createJSONStorage(() => localStorage),
  onRehydrateStorage: () => (state) => {
    useTagStore.setState({ tags: state?.tags });
  },
};

const getUniqueTags = () => {
  const bookmarks = useBookmarkStore.getState().bookmarks;
  const set = new Set<string>(bookmarks.flatMap((bookmark) => bookmark.tags));
  return Array.from(set.values());
};

const createTagStore: CreateTagStore = (set) => ({
  tags: [],
  getUniqueTags: () => getUniqueTags(),
  reset: () => set({ tags: [] }),
});

export const useTagStore = create(persist<TagStore>(createTagStore, options));
