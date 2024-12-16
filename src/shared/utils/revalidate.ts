import { nextApi } from '@/shared/libs';

export const revalidate = async (tags: Array<'bookmark' | 'trash'>) => {
  const response = await nextApi.post('/revalidate', { tags });
  return response.data;
};
