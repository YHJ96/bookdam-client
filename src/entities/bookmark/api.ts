import { api, nextApi } from '@/shared/libs';

import { CreateBookmark } from './type';

export const revalidateBookmark = async () => {
  const response = await nextApi.post('/bookmark');
  return response.data;
};

export const getBookmark = async () => {
  const response = await api.get('/bookmark');
  return response.data;
};

export const createBookmark = async (bookmark: CreateBookmark) => {
  const response = await api.post('/bookmark', { bookmark });
  return response.data;
};

export const createOgTag = async (url: string) => {
  const response = await api.post('/og', { url });
  return response.data;
};
