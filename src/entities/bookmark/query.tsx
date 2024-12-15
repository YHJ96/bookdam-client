import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createBookmark, createOgTag, getBookmark, removeBookmark, revalidate, updateBookmark } from './api';
import { Bookmark, CreateBookmark, UpdateBookmark } from './type';

export const useBookmark = () => {
  const { data, ...rest } = useQuery<Bookmark[]>({
    queryKey: ['bookmark'],
    queryFn: getBookmark,
    staleTime: Infinity,
  });

  return { bookmarks: data ?? [], ...rest };
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createBookmark,
    onSuccess: (data) => {
      queryClient.setQueryData<Bookmark[]>(['bookmark'], (prev) => {
        if (!prev) return prev;
        return [...prev, data];
      });

      revalidate(['bookmark']);
    },
  });

  return mutate;
};

export const useCreateOgTag = () => {
  const { mutate } = useMutation<Omit<Bookmark, 'id'>, Error, CreateBookmark>({
    mutationFn: createOgTag,
  });

  return mutate;
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<Bookmark, Error, number>({
    mutationFn: removeBookmark,
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Bookmark[]>(['bookmark'], (prev) => {
        if (!prev) return;
        return prev.filter((bookmark) => bookmark.id !== id);
      });

      revalidate(['bookmark', 'trash']);
    },
  });

  return mutate;
};

export const useUpdateBookmark = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<Bookmark, Error, UpdateBookmark>({
    mutationFn: updateBookmark,
    onSuccess: (bookmark) => {
      const bookmarks = queryClient.getQueryData<Bookmark[]>(['bookmark']);
      if (bookmarks === undefined) return;
      const idx = bookmarks.findIndex((_bookmark) => bookmark.id === _bookmark.id);
      if (idx === -1) return;
      bookmarks[idx] = bookmark;
      queryClient.setQueryData(['bookmark'], bookmarks);

      revalidate(['bookmark']);
    },
  });

  return mutate;
};
