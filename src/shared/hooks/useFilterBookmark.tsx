import { useCallback } from 'react';

import { Bookmark } from '@/entities/bookmark';

export const useFilterBookmark = (bookmarks: Bookmark[], search: string, tags: string[], order: 'asc' | 'desc') => {
  const isSearch = useCallback(
    (bookmark: Bookmark) => {
      if (search.length === 0) return true;
      return bookmark.title.includes(search);
    },
    [search],
  );

  const isTag = useCallback(
    (bookmark: Bookmark) => {
      if (tags.length === 0) return true;
      return bookmark.tags.some((tag) => tags.includes(tag));
    },
    [tags],
  );

  const orderBy = (order: 'asc' | 'desc') => (prev: Bookmark, next: Bookmark) => {
    const timeStampPrev = new Date(prev.createdAt).getTime();
    const timeStampNext = new Date(next.createdAt).getTime();

    return {
      asc: timeStampNext - timeStampPrev,
      desc: timeStampPrev - timeStampNext,
    }[order];
  };

  const filterBookmarks = bookmarks.filter((bookmark) => isSearch(bookmark) && isTag(bookmark)).sort(orderBy(order));

  return filterBookmarks;
};
