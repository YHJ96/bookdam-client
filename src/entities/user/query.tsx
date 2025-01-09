import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Bookmark } from '@/entities/bookmark';
import type { Role } from '@/shared/types';

import { removeCookiesApi } from './api';
import { User } from './type';

type UserWithRole = {
  role: Role;
  user: User | null;
};

export const useUserUtils = () => {
  const queryClient = useQueryClient();

  const getUser = () => {
    const user = queryClient.getQueryData<UserWithRole>(['user']);
    return user ?? { role: 'guest', user: null };
  };

  const setRole = (role: Role) => {
    const { user } = getUser();
    queryClient.setQueryData<UserWithRole>(['user'], { role, user });
  };

  return { setRole };
};

export const useUser = () => {
  const { data } = useQuery<User, Error, UserWithRole>({
    queryKey: ['user'],
    staleTime: Infinity,
  });

  return data ?? { role: 'guest', user: null };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: removeCookiesApi,
    onSuccess: () => {
      queryClient.setQueryData<UserWithRole>(['user'], { role: 'guest', user: null });
      queryClient.setQueryData<Bookmark[]>(['bookmark'], []);
    },
  });

  return mutate;
};
