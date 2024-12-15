import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Bookmark } from '../bookmark';
import { getTrashBookmark } from './api';

export const useTrashBookmark = () => {
  const { data, ...rest } = useQuery<Bookmark[]>({
    queryKey: ['trash'],
    queryFn: getTrashBookmark,
    staleTime: Infinity,
  });

  return { bookmarks: data ?? [], ...rest };
};

export const useRedoTrashBookmark = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({});

  return mutate;
};

export const useUndoTrashBookmark = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({});

  return mutate;
};
