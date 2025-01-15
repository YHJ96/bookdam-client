import { useTag } from '@/entities/tag';

import { TagService } from './index';

export const useUserTagStrategy = (): TagService => {
  const { tags } = useTag();

  return { tags };
};
