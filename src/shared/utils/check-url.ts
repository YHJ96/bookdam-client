import { nextApi } from '@/shared/libs';

export const checkUrl = async (url: string) => {
  const response = await nextApi.get(`/url?url=${url}`);
  return response.data;
};
