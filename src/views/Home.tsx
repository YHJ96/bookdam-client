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

import { useUser } from '@/entities/user';
import { useBookmarkService, useTagService } from '@/services';
import { useFilterBookmark } from '@/shared/hooks';
import { IfElse } from '@/shared/utils/react';

function Home() {
  const { role } = useUser();
  const { bookmarks, updateBookmark, removeBookmark, createBookmark } = useBookmarkService(role);
  const { tags, selectedTags, toggleTag } = useTagService(role);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const filteredBookmarks = useFilterBookmark(bookmarks, search, selectedTags, order);

  return (
    <div className="flex h-full flex-col gap-1 pb-3 pt-1">
      <div className="flex flex-col gap-2 md:flex-row">
        <BookmarkSearchInput search={search} setSearch={setSearch} />
        <BookmarkSelectOrder order={order} setOrder={setOrder} />
      </div>
      <BookmarkTagFilter tags={tags} selectedTags={selectedTags} toggleTag={toggleTag} />
      <IfElse
        condition={Boolean(bookmarks.length)}
        then={
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredBookmarks.map((bookmark) => (
              <Bookmark
                key={bookmark.id}
                bookmark={bookmark}
                updateBookmark={updateBookmark}
                removeBookmark={removeBookmark}
              />
            ))}
          </div>
        }
        other={
          <div className="flex-1">
            <BookmarkEmpty isCSR={role === 'guest'} />
          </div>
        }
      />
      <FloatingButton isAnimate={!Boolean(bookmarks.length)} createBookmark={createBookmark} />
    </div>
  );
}

export default Home;
