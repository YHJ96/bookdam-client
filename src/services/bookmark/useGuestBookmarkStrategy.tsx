import { CreateBookmark, useCreateOgTag } from '@/entities/bookmark';
import { useBookmarkStore } from '@/store';

import { BookmarkService } from './';

export const useGuestBookmarkStrategy = (): BookmarkService => {
  const createOgTag = useCreateOgTag();
  const { bookmarks, createBookmark: _createBookmark, removeBookmark, updateBookmark } = useBookmarkStore();

  const createBookmark = (bookmark: CreateBookmark) => {
    createOgTag(bookmark);
  };

  return { bookmarks, createBookmark, removeBookmark, updateBookmark };
};
