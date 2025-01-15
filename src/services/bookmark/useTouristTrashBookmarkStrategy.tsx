import { Bookmark } from '@/entities/bookmark';

import { BookmarkService } from './';

export const useTouristTrashBookmarkStrategy = (): BookmarkService => {
  const bookmarks: Bookmark[] = [
    {
      id: 1000000,
      title: '네이버',
      description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
      url: 'https://www.naver.com',
      image: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
      createdAt: '2024-12-16T08:59:51.460Z',
      tags: ['IT'],
    },
    {
      id: 1000001,
      title: 'Kakao',
      description: '기술과 사람으로 더 나은 세상을 만듭니다',
      url: 'https://www.kakaocorp.com',
      image: 'https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png',
      createdAt: '2024-12-17T08:59:51.460Z',
      tags: ['IT'],
    },
    {
      id: 1000002,
      title: '로켓배송으로 빠르게, 로켓와우 멤버십으로 할인과 무료 반품까지 | 쿠팡',
      description:
        '쿠팡 로켓배송, 로켓프레시, 로켓직구, 로켓럭셔리까지 쿠팡 멤버십으로 모든 혜택을 한 번에 누려보세요. 쿠팡 로켓와우 멤버는 무료배송도 가능합니다.',
      url: 'https://www.coupang.com',
      image: 'https://image10.coupangcdn.com/image/mobile/v3/img_fb_like.png',
      createdAt: '2024-12-18T08:59:51.460Z',
      tags: ['쇼핑'],
    },
  ];

  return { bookmarks, createBookmark: () => {}, removeBookmark: () => {}, updateBookmark: () => {} };
};
