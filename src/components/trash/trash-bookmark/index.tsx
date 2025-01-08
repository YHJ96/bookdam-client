'use client';

import React from 'react';

import { ExternalLink } from 'lucide-react';

import { Bookmark } from '@/entities/bookmark';
import { useDialog } from '@/shared/hooks';
import { Card, CardContent, Confirm, Image } from '@/shared/ui';

import TrashBookmarkDropdown from './TrashBookmarkDropdown';

type TrashBookmarkProps = {
  bookmark: Bookmark;
  redoBookmark: (id: number) => void;
  undoBookmark: (id: number) => void;
};

function TrashBookmark({ bookmark, redoBookmark, undoBookmark }: TrashBookmarkProps) {
  const { id, title, description, url, image } = bookmark;

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
    <Card id="trash-bookmark" className="group relative pr-4">
      <div className="absolute right-2 top-2 z-10">
        <TrashBookmarkDropdown redoOnSelect={handleRedoOnSelect} undoOnSelect={handleUndoOnSelect} />
      </div>
      <CardContent className="flex items-center p-4">
        <div className="relative mr-4 h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
          <Image src={image} alt={title} fill={true} style={{ objectFit: 'contain' }} />
        </div>
        <div className="min-w-0 flex-grow">
          <h3 className="truncate text-sm font-medium text-blue-600">{title}</h3>
          <p className="mt-1 truncate text-xs text-gray-600">{description}</p>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <ExternalLink className="mr-1 h-3 w-3" />
            <span className="truncate">{url}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TrashBookmark;
