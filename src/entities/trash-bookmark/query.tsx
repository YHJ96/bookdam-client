import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useTagUtils } from '@/entities/tag';
import { useRole } from '@/shared/hooks';
import { revalidate } from '@/shared/utils';

import { Bookmark, useBookmarkUtils } from '../bookmark';
import { getTrashBookmarksApi, redoTrashBookmarkApi, undoTrashBookmarkApi } from './api';

export const useTrashBookmarkUtils = () => {
  const queryClient = useQueryClient();

  const getTrashBookmarks = () => {
    const bookmarks = queryClient.getQueryData<Bookmark[]>(['trash']);
    return bookmarks ?? [];
  };

  const setTrashBookmarks = (bookmarks: Bookmark[]) => {
    queryClient.setQueryData<Bookmark[]>(['trash'], bookmarks);
  };

  const findBookmarkById = (id: number) => {
    const bookmarks = getTrashBookmarks().find((_bookmark) => _bookmark.id === id);
    return bookmarks;
  };

  const findBookmarkIndexById = (id: number) => {
    const idx = getTrashBookmarks().findIndex((_bookmark) => _bookmark.id === id);
    return idx;
  };

  const removeTrashBookmark = (id: number) => {
    const bookmarks = getTrashBookmarks();
    const idx = findBookmarkIndexById(id);
    if (idx === -1) return;
    const filterBookmarks = bookmarks.filter((_bookmark) => _bookmark.id !== id);
    setTrashBookmarks(filterBookmarks);
  };

  return {
    getTrashBookmarks,
    setTrashBookmarks,
    findBookmarkById,
    findBookmarkIndexById,
    removeTrashBookmark,
  };
};

export const useTrashBookmark = () => {
  const role = useRole();

  const { data, ...rest } = useQuery<Bookmark[]>({
    queryKey: ['trash'],
    queryFn: getTrashBookmarksApi,
    staleTime: Infinity,
    enabled: role === 'user',
  });

  return { bookmarks: data ?? [], ...rest };
};

export const useRedoTrashBookmark = () => {
  const { setBookmarks, getBookmarks } = useBookmarkUtils();
  const { removeTrashBookmark, findBookmarkById } = useTrashBookmarkUtils();
  const { getUniqueTags, setTags } = useTagUtils();

  const { mutate } = useMutation({
    mutationFn: redoTrashBookmarkApi,
    onSuccess: ({ id }) => {
      const target = findBookmarkById(id);
      if (target === undefined) return;

      const bookmarks = getBookmarks();
      bookmarks.push(target);
      setBookmarks(bookmarks);

      removeTrashBookmark(id);
      setTags(getUniqueTags());
      revalidate(['bookmark', 'trash', 'tag']);
    },
  });

  return mutate;
};

export const useUndoTrashBookmark = () => {
  const { removeTrashBookmark } = useTrashBookmarkUtils();

  const { mutate } = useMutation<Bookmark, Error, number>({
    mutationFn: undoTrashBookmarkApi,
    onSuccess: ({ id }) => {
      removeTrashBookmark(id);
      revalidate(['trash']);
    },
  });

  return mutate;
};
