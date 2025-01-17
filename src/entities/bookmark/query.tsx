import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useTagUtils } from '@/entities/tag';
import { useUser } from '@/entities/user';
import { checkUrl, randomId, revalidate } from '@/shared/utils';
import { useBookmarkSkeletonStore, useBookmarkStore } from '@/store';

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
  const { role } = useUser();

  const { data, ...rest } = useQuery<Bookmark[]>({
    queryKey: ['bookmark'],
    queryFn: getBookmarksApi,
    staleTime: Infinity,
    enabled: role === 'user',
  });

  return { bookmarks: data ?? [], ...rest };
};

export const useCreateBookmark = () => {
  const { addBookmark } = useBookmarkUtils();
  const { setSkeleton } = useBookmarkSkeletonStore();
  const { getUniqueTags, setTags } = useTagUtils();

  const { mutate } = useMutation<Bookmark, Error, CreateBookmark>({
    mutationFn: createBookmarkApi,

    onMutate: () => {
      setSkeleton(true);
    },

    onSuccess: (bookmark) => {
      addBookmark(bookmark);
      setTags(getUniqueTags());
      revalidate(['bookmark', 'tag']);
    },

    onSettled: () => {
      setSkeleton(false);
    },
  });

  return mutate;
};

export const useCreateOgTag = () => {
  const { setSkeleton } = useBookmarkSkeletonStore();
  const { createBookmark } = useBookmarkStore();

  const { mutate } = useMutation<OgTag, Error, CreateBookmark>({
    mutationFn: createOgTagApi,
    onMutate: () => {
      setSkeleton(true);
    },

    onSuccess: (og) => {
      const bookmark = {
        ...og,
        id: randomId(),
        createdAt: new Date().toISOString(),
      };

      createBookmark(bookmark);
    },

    onSettled: () => {
      setSkeleton(false);
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
  const [delayPending, setDelayPending] = useState(false);

  const mutation = useMutation<boolean, Error, string>({
    mutationFn: checkUrl,
    meta: { isThrowError: true, isSuccess: true },
  });

  useEffect(() => {
    if (mutation.isPending) {
      const timer = setTimeout(() => {
        setDelayPending(true);
      }, 300);

      return () => {
        clearTimeout(timer);
        setDelayPending(false);
      };
    } else {
      setDelayPending(false);
    }
  }, [mutation.isPending]);

  return {
    ...mutation,
    isPending: delayPending,
  };
};
