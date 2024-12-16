import { useState } from 'react';

export const useBookmarkDialogTag = () => {
  const [tags, setTags] = useState<string[]>([]);

  const addTag = (tag: string) => {
    const findByText = tags.find((_tag) => _tag.toLowerCase() === tag.toLowerCase());
    if (findByText) return;
    setTags((prev) => [...prev, tag]);
  };

  const deleteTag = (tag: string) => {
    setTags((prev) => prev.filter((_tag) => _tag !== tag));
  };

  return { tags, addTag, deleteTag };
};
