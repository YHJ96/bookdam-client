import { CreateBookmark } from '@/entities';
import { useBookmarkStore } from '@/store';

import { BookmarkService } from './';

function useGuestBookmarkStrategy(): BookmarkService {
  const { bookmarks, createBookmark: _createBookmark } = useBookmarkStore();

  const createBookmark = (bookmark: CreateBookmark) => {
    const id = Math.floor(Math.random() * 1000000);
    _createBookmark({ ...bookmark, id, image: '' });
  };

  return { bookmarks, createBookmark };
}

export default useGuestBookmarkStrategy;
