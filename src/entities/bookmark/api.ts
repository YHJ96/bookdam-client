import { api } from '@/shared/libs';

import { CreateBookmark, UpdateBookmark } from './type';

export const getBookmarksApi = async () => {
  const response = await api.get('/bookmark');
  return response.data;
};

export const createBookmarkApi = async (bookmark: CreateBookmark) => {
  const response = await api.post('/bookmark', { ...bookmark });
  return response.data;
};

export const createOgTagApi = async (bookmark: CreateBookmark) => {
  const response = await api.post('bookmark/og', { ...bookmark });
  return response.data;
};

export const removeBookmarkApi = async (id: number) => {
  const response = await api.delete(`/bookmark/${id}`);
  return response.data;
};

export const updateBookmarkApi = async (bookmark: UpdateBookmark) => {
  const response = await api.patch(`/bookmark/${bookmark.id}`, { ...bookmark });
  return response.data;
};
