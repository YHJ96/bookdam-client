import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createBookmarkApi,
  createOgTagApi,
  getBookmarksApi,
  removeBookmarkApi,
  revalidate,
  updateBookmarkApi,
} from './api';
import { Bookmark, CreateBookmark, UpdateBookmark } from './type';

const getBookmarks = () => {
  const queryClient = useQueryClient();
  const bookmarks = queryClient.getQueryData<Bookmark[]>(['bookmark']);
  return bookmarks ?? [];
};

const setBookmarks = (bookmarks: Bookmark[]) => {
  const queryClient = useQueryClient();
  queryClient.setQueryData<Bookmark[]>(['bookmark'], bookmarks);
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

const updateBookmark = (bookmark: Bookmark) => {
  const idx = findBookmarkIndexById(bookmark.id);
  if (idx === -1) return;
  const bookmarks = getBookmarks();
  bookmarks[idx] = { ...bookmarks[idx], ...bookmark };
  setBookmarks(bookmarks);
};

export const useBookmark = () => {
  const { data, ...rest } = useQuery<Bookmark[]>({
    queryKey: ['bookmark'],
    queryFn: getBookmarksApi,
    staleTime: Infinity,
  });

  return { bookmarks: data ?? [], ...rest };
};

export const useCreateBookmark = () => {
  const { mutate } = useMutation<Bookmark, Error, Bookmark>({
    mutationFn: createBookmarkApi,
    onSuccess: (bookmark) => {
      addBookmark(bookmark);
      revalidate(['bookmark']);
    },
  });

  return mutate;
};

export const useCreateOgTag = () => {
  const { mutate } = useMutation<Omit<Bookmark, 'id'>, Error, CreateBookmark>({
    mutationFn: createOgTagApi,
  });

  return mutate;
};

export const useRemoveBookmark = () => {
  const { mutate } = useMutation<Bookmark, Error, number>({
    mutationFn: removeBookmarkApi,
    onSuccess: ({ id }) => {
      removeBookmark(id);
      revalidate(['bookmark', 'trash']);
    },
  });

  return mutate;
};

export const useUpdateBookmark = () => {
  const { mutate } = useMutation<Bookmark, Error, UpdateBookmark>({
    mutationFn: updateBookmarkApi,
    onSuccess: (bookmark) => {
      updateBookmark(bookmark);
      revalidate(['bookmark']);
    },
  });

  return mutate;
};
