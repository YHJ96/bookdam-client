import React from 'react';

import { PlusCircle } from 'lucide-react';

import { Button } from '@/shared/ui';

/* [TODO] 배경색 다크모드 라이트모드 조절 */
function FloatingButton() {
  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-16 w-16 transform rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-indigo-700"
        aria-label="북마크 추가"
      >
        <PlusCircle className="h-8 w-8" />
        <span className="sr-only">BookMark Add</span>
      </Button>
      <div className="fixed bottom-6 right-6 h-16 w-16 animate-ping rounded-full bg-indigo-400 opacity-75" />
    </>
  );
}

export default FloatingButton;
