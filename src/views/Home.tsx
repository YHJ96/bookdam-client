'use client';

import React, { useState } from 'react';

import {
  Bookmark,
  BookmarkEmpty,
  BookmarkSearchInput,
  BookmarkSelectOrder,
  BookmarkTagFilter,
  FloatingButton,
} from '@/components/home';

import { useBookmarkService, useTagService } from '@/services';
import { useFilterBookmark, useRole } from '@/shared/hooks';
import { IfElse } from '@/shared/utils/react';

function Home() {
  const role = useRole();
  const { bookmarks } = useBookmarkService(role);
  const { tags, selectedTags, toggleTag } = useTagService(role);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const filteredBookmarks = useFilterBookmark(bookmarks, search, selectedTags, order);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-2 pb-3 pt-1">
        <div className="flex flex-col gap-2 md:flex-row">
          <BookmarkSearchInput search={search} setSearch={setSearch} />
          <BookmarkSelectOrder order={order} setOrder={setOrder} />
        </div>
        <BookmarkTagFilter tags={tags} selectedTags={selectedTags} toggleTag={toggleTag} />
      </div>
      <IfElse
        condition={Boolean(bookmarks.length)}
        then={
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredBookmarks.map((bookmark) => (
              <Bookmark key={bookmark.id} {...bookmark} />
            ))}
          </div>
        }
        other={<BookmarkEmpty isCSR={role === 'guest'} />}
      />
      <FloatingButton />
    </React.Fragment>
  );
}

export default Home;
