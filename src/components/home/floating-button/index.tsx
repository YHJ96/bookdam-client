'use client';

import React from 'react';

import { Bookmark } from 'lucide-react';

import { CreateBookmark } from '@/entities/bookmark';
import { useDialog } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { Hide } from '@/shared/utils/react';

import BookmarkCreateDialog from '../bookmark-dialog/BookmarkCreateDialog';

type FloatingButtonProps = {
  isAnimate: boolean;
  createBookmark: (bookmark: CreateBookmark) => void;
};

function FloatingButton({ isAnimate, createBookmark }: FloatingButtonProps) {
  const open = useDialog();

  const handleOnClick = async () => {
    const bookmark = await open(BookmarkCreateDialog, {
      title: '북마크 추가',
      description: '새로운 북마크의 정보를 입력해주세요.',
    });

    createBookmark({ ...bookmark });
  };

  return (
    <>
      <Button
        variant="default"
        className="fixed bottom-6 right-6 z-50 h-12 w-12 transform rounded-full bg-blue-700 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 dark:bg-blue-600 md:bottom-10 md:right-6 [&_svg]:size-4"
        onClick={handleOnClick}
      >
        <Bookmark className="text-blue-200" />
        <span className="sr-only">Bookmark Add</span>
        <Hide
          condition={!isAnimate}
          component={
            <div className="fixed h-12 w-12 animate-ping rounded-full bg-blue-700 opacity-75 dark:bg-blue-600" />
          }
        />
      </Button>
    </>
  );
}

export default FloatingButton;
