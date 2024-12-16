'use client';

import React from 'react';

import { TrashBookmark } from '@/components/trash';

import { useTrashBookmarkService } from '@/services';
import { useRole } from '@/shared/hooks';

function Trash() {
  const role = useRole();
  const { bookmarks } = useTrashBookmarkService(role);

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

export default Trash;
