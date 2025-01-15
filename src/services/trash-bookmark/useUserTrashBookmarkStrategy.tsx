import { useRedoTrashBookmark, useTrashBookmark, useUndoTrashBookmark } from '@/entities/trash-bookmark';

import { TrashBookmarkService } from './index';

export const useUserTrashBookmarkStrategy = (): TrashBookmarkService => {
  const { bookmarks } = useTrashBookmark();
  const redoBookmark = useRedoTrashBookmark();
  const undoBookmark = useUndoTrashBookmark();

  return { bookmarks, redoBookmark, undoBookmark };
};
