import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useTagUtils } from '@/entities/tag';
import { useRole } from '@/shared/hooks';
import { checkUrl, randomId, revalidate } from '@/shared/utils';
import { useBookmarkStore } from '@/store';

import { useTrashBookmarkUtils } from '../trash-bookmark';
import { createBookmarkApi, createOgTagApi, getBookmarksApi, removeBookmarkApi, updateBookmarkApi } from './api';
import { Bookmark, CreateBookmark, OgTag, UpdateBookmark } from './type';

export const useBookmarkUtils = () => {
  const queryClient = useQueryClient();

  const getBookmarks = () => {
    const bookmarks = queryClient.getQueryData<Bookmark[]>(['bookmark']);
    return structuredClone(bookmarks) ?? [];
  };

  const setBookmarks = (bookmarks: Bookmark[]) => {
    queryClient.setQueryData<Bookmark[]>(['bookmark'], bookmarks);
  };

  const findBookmarkById = (id: number) => {
    const bookmarks = getBookmarks().find((_bookmark) => _bookmark.id === id);
    return bookmarks;
  };

  const findBookmarkIndexById = (id: number) => {
    const idx = getBookmarks().findIndex((_bookmark) => _bookmark.id === id);
    return idx;
  };

  const addBookmark = (bookmark: Bookmark) => {
    const bookmarks = getBookmarks();
    bookmarks.push(bookmark);
    setBookmarks(bookmarks);
  };

  const removeBookmark = (id: number) => {
    const bookmarks = getBookmarks();
    const filterBookmarks = bookmarks.filter((_bookmarks) => _bookmarks.id !== id);
    setBookmarks(filterBookmarks);
  };

  const updateBookmark = (bookmark: Bookmark, prevId?: number) => {
    const idx = findBookmarkIndexById(prevId ?? bookmark.id);
    if (idx === -1) return;
    const bookmarks = getBookmarks();
    bookmarks[idx] = { ...bookmarks[idx], ...bookmark };
    setBookmarks(bookmarks);
  };

  return {
    getBookmarks,
    setBookmarks,
    findBookmarkById,
    findBookmarkIndexById,
    addBookmark,
    removeBookmark,
    updateBookmark,
  };
};

type CreateOgContext = {
  id: number;
  tags: string[];
  bookmarks: Bookmark[];
};

type CreateContext = {
  id: number;
  bookmarks: Bookmark[];
  tags: string[];
};

type RemoveContext = {
  bookmarks: Bookmark[];
  trashBookmarks: Bookmark[];
  tags: string[];
};

type UpdateContext = {
  bookmarks: Bookmark[];
  tags: string[];
};

export const useBookmark = () => {
  const role = useRole();

  const { data, ...rest } = useQuery<Bookmark[]>({
    queryKey: ['bookmark'],
    queryFn: getBookmarksApi,
    staleTime: Infinity,
    enabled: role === 'user',
  });

  return { bookmarks: data ?? [], ...rest };
};

export const useCreateBookmark = () => {
  const { addBookmark, getBookmarks, setBookmarks, updateBookmark } = useBookmarkUtils();
  const { getUniqueTags, setTags, getTags } = useTagUtils();

  const { mutate } = useMutation<Bookmark, AxiosError<{ message: string }>, CreateBookmark, CreateContext>({
    mutationFn: createBookmarkApi,

    onMutate: (createBookmark) => {
      const prevBookmark = getBookmarks();
      const prevTags = getTags();
      const id = randomId();

      const bookmark = {
        ...createBookmark,
        id,
        createdAt: new Date().toISOString(),
        image: process.env.NEXT_PUBLIC_EMPTY_IMAGE,
      };

      addBookmark(bookmark);
      setTags(getUniqueTags());

      return { id, bookmarks: prevBookmark, tags: prevTags };
    },

    onSuccess: (bookmark, _, context) => {
      updateBookmark(bookmark, context.id);
      revalidate(['bookmark', 'tag']);
    },

    onError: (_, __, context) => {
      if (context === undefined) return;
      setBookmarks(context.bookmarks);
      setTags(context.tags);
    },
  });

  return mutate;
};

export const useCreateOgTag = () => {
  const {
    bookmarks,
    createBookmark: _createBookmark,
    setBookmark,
    updateBookmark: _updateBookmark,
  } = useBookmarkStore();
  const { mutate } = useMutation<OgTag, AxiosError<{ message: string }>, CreateBookmark, CreateOgContext>({
    mutationFn: createOgTagApi,
    onMutate: (createBookmark) => {
      const prevBookmarks = structuredClone(bookmarks);
      const id = randomId();

      const bookmark = {
        ...createBookmark,
        id,
        createdAt: new Date().toISOString(),
        image: process.env.NEXT_PUBLIC_EMPTY_IMAGE,
      };

      _createBookmark(bookmark);
      return { id, tags: createBookmark.tags, bookmarks: prevBookmarks };
    },

    onSuccess: (data, _, context) => {
      const bookmark = {
        id: context.id,
        tags: [],
        ...data,
      };

      _updateBookmark(bookmark);
    },

    onError: (_, __, context) => {
      if (context === undefined) return;
      setBookmark(context.bookmarks);
    },
  });

  return mutate;
};

export const useRemoveBookmark = () => {
  const { getTrashBookmarks, setTrashBookmarks, addTrashBookmark } = useTrashBookmarkUtils();
  const { getBookmarks, removeBookmark, findBookmarkById, setBookmarks } = useBookmarkUtils();
  const { getUniqueTags, getTags, setTags } = useTagUtils();

  const { mutate } = useMutation<Bookmark, Error, number, RemoveContext>({
    mutationFn: removeBookmarkApi,
    onMutate: (id) => {
      const target = findBookmarkById(id);
      if (target === undefined) return;

      const prevBookmarks = getBookmarks();
      const prevTrashBookmarks = getTrashBookmarks();
      const prevTags = getTags();

      addTrashBookmark(target);
      removeBookmark(id);
      setTags(getUniqueTags());

      return { bookmarks: prevBookmarks, trashBookmarks: prevTrashBookmarks, tags: prevTags };
    },

    onSuccess: () => {
      revalidate(['bookmark', 'trash', 'tag']);
    },

    onError(_, __, context) {
      if (context === undefined) return;
      setBookmarks(context.bookmarks);
      setTrashBookmarks(context.trashBookmarks);
      setTags(context.tags);
    },
  });

  return mutate;
};

export const useUpdateBookmark = () => {
  const { getBookmarks, updateBookmark, setBookmarks, findBookmarkById } = useBookmarkUtils();
  const { getUniqueTags, getTags, setTags } = useTagUtils();

  const { mutate } = useMutation<Bookmark, Error, UpdateBookmark, UpdateContext>({
    mutationFn: updateBookmarkApi,
    onMutate: (bookmark) => {
      const target = findBookmarkById(bookmark.id);
      if (target === undefined) return;

      const prevBookmarks = getBookmarks();
      const prevTags = getTags();

      updateBookmark({ ...target, ...bookmark });
      setTags(getUniqueTags());

      return { bookmarks: prevBookmarks, tags: prevTags };
    },

    onSuccess: () => {
      revalidate(['bookmark', 'tag']);
    },

    onError: (_, __, context) => {
      if (context === undefined) return;
      setBookmarks(context.bookmarks);
      setTags(context.tags);
    },
  });

  return mutate;
};

export const useCheckurl = () => {
  const { mutateAsync } = useMutation<boolean, Error, string>({
    mutationFn: checkUrl,
    meta: { isThrowError: true, isSuccess: true },
  });

  return mutateAsync;
};
