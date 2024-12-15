import { api, nextApi } from '@/shared/libs';

import { CreateBookmark, UpdateBookmark } from './type';

export const revalidate = async (tags: Array<'bookmark' | 'trash'>) => {
  const response = await nextApi.post('/revalidate', { tags });
  return response.data;
};

export const getBookmark = async () => {
  const response = await api.get('/bookmark');
  return response.data;
};

export const createBookmark = async (bookmark: CreateBookmark) => {
  const response = await api.post('/bookmark', { ...bookmark });
  return response.data;
};

export const createOgTag = async (bookmark: CreateBookmark) => {
  const response = await api.post('bookmark/og', { ...bookmark });
  return response.data;
};

export const removeBookmark = async (id: number) => {
  const response = await api.delete(`/bookmark/${id}`);
  return response.data;
};

export const updateBookmark = async (bookmark: UpdateBookmark) => {
  const response = await api.patch(`/bookmark/${bookmark.id}`, { ...bookmark });
  return response.data;
};
