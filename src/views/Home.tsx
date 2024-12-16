'use client';

import React from 'react';

import { Bookmark, BookmarkEmpty, FloatingButton } from '@/components/home';

import { useBookmarkService } from '@/services/bookmark';
import { useRole } from '@/shared/hooks';
import { Badge } from '@/shared/ui';
import { IfElse } from '@/shared/utils/react';
import { useTagStore } from '@/store/tag';

function Home() {
  const role = useRole();
  const { bookmarks } = useBookmarkService(role);
  const { tags } = useTagStore();

  return (
    <React.Fragment>
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
      <IfElse
        condition={Boolean(bookmarks.length)}
        then={
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {bookmarks.map((bookmark) => (
              <Bookmark key={bookmark.id} {...bookmark} />
            ))}
          </div>
        }
        other={<BookmarkEmpty />}
      />
      <FloatingButton />
    </React.Fragment>
  );
}

export default Home;
