'use client';

import React, { useState } from 'react';

import { Bookmark, BookmarkEmpty, BookmarkSearchInput, BookmarkTagFilter, FloatingButton } from '@/components/home';

import { useBookmarkService, useTagService } from '@/services';
import { useRole } from '@/shared/hooks';
import { IfElse } from '@/shared/utils/react';

function Home() {
  const role = useRole();
  const { bookmarks } = useBookmarkService(role);
  const { tags, selectedTags, toggleTag } = useTagService(role);
  const [search, setSearch] = useState('');

  return (
    <React.Fragment>
      <BookmarkSearchInput search={search} setSearch={setSearch} />
      <BookmarkTagFilter tags={tags} selectedTags={selectedTags} toggleTag={toggleTag} />
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
