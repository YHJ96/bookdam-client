import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useTagUtils } from '@/entities/tag';
import { useRole, useToast } from '@/shared/hooks';
import { revalidate } from '@/shared/utils';

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

  const updateBookmark = (bookmark: Bookmark) => {
    const idx = findBookmarkIndexById(bookmark.id);
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
  const { addBookmark } = useBookmarkUtils();
  const { getUniqueTags, setTags } = useTagUtils();
  const { toast } = useToast();

  const { mutate } = useMutation<Bookmark, AxiosError<{ message: string }>, CreateBookmark>({
    mutationFn: createBookmarkApi,
    meta: { isThrowError: true },
    onSuccess: (bookmark) => {
      addBookmark(bookmark);
      setTags(getUniqueTags());
      revalidate(['bookmark', 'tag']);
    },
    onError: (error) => {
      toast({
        title: '에러가 발생했습니다.',
        description: error.response?.data.message,
        variant: 'destructive',
      });
    },
  });

  return mutate;
};

export const useCreateOgTag = () => {
  const { toast } = useToast();
  const { mutate } = useMutation<OgTag, AxiosError<{ message: string }>, CreateBookmark>({
    mutationFn: createOgTagApi,
    meta: { isThrowError: true },
    onError: (error) => {
      toast({
        title: '에러가 발생했습니다.',
        description: error.response?.data.message,
        variant: 'destructive',
      });
    },
  });

  return mutate;
};

export const useRemoveBookmark = () => {
  const { getTrashBookmarks, setTrashBookmarks } = useTrashBookmarkUtils();
  const { removeBookmark, findBookmarkById } = useBookmarkUtils();
  const { getUniqueTags, setTags } = useTagUtils();

  const { mutate } = useMutation<Bookmark, Error, number>({
    mutationFn: removeBookmarkApi,
    onSuccess: ({ id }) => {
      const target = findBookmarkById(id);
      if (target === undefined) return;

      const trashBookmarks = getTrashBookmarks();
      trashBookmarks.push(target);
      setTrashBookmarks(trashBookmarks);

      removeBookmark(id);
      setTags(getUniqueTags());
      revalidate(['bookmark', 'trash', 'tag']);
    },
  });

  return mutate;
};

export const useUpdateBookmark = () => {
  const { updateBookmark } = useBookmarkUtils();
  const { getUniqueTags, setTags } = useTagUtils();

  const { mutate } = useMutation<Bookmark, Error, UpdateBookmark>({
    mutationFn: updateBookmarkApi,
    onSuccess: (bookmark) => {
      updateBookmark(bookmark);
      setTags(getUniqueTags());
      revalidate(['bookmark', 'tag']);
    },
  });

  return mutate;
};
