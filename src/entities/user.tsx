'use client';

import { useQueryClient } from '@tanstack/react-query';

type SessionUser = {
  name: string;
  email: string;
  avatar: string;
};

type User = {
  isSession: boolean;
  name: string;
  email: string;
  avatar: string;
};

export const useUser = (): User => {
  const queryClient = useQueryClient();
  const state = queryClient.getQueryData<SessionUser>(['user']);
  if (state === undefined) return { isSession: false, name: '', email: '', avatar: '' };
  return { isSession: true, ...state };
};
