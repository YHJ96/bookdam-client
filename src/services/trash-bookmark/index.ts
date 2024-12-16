import { Bookmark } from '@/entities/bookmark';
import { Role } from '@/shared/types';

import { useGuestTrashBookmarkStrategy } from './useGuestTrashBookmarkStrategy';
import { useUserTrashBookmarkStrategy } from './useUserTrashBookmarkStrategy';

export interface TrashBookmarkService {
  bookmarks: Bookmark[];
  redoBookmark: (id: number) => void;
  undoBookmark: (id: number) => void;
}

export const useTrashBookmarkService = (role: Role) => {
  const useUserTrashBookmark = useUserTrashBookmarkStrategy();
  const useGuestTrashBookmark = useGuestTrashBookmarkStrategy();

  switch (role) {
    case 'user':
      return useUserTrashBookmark;
    case 'guest':
      return useGuestTrashBookmark;
    default:
      throw new Error(`해당 역할이 없습니다. : ${role}`);
  }
};
