import { api } from '@/shared/libs';

export const getTagsApi = async () => {
  const response = await api.get('/tag');
  return response.data;
};
