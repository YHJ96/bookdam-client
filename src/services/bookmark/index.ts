import { Bookmark } from '@/entities/bookmark';
import { CreateBookmark, UpdateBookmark } from '@/entities/bookmark';
import { Role } from '@/shared/types';

import { useGuestBookmarkStrategy } from './useGuestBookmarkStrategy';
import { useTouristTrashBookmarkStrategy } from './useTouristTrashBookmarkStrategy';
import { useUserBookmarkStrategy } from './useUserBookmarkStrategy';

export interface BookmarkService {
  bookmarks: Bookmark[];
  createBookmark: (bookmark: CreateBookmark) => void;
  updateBookmark: (bookmark: UpdateBookmark) => void;
  removeBookmark: (id: number) => void;
}

export const useBookmarkService = (role: Role) => {
  const useUserBookmark = useUserBookmarkStrategy();
  const useGuestBookmark = useGuestBookmarkStrategy();
  const useTouristBookmark = useTouristTrashBookmarkStrategy();

  switch (role) {
    case 'user':
      return useUserBookmark;
    case 'guest':
      return useGuestBookmark;
    case 'tourist':
      return useTouristBookmark;
    default:
      throw new Error(`해당 역할이 없습니다. : ${role}`);
  }
};
