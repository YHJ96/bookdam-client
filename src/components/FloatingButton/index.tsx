import React from 'react';

import { PlusCircle } from 'lucide-react';

import { Button } from '@/shared/ui';
import { Hide } from '@/shared/utils/react';

type FloatingButtonProps = {
  animationDisable: boolean;
};

function FloatingButton({ animationDisable }: FloatingButtonProps) {
  return (
    <>
      <Button
        variant="transparent"
        className="fixed bottom-6 right-6 h-12 w-12 transform rounded-full bg-blue-700 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 dark:bg-blue-600 md:bottom-10 md:right-6 [&_svg]:size-4"
      >
        <PlusCircle className="text-blue-200" />
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
