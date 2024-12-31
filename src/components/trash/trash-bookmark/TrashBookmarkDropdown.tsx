import React from 'react';

import { MoreHorizontal } from 'lucide-react';

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui';

type TrashBookmarkDropdownProps = {
  redoOnSelect: () => void;
  undoOnSelect: () => void;
};

function TrashBookmarkDropdown({ redoOnSelect, undoOnSelect }: TrashBookmarkDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">휴지통 북마크 옵션</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onSelect={redoOnSelect}>복구</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onSelect={undoOnSelect}>
          영구 삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TrashBookmarkDropdown;
