import { useTrashBookmarkStore } from '@/store';

import { TrashBookmarkService } from './index';

export const useGuestTrashBookmarkStrategy = (): TrashBookmarkService => {
  const { bookmarks, redoBookmark, undoBookmark } = useTrashBookmarkStore();

  return { bookmarks, redoBookmark, undoBookmark };
};
