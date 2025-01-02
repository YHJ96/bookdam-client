import React, { useEffect, useRef } from 'react';

import Link from 'next/link';

import { ArrowLeft, Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui';

interface TrashBookmarkEmptyProps {
  isCSR: boolean;
}

function TrashBookmarkEmpty({ isCSR }: TrashBookmarkEmptyProps) {
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
      className={`flex h-full flex-col items-center justify-center p-4 text-center ${isCSR && 'opacity-0'}`}
    >
      <div className="mb-4 rounded-full bg-muted p-3">
        <Trash2 className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">휴지통이 비어 있습니다</h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        삭제된 북마크가 없습니다. 북마크를 삭제하면 이곳에 표시됩니다.
      </p>
      <Button asChild>
        <Link href="/" className="inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          북마크로 돌아가기
        </Link>
      </Button>
    </div>
  );
}

export default TrashBookmarkEmpty;
