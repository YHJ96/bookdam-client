/* eslint-disable react-hooks/rules-of-hooks */
import { Bookmark, CreateBookmark } from '@/entities';

import useAdminBookmarkStrategy from './useAdminBookmarkStrategy';
import useGuestBookmarkStrategy from './useGuestBookmarkStrategy';

type Role = 'guest' | 'user';

export interface BookmarkService {
  bookmarks: Bookmark[] | null;
  createBookmark: (bookmark: CreateBookmark) => void;
}

export function useBookmarkService(role: Role) {
  switch (role) {
    case 'user':
      return useAdminBookmarkStrategy();
    case 'guest':
      return useGuestBookmarkStrategy();
    default:
      throw new Error(`Unknown role: ${role}`);
  }
}
