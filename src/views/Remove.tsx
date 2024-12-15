'use client';

import React from 'react';

import { BookMark } from '@/components';
import { useTrashBookmark } from '@/entities/trash-bookmark';

function Remove() {
  const { bookmarks } = useTrashBookmark();
  return (
    <div>
      {bookmarks.map((bookmark) => (
        <BookMark
          key={bookmark.id}
          id={bookmark.id}
          title={bookmark.title}
          description={bookmark.description}
          url={bookmark.url}
          imageUrl={bookmark.image}
        />
      ))}
    </div>
  );
}

export default Remove;
