'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { TrashBookmark, TrashBookmarkEmpty } from '@/components/trash';

import { TrashBookmarkTourService, useTrashBookmarkService } from '@/services';
import { useRole } from '@/shared/hooks';
import { IfElse } from '@/shared/utils/react';

const LazyTrashBookmarkTourService = dynamic(() => Promise.resolve(TrashBookmarkTourService), {
  ssr: false,
});

function Trash() {
  const role = useRole();
  const { bookmarks, redoBookmark, undoBookmark } = useTrashBookmarkService(role);

  return (
    <>
      <IfElse
        condition={Boolean(bookmarks.length)}
        then={
          <div
            id="trash-bookmark-list"
            className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {bookmarks.map((bookmark) => (
              <TrashBookmark
                key={bookmark.id}
                bookmark={bookmark}
                redoBookmark={redoBookmark}
                undoBookmark={undoBookmark}
              />
            ))}
          </div>
        }
        other={<TrashBookmarkEmpty isCSR={role === 'guest'} />}
      />
      <LazyTrashBookmarkTourService />
    </>
  );
}

export default Trash;
