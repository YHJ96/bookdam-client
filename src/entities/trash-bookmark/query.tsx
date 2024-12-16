import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { revalidate } from '@/shared/utils';

import { Bookmark, useBookmarkUtils } from '../bookmark';
import { getTrashBookmarksApi, redoTrashBookmarkApi, undoTrashBookmarkApi } from './api';

export const useTrashBookmarkUtils = () => {
  const { getBookmarks, setBookmarks } = useBookmarkUtils();
  const queryClient = useQueryClient();

  const getTrashBookmarks = () => {
    const bookmarks = queryClient.getQueryData<Bookmark[]>(['trash']);
    return bookmarks ?? [];
  };

  const setTrashBookmarks = (bookmarks: Bookmark[]) => {
    queryClient.setQueryData<Bookmark[]>(['trash'], bookmarks);
  };

  const findBookmarkIndexById = (id: number) => {
    const idx = getTrashBookmarks().findIndex((_bookmark) => _bookmark.id === id);
    return idx;
  };

  const redoTrashBookmarks = (id: number) => {
    const trashBookmarks = getTrashBookmarks();
    const idx = findBookmarkIndexById(id);
    if (idx === -1) return;
    undoTrashBookmarks(id);

    const bookmarks = getBookmarks();
    bookmarks.push(trashBookmarks[idx]);
    setBookmarks(bookmarks);
  };

  const undoTrashBookmarks = (id: number) => {
    const bookmarks = getTrashBookmarks();
    const idx = findBookmarkIndexById(id);
    if (idx === -1) return;
    const filterBookmarks = bookmarks.filter((_bookmark) => _bookmark.id !== id);
    setTrashBookmarks(filterBookmarks);
  };

  return { getTrashBookmarks, setTrashBookmarks, findBookmarkIndexById, redoTrashBookmarks, undoTrashBookmarks };
};

export const useTrashBookmark = () => {
  const { data, ...rest } = useQuery<Bookmark[]>({
    queryKey: ['trash'],
    queryFn: getTrashBookmarksApi,
    staleTime: Infinity,
  });

  return { bookmarks: data ?? [], ...rest };
};

export const useRedoTrashBookmark = () => {
  const { redoTrashBookmarks } = useTrashBookmarkUtils();

  const { mutate } = useMutation({
    mutationFn: redoTrashBookmarkApi,
    onSuccess: ({ id }) => {
      redoTrashBookmarks(id);
      revalidate(['bookmark', 'trash']);
    },
  });

  return mutate;
};

export const useUndoTrashBookmark = () => {
  const { undoTrashBookmarks } = useTrashBookmarkUtils();

  const { mutate } = useMutation<Bookmark, Error, number>({
    mutationFn: undoTrashBookmarkApi,
    onSuccess: ({ id }) => {
      undoTrashBookmarks(id);
      revalidate(['trash']);
    },
  });

  return mutate;
};
