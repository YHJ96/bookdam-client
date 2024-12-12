import { useMutation, useQuery } from '@tanstack/react-query';

import { createBookmark, createOgTag, getBookmark, revalidateBookmark } from './api';
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
  const { mutate } = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
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
