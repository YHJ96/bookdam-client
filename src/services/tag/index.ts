import { useState } from 'react';

import { Role } from '@/shared/types';

import { useGuestTagStrategy } from './useGuestTagStrategy';
import { useUserTagStrategy } from './useUserTagStrategy';

export interface TagService {
  tags: string[];
}

export const useTagService = (role: Role) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const useUserTag = useUserTagStrategy();
  const useGuestTag = useGuestTagStrategy();

  const filterSelectedTags = (tags: string[], tag: string) => {
    return tags.filter((_tag) => _tag !== tag);
  };

  const addSelectedTags = (tags: string[], tag: string) => {
    return [...tags, tag];
  };

  const toggleTag = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    setSelectedTags((prev) => (isSelected ? filterSelectedTags(prev, tag) : addSelectedTags(prev, tag)));
  };

  switch (role) {
    case 'user':
      return { ...useUserTag, selectedTags, toggleTag };
    case 'guest':
      return { ...useGuestTag, selectedTags, toggleTag };
    default:
      throw new Error(`해당 역할이 없습니다. : ${role}`);
  }
};
