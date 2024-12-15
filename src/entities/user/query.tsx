import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { removeCookiesApi } from './api';
import { User } from './type';

export const useUser = () => {
  const { data, ...rest } = useQuery<User>({ queryKey: ['user'], staleTime: Infinity });

  return { user: data ?? null, ...rest };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: removeCookiesApi,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.setQueryData(['bookmark'], []);
    },
  });

  return mutate;
};
