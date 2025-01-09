import { Bookmark } from '@/entities/bookmark';

import { TrashBookmarkService } from './index';

export const useTouristTrashBookmarkStrategy = (): TrashBookmarkService => {
  const bookmark: Bookmark = {
    id: 1000000,
    title: '네이버',
    description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
    url: 'https://www.naver.com',
    image: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    createdAt: '2024-12-16T08:59:51.460Z',
    tags: [],
  };

  return { bookmarks: [bookmark], redoBookmark: () => {}, undoBookmark: () => {} };
};
