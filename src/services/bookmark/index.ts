import { Bookmark, CreateBookmark } from '@/entities';

import useAdminBookmarkStrategy from './useAdminBookmarkStrategy';
import useGuestBookmarkStrategy from './useGuestBookmarkStrategy';

type Role = 'guest' | 'user';

export interface BookmarkService {
  bookmarks: Bookmark[] | null;
  createBookmark: (bookmark: CreateBookmark) => void;
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
      throw new Error(`Unknown role: ${role}`);
  }
}
