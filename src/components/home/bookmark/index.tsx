'use client';

import React from 'react';

import { ExternalLink } from 'lucide-react';

import type { Bookmark as BookmarkType } from '@/entities/bookmark';
import { useDialog } from '@/shared/hooks';
import { Card, CardContent, Confirm, Image } from '@/shared/ui';

import BookmarkUpdateDialog from '../bookmark-dialog/BookmarkUpdateDialog';
import BookmarkDropdown from './BookmarkDropdown';

type BookmarkProps = {
  bookmark: BookmarkType;
  updateBookmark: (bookmark: BookmarkType) => void;
  removeBookmark: (id: number) => void;
};

function Bookmark({ bookmark, updateBookmark, removeBookmark }: BookmarkProps) {
  const open = useDialog();
  const { id, title, description, url, image } = bookmark;

  const handleUpdateOnSelect = async () => {
    const updateBookmarkResult = await open(BookmarkUpdateDialog, { bookmark });
    updateBookmark({ ...bookmark, ...updateBookmarkResult });
  };

  const handleRemoveOnSelect = async () => {
    const isConfirm = await open(Confirm, {
      title: '북마크 삭제',
      description: '정말로 북마크를 삭제하시겠습니까? (휴지통으로 이동합니다.)',
    });

    if (!isConfirm) return;
    removeBookmark(id);
  };

  return (
    <Card id="bookmark" className="group relative pr-4">
      <div className="absolute right-2 top-2 z-10">
        <BookmarkDropdown updateOnSelect={handleUpdateOnSelect} removeOnSelect={handleRemoveOnSelect} />
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label="bookmark">
        <CardContent className="flex items-center p-4">
          <div className="relative mr-4 h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
            <Image src={image} alt={title} priority={true} fill={true} sizes="56px" />
          </div>
          <div className="min-w-0 flex-grow">
            <h3 className="truncate text-sm font-medium text-blue-600">{title}</h3>
            <p className="mt-1 truncate text-xs text-gray-600">{description}</p>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <ExternalLink className="mr-1 h-3 w-3" />
              <span className="truncate">{url}</span>
            </div>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}

export default Bookmark;
