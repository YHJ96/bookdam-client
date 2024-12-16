import { useUser } from '@/entities/user';
import { Role } from '@/shared/types';

export const useRole = (): Role => {
  const { user } = useUser();
  return user ? 'user' : 'guest';
};
