'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/shared/libs';

export type User = {
  name: string;
  email: string;
  avatar: string;
};

const removeCookies = async () => await api.post('/auth/logout');

export const useUser = () => {
  const { data, ...rest } = useQuery<User>({ queryKey: ['user'], staleTime: Infinity });

  return { user: data ?? null, ...rest };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: removeCookies,
    onSuccess: () => queryClient.setQueryData(['user'], null),
  });

  return mutate;
};
