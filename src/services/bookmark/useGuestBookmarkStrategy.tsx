import { CreateBookmark, useCreateBookmark, useCreateOgTag } from '@/entities';
import { useBookmarkStore } from '@/store';

import { BookmarkService } from './';

function useGuestBookmarkStrategy(): BookmarkService {
  const createOgTag = useCreateOgTag();
  const { bookmarks, createBookmark: _createBookmark, removeBookmark } = useBookmarkStore();

  const createBookmark = async (bookmark: CreateBookmark) => {
    const id = Math.floor(Math.random() * 1000000);

    createOgTag(bookmark, {
      onSuccess: (data) => {
        _createBookmark({ ...data, id });
      },
    });
  };

  return { bookmarks, createBookmark, removeBookmark };
}

export default useGuestBookmarkStrategy;
