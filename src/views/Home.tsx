'use client';

import React from 'react';

import { BookMark } from '@/components';
import { useBookmark } from '@/entities';

function Home() {
  const { bookmarks } = useBookmark();

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {bookmarks?.map((bookmark) => (
        <BookMark
          key={bookmark.id}
          title={bookmark.title}
          description={bookmark.description}
          imageUrl={bookmark.image}
          url={bookmark.url}
        />
      ))}
    </div>
  );
}

export default Home;
