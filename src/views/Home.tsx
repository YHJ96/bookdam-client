'use client';

import React from 'react';

import { BookMark, BookMarkEmpty } from '@/components';
import { useBookmarkService } from '@/services/bookmark';
import { useRole } from '@/shared/hooks';
import { IfElse } from '@/shared/utils/react';

function Home() {
  const role = useRole();
  const { bookmarks } = useBookmarkService(role);

  return (
    <IfElse
      condition={Boolean(bookmarks.length)}
      then={
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {bookmarks.map((bookmark) => (
            <BookMark
              key={bookmark.id}
              id={bookmark.id}
              title={bookmark.title}
              description={bookmark.description}
              imageUrl={bookmark.image}
              url={bookmark.url}
            />
          ))}
        </div>
      }
      other={<BookMarkEmpty />}
    />
  );
}

export default Home;
