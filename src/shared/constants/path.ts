import { Bookmark, HelpCircle, Trash2 } from 'lucide-react';

export const PATHS = {
  BOOK_MARK: {
    id: 'BOOK_MARK',
    title: '북마크',
    icon: Bookmark,
    url: '/',
  },
  REMOVE: {
    id: 'REMOVE',
    title: '휴지통',
    icon: Trash2,
    url: '/remove',
  },
  TOUR: {
    id: 'TOUR',
    title: '시작 가이드',
    icon: HelpCircle,
    url: '/tour',
  },
} as const;

export const PATHS_TO_ARRAY = Object.values(PATHS);
