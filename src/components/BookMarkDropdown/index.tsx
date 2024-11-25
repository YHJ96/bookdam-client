import React from 'react';

import { MoreHorizontal } from 'lucide-react';

import { ConfirmDialog } from '@/components';
import { useDialog } from '@/shared/hooks';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui';

function BookMarkDropdown() {
  const open = useDialog();

  const handleUpdateOnSelect = async () => {
    await open(ConfirmDialog, { title: '북마크 수정', description: '정말로 북마크를 업데이트 하시겠습니까?' });
  };

  const handleRemoveOnSelect = async () => {
    await open(ConfirmDialog, {
      title: '북마크 삭제',
      description: '정말로 북마크를 삭제하시겠습니까? (휴지통으로 이동합니다.)',
    });
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
        <DropdownMenuItem onSelect={handleRemoveOnSelect}>삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BookMarkDropdown;
