import { useTagStore } from '@/store';

import { TagService } from './index';

export const useGuestTagStrategy = (): TagService => {
  const { tags } = useTagStore();

  return { tags };
};
