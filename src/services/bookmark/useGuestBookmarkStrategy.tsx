import { CreateBookmark, useCreateBookmark, useCreateOgTag } from '@/entities';
import { useBookmarkStore } from '@/store';

import { BookmarkService } from './';

function useGuestBookmarkStrategy(): BookmarkService {
  const createOgTag = useCreateOgTag();
  const { bookmarks, createBookmark: _createBookmark, removeBookmark, updateBookmark } = useBookmarkStore();

  const createBookmark = async (bookmark: CreateBookmark) => {
    const id = Math.floor(Math.random() * 1000000);

    createOgTag(bookmark, {
      onSuccess: (data) => {
        _createBookmark({ ...data, id, tags: bookmark.tags });
      },
    });
  };

  return { bookmarks, createBookmark, removeBookmark, updateBookmark };
}

export default useGuestBookmarkStrategy;
