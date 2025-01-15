import { useState } from 'react';

import { Role } from '@/shared/types';
import { uppercase } from '@/shared/utils';

import { useGuestTagStrategy } from './useGuestTagStrategy';
import { useTouristTagStrategy } from './useTouristTagStrategy';
import { useUserTagStrategy } from './useUserTagStrategy';

export interface TagService {
  tags: string[];
}

export const useTagService = (role: Role) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const userTags = useUserTagStrategy().tags;
  const guestTags = useGuestTagStrategy().tags;
  const touristTags = useTouristTagStrategy().tags;

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
      return { tags: uppercase(userTags), selectedTags, toggleTag };
    case 'guest':
      return { tags: uppercase(guestTags), selectedTags, toggleTag };
    case 'tourist':
      return { tags: uppercase(touristTags), selectedTags, toggleTag };
    default:
      throw new Error(`해당 역할이 없습니다. : ${role}`);
  }
};
