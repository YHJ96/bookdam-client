import { CreateBookmark, useCreateOgTag } from '@/entities/bookmark';
import { useBookmarkStore } from '@/store';

import { BookmarkService } from './';

export const useGuestBookmarkStrategy = (): BookmarkService => {
  const createOgTag = useCreateOgTag();
  const { bookmarks, createBookmark: _createBookmark, removeBookmark, updateBookmark } = useBookmarkStore();

  const createBookmark = async (bookmark: CreateBookmark) => {
    const id = Math.floor(Math.random() * 1000000);
    const now = new Date().toISOString();

    createOgTag(bookmark, {
      onSuccess: (data) => {
        _createBookmark({ ...data, id, tags: bookmark.tags, createdAt: now });
      },
    });
  };

  return { bookmarks, createBookmark, removeBookmark, updateBookmark };
};
