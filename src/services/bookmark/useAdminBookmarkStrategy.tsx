import { CreateBookmark, useBookmark, useCreateBookmark, useRemoveBookmark, useUpdateBookmark } from '@/entities';
import { UpdateBookmark } from '@/entities/bookmark';

import { BookmarkService } from './';

function useAdminBookmarkStrategy(): BookmarkService {
  const { bookmarks } = useBookmark();
  const _createBookmark = useCreateBookmark();
  const _removeBookmark = useRemoveBookmark();
  const _updateBookmark = useUpdateBookmark();

  const createBookmark = (bookmark: CreateBookmark) => _createBookmark(bookmark);

  const removeBookmark = (id: number) => _removeBookmark(id);

  const updateBookmark = (bookmark: UpdateBookmark) => _updateBookmark(bookmark);

  return { bookmarks, createBookmark, removeBookmark, updateBookmark };
}

export default useAdminBookmarkStrategy;
