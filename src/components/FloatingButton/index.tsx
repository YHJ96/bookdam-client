import React from 'react';

import { Bookmark } from 'lucide-react';

import { BookMarkDialog } from '@/components';
import { useDialog } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { Hide } from '@/shared/utils/react';

type FloatingButtonProps = {
  animationDisable: boolean;
};

function FloatingButton({ animationDisable }: FloatingButtonProps) {
  const open = useDialog();

  const handleOnClick = async () => {
    await open(BookMarkDialog, {
      title: '북마크 추가',
      description: '새로운 북마크의 정보를 입력해주세요.',
    });
  };

  return (
    <>
      <Button
        variant="transparent"
        className="fixed bottom-6 right-6 h-12 w-12 transform rounded-full bg-blue-700 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 dark:bg-blue-600 md:bottom-10 md:right-6 [&_svg]:size-4"
        onClick={handleOnClick}
      >
        <Bookmark className="text-blue-200" />
        <span className="sr-only">BookMark Add</span>
        <Hide
          condition={animationDisable}
          component={
            <div className="fixed h-12 w-12 animate-ping rounded-full bg-blue-700 opacity-75 dark:bg-blue-600" />
          }
        />
      </Button>
    </>
  );
}

export default FloatingButton;
