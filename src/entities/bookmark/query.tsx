import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createBookmark, createOgTag, getBookmark, removeBookmark, revalidateBookmark } from './api';
import { Bookmark, CreateBookmark } from './type';

export const useBookmark = () => {
  const { data, ...rest } = useQuery<Bookmark[]>({
    queryKey: ['bookmark'],
    queryFn: getBookmark,
    staleTime: Infinity,
  });

  return { bookmarks: data ?? null, ...rest };
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

      revalidateBookmark();
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
      revalidateBookmark();
    },
  });

  return mutate;
};
