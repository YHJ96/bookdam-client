'use client';

import React from 'react';

import TrashBookmark from '@/components/TrashBookmark';

import { useTrashBookmark } from '@/entities/trash-bookmark';

function Remove() {
  const { bookmarks } = useTrashBookmark();
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <TrashBookmark
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
