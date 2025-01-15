import { useState } from 'react';

import { uppercase } from '@/shared/utils';

export const useBookmarkDialogTag = (initialTags: string[] = []) => {
  const [tags, setTags] = useState<string[]>(initialTags);

  const addTag = (tag: string) => {
    const findByText = tags.find((_tag) => _tag.toLowerCase() === tag.toLowerCase());
    if (findByText) return;
    setTags((prev) => [...prev, tag]);
  };

  const deleteTag = (tag: string) => {
    setTags((prev) => prev.filter((_tag) => _tag !== tag));
  };

  return { tags: uppercase(tags), addTag, deleteTag };
};
