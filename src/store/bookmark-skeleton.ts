import { StateCreator, StoreApi, create } from 'zustand';

type BookmarkSkeletonStore = {
  isSkeleton: boolean;
  setSkeleton: (isSkeleton: boolean) => void;
};

type CreateBookmarkSkeletonStore = StateCreator<BookmarkSkeletonStore>;
type Setter = StoreApi<BookmarkSkeletonStore>['setState'];

const setSkeleton = (set: Setter, isSkeleton: boolean) => set({ isSkeleton });

const createBookmarkSkeletonStore: CreateBookmarkSkeletonStore = (set) => ({
  isSkeleton: false,
  setSkeleton: (isSkeleton) => setSkeleton(set, isSkeleton),
});

export const useBookmarkSkeletonStore = create<BookmarkSkeletonStore>(createBookmarkSkeletonStore);
