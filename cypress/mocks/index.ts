const BOOKMARKS_DATA = [
  {
    title: '네이버',
    description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
    url: 'https://naver.com',
    image: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    id: 142216,
    tags: [],
    createdAt: '2025-01-03T08:54:14.136Z',
  },
  {
    title: 'Google',
    description: '',
    url: 'https://google.com',
    image:
      'https://zyhedgwubqhgbbifgwmd.supabase.co/storage/v1/object/sign/image/empty.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZS9lbXB0eS53ZWJwIiwiaWF0IjoxNzMzMjExNTI5LCJleHAiOjE3NjQ3NDc1Mjl9.2aBu-Xc8hUQN5ZWFOeFxCIiDd-ESxSH524Bcjc1M3DU&t=2024-12-03T07%3A38%3A49.188Z',
    id: 612970,
    tags: [],
    createdAt: '2025-01-03T08:54:22.841Z',
  },
];

const TRASH_BOOKMARKS_DATA = [
  {
    title: '네이버',
    description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
    url: 'https://naver.com',
    image: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    id: 142116,
    tags: [],
    createdAt: '2025-01-03T08:54:14.136Z',
  },
  {
    title: 'Google',
    description: '',
    url: 'https://google.com',
    image:
      'https://zyhedgwubqhgbbifgwmd.supabase.co/storage/v1/object/sign/image/empty.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZS9lbXB0eS53ZWJwIiwiaWF0IjoxNzMzMjExNTI5LCJleHAiOjE3NjQ3NDc1Mjl9.2aBu-Xc8hUQN5ZWFOeFxCIiDd-ESxSH524Bcjc1M3DU&t=2024-12-03T07%3A38%3A49.188Z',
    id: 622970,
    tags: [],
    createdAt: '2025-01-03T08:54:22.841Z',
  },
];

const BOOKMARKS_DATA_LOCAL_STORAGE = {
  state: {
    bookmarks: BOOKMARKS_DATA,
  },
  version: 0,
};

const TRASH_BOOKMARKS_DATA_LOCAL_STORAGE = {
  state: {
    bookmarks: TRASH_BOOKMARKS_DATA,
  },
  version: 0,
};

export { BOOKMARKS_DATA_LOCAL_STORAGE, BOOKMARKS_DATA, TRASH_BOOKMARKS_DATA_LOCAL_STORAGE };
