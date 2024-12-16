export type Bookmark = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  createdAt: string;
  tags: string[];
};

export type CreateBookmark = Omit<Bookmark, 'id' | 'image' | 'createdAt'>;

export type UpdateBookmark = Omit<Bookmark, 'url' | 'image' | 'createdAt'>;

export type OgTag = Omit<Bookmark, 'id' | 'createdAt' | 'tags'>;
