'use client';

import React, { useEffect, useRef } from 'react';

import { Bookmark } from 'lucide-react';

interface BookmarkEmptyProps {
  isCSR: boolean;
}

function BookmarkEmpty({ isCSR }: BookmarkEmptyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $container = containerRef.current;
    if (!isCSR) return;
    if (!$container) return;

    setTimeout(() => ($container.style.opacity = '1'));
  }, [isCSR]);

  return (
    <div
      ref={containerRef}
      className={`flex h-full flex-col items-center justify-center text-center ${isCSR && 'opacity-0'}`}
    >
      <Bookmark className="mb-4 h-16 w-16 text-muted-foreground" />
      <h2 className="mb-2 text-2xl font-semibold">북마크가 없습니다</h2>
      <p className="mb-4 text-muted-foreground">
        아직 저장된 북마크가 없습니다. 아래의 버튼을 눌러 새로운 북마크를 추가해보세요.
      </p>
    </div>
  );
}

export default BookmarkEmpty;
