import { CreateBookmark, useBookmark, useCreateBookmark } from '@/entities';

import { BookmarkService } from './';

function useAdminBookmarkStrategy(): BookmarkService {
  const { bookmarks } = useBookmark();
  const _createBookmark = useCreateBookmark();

  const createBookmark = (bookmark: CreateBookmark) => _createBookmark(bookmark);

  return { bookmarks, createBookmark };
}

export default useAdminBookmarkStrategy;
