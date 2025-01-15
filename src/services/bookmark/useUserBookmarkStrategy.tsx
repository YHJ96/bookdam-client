import { useBookmark, useCreateBookmark, useRemoveBookmark, useUpdateBookmark } from '@/entities/bookmark';

import { BookmarkService } from './';

export const useUserBookmarkStrategy = (): BookmarkService => {
  const { bookmarks } = useBookmark();
  const createBookmark = useCreateBookmark();
  const removeBookmark = useRemoveBookmark();
  const updateBookmark = useUpdateBookmark();

  return { bookmarks, createBookmark, removeBookmark, updateBookmark };
};
