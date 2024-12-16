import { nextApi } from '@/shared/libs';
import type { Revalidate } from '@/shared/types';

export const revalidate = async (tags: Array<Revalidate>) => {
  const response = await nextApi.post('/revalidate', { tags });
  return response.data;
};
