'use client';

import { useQueryClient } from '@tanstack/react-query';

type User = {
  name: string;
  email: string;
  avatar: string;
};

export const useUser = () => {
  const queryClient = useQueryClient();
  const state = queryClient.getQueryData<User>(['user']);
  return { ...state };
};
