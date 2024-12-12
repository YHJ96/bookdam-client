import { CreateBookmark, useBookmark, useCreateBookmark, useRemoveBookmark } from '@/entities';

import { BookmarkService } from './';

function useAdminBookmarkStrategy(): BookmarkService {
  const { bookmarks } = useBookmark();
  const _createBookmark = useCreateBookmark();
  const _removeBookmark = useRemoveBookmark();

  const createBookmark = (bookmark: CreateBookmark) => _createBookmark(bookmark);

  const removeBookmark = (id: number) => _removeBookmark(id);

  return { bookmarks, createBookmark, removeBookmark };
}

export default useAdminBookmarkStrategy;
