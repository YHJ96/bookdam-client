import React, { useState } from 'react';

import { BookPlus, Plus } from 'lucide-react';

import type { Theme } from '@/shared/types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

function BookMarkModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-40 w-40 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700">
          <BookPlus className="h-24 w-24" />
        </Button>
      </DialogTrigger>

      <DialogContent className={cn('bg-white sm:max-w-[425px]')}>
        <DialogHeader>
          <DialogTitle>북마크 추가</DialogTitle>
          <DialogDescription>새로운 북마크의 정보를 입력하세요.</DialogDescription>
        </DialogHeader>
        <form className="space-y-16">
          <div className="space-y-8">
            <Label>제목</Label>
            <Input placeholder="북마크 제목" className={'bg-white'} />
          </div>
          <div className="space-y-8">
            <Label>URL</Label>
            <Input placeholder="https://example.com" className={'bg-white'} />
          </div>
          <div className="space-y-8">
            <Label>태그</Label>
            <div className="flex space-x-8">
              <Input placeholder="태그 추가" className={'bg-white'} />
              <Button type="button" size="icon">
                <Plus className="h-16 w-16" />
              </Button>
            </div>
          </div>

          <div className="h-16" />

          <Button type="submit" className={cn('w-full bg-blue-500 text-white hover:bg-blue-600')}>
            북마크 추가
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BookMarkModal;
