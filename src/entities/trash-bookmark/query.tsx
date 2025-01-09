import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useTagUtils } from '@/entities/tag';
import { useUser } from '@/entities/user';
import { revalidate } from '@/shared/utils';

import { Bookmark, useBookmarkUtils } from '../bookmark';
import { getTrashBookmarksApi, redoTrashBookmarkApi, undoTrashBookmarkApi } from './api';

export const useTrashBookmarkUtils = () => {
  const queryClient = useQueryClient();

  const getTrashBookmarks = () => {
    const bookmarks = queryClient.getQueryData<Bookmark[]>(['trash']);
    return structuredClone(bookmarks) ?? [];
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

  const addTrashBookmark = (bookmark: Bookmark) => {
    const bookmarks = getTrashBookmarks();
    bookmarks.push(bookmark);
    setTrashBookmarks(bookmarks);
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
    addTrashBookmark,
    removeTrashBookmark,
  };
};

export const useTrashBookmark = () => {
  const { role } = useUser();

  const { data, ...rest } = useQuery<Bookmark[]>({
    queryKey: ['trash'],
    queryFn: getTrashBookmarksApi,
    staleTime: Infinity,
    enabled: role === 'user',
  });

  return { bookmarks: data ?? [], ...rest };
};

type RedoContext = {
  bookmarks: Bookmark[];
  trashBookmarks: Bookmark[];
  tags: string[];
};

type UndoContext = {
  trashBookmarks: Bookmark[];
};

export const useRedoTrashBookmark = () => {
  const { setBookmarks, getBookmarks, addBookmark } = useBookmarkUtils();
  const { removeTrashBookmark, findBookmarkById, getTrashBookmarks, setTrashBookmarks } = useTrashBookmarkUtils();
  const { getUniqueTags, setTags, getTags } = useTagUtils();

  const { mutate } = useMutation<Bookmark, Error, number, RedoContext>({
    mutationFn: redoTrashBookmarkApi,
    onMutate: (id) => {
      const target = findBookmarkById(id);
      if (target === undefined) return;

      const prevTrashBookmarks = getTrashBookmarks();
      const prevBookmarks = getBookmarks();
      const prevTags = getTags();

      addBookmark(target);
      removeTrashBookmark(id);
      setTags(getUniqueTags());

      return { bookmarks: prevBookmarks, trashBookmarks: prevTrashBookmarks, tags: prevTags };
    },

    onSuccess: () => {
      revalidate(['bookmark', 'trash', 'tag']);
    },

    onError: (_, __, context) => {
      if (context === undefined) return;
      setBookmarks(context.bookmarks);
      setTrashBookmarks(context.trashBookmarks);
      setTags(context.tags);
    },
  });

  return mutate;
};

export const useUndoTrashBookmark = () => {
  const { getTrashBookmarks, removeTrashBookmark, setTrashBookmarks } = useTrashBookmarkUtils();

  const { mutate } = useMutation<Bookmark, Error, number, UndoContext>({
    mutationFn: undoTrashBookmarkApi,
    onMutate: (id) => {
      const prevTrashBookmarks = getTrashBookmarks();
      removeTrashBookmark(id);
      return { trashBookmarks: prevTrashBookmarks };
    },

    onSuccess: () => {
      revalidate(['trash']);
    },

    onError(_, __, context) {
      if (context === undefined) return;
      setTrashBookmarks(context.trashBookmarks);
    },
  });

  return mutate;
};
