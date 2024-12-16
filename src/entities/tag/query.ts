import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useBookmarkUtils } from '@/entities/bookmark';

import { getTagsApi } from './api';

export const useTagUtils = () => {
  const { getBookmarks } = useBookmarkUtils();
  const queryClient = useQueryClient();

  const getUniqueTags = () => {
    const bookmarks = getBookmarks();
    const set = new Set<string>(bookmarks.flatMap((bookmark) => bookmark.tags));
    return Array.from(set.values());
  };

  const setTags = (tags: string[]) => {
    queryClient.setQueryData<string[]>(['tag'], tags);
  };

  return { getUniqueTags, setTags };
};

export const useTag = () => {
  const { data, ...rest } = useQuery<string[]>({ queryKey: ['tag'], queryFn: getTagsApi, staleTime: Infinity });

  return { tags: data ?? [], ...rest };
};
