import { Role } from '@/shared/types';

import { useGuestTagStrategy } from './useGuestTagStrategy';
import { useUserTagStrategy } from './useUserTagStrategy';

export interface TagService {
  tags: string[];
}

export const useTagService = (role: Role) => {
  const useUserTag = useUserTagStrategy();
  const useGuestTag = useGuestTagStrategy();

  switch (role) {
    case 'user':
      return useUserTag;
    case 'guest':
      return useGuestTag;
    default:
      throw new Error(`해당 역할이 없습니다. : ${role}`);
  }
};
