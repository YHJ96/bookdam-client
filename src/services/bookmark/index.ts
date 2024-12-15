import { Bookmark, CreateBookmark } from '@/entities';
import { UpdateBookmark } from '@/entities/bookmark';

import useAdminBookmarkStrategy from './useAdminBookmarkStrategy';
import useGuestBookmarkStrategy from './useGuestBookmarkStrategy';

type Role = 'guest' | 'user';

export interface BookmarkService {
  bookmarks: Bookmark[];
  createBookmark: (bookmark: Bookmark) => void;
  updateBookmark: (bookmark: UpdateBookmark) => void;
  removeBookmark: (id: number) => void;
}

export function useBookmarkService(role: Role) {
  const useAdminBookmark = useAdminBookmarkStrategy();
  const useGuestBookmark = useGuestBookmarkStrategy();

  switch (role) {
    case 'user':
      return useAdminBookmark;
    case 'guest':
      return useGuestBookmark;
    default:
      throw new Error(`해당 역할이 없습니다. : ${role}`);
  }
}
