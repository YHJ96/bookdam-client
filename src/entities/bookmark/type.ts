export type Bookmark = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
};

export type CreateBookmark = Omit<Bookmark, 'id' | 'image'>;
