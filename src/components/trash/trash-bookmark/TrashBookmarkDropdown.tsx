import React from 'react';

import { MoreHorizontal } from 'lucide-react';

import { useTrashBookmarkService } from '@/services';
import { useDialog, useRole } from '@/shared/hooks';
import { Button, Confirm, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui';

type TrashBookmarkDropdownProps = {
  id: number;
};

function TrashBookmarkDropdown({ id }: TrashBookmarkDropdownProps) {
  const role = useRole();
  const { redoBookmark, undoBookmark } = useTrashBookmarkService(role);
  const open = useDialog();

  const handleRedoOnSelect = async () => {
    const isConfirm = await open(Confirm, {
      title: '북마크 복구',
      description: '정말로 북마크를 복구하시겠습니까?',
    });

    if (!isConfirm) return;
    redoBookmark(id);
  };

  const handleUndoOnSelect = async () => {
    const isConfirm = await open(Confirm, {
      title: '북마크 삭제',
      description: '정말로 북마크를 영구 삭제하시겠습니까?',
    });

    if (!isConfirm) return;
    undoBookmark(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">휴지통 북마크 옵션</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onSelect={handleRedoOnSelect}>복구</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleUndoOnSelect}>영구 삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TrashBookmarkDropdown;
