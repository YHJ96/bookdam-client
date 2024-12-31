'use client';

import React from 'react';

import { MoreHorizontal } from 'lucide-react';

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui';

type BookmarkDropdownProps = {
  updateOnSelect: () => void;
  removeOnSelect: () => void;
};

function BookmarkDropdown({ updateOnSelect, removeOnSelect }: BookmarkDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">북마크 옵션</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onSelect={updateOnSelect}>수정</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onSelect={removeOnSelect}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BookmarkDropdown;
