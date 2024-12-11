import { useMutation, useQuery } from '@tanstack/react-query';

import { api, nextApi } from '@/shared/libs';

export async function revalidateBookmark() {
  const response = await nextApi.post('/bookmark');
  return response.data;
}

export async function getBookmark() {
  const response = await api.get('/bookmark');
  return response.data;
}

export async function createBookmark(url: string) {
  const response = await api.post('/bookmark', { title: '', description: '', tags: ['React'], url });
  return response.data;
}

type BookMark = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
};

export const useBookmark = () => {
  const { data, ...rest } = useQuery<BookMark[]>({ queryKey: ['bookmark'], queryFn: getBookmark, staleTime: Infinity });

  return { bookmarks: data ?? null, ...rest };
};

export const useCreateBookmark = () => {
  const { mutate } = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      revalidateBookmark();
    },
  });

  return mutate;
};
