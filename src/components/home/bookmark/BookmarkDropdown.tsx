'use client';

import React from 'react';

import { MoreHorizontal } from 'lucide-react';

import { useBookmarkService } from '@/services';
import { useDialog, useRole } from '@/shared/hooks';
import { Button, Confirm, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui';

import BookmarkUpdateDialog from '../bookmark-dialog/BookmarkUpdateDialog';

type BookmarkDropdownProps = {
  id: number;
};

function BookmarkDropdown({ id }: BookmarkDropdownProps) {
  const role = useRole();
  const { removeBookmark, updateBookmark, bookmarks } = useBookmarkService(role);
  const open = useDialog();

  const handleUpdateOnSelect = async () => {
    const findById = bookmarks.find((bookmark) => bookmark.id === id);
    if (!findById) return;

    const bookmark = await open(BookmarkUpdateDialog, { bookmark: findById });
    updateBookmark({ ...bookmark, id });
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">북마크 옵션</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onSelect={handleUpdateOnSelect}>수정</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onSelect={handleRemoveOnSelect}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BookmarkDropdown;
