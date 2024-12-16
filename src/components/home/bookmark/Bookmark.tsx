'use client';

import React from 'react';

import { ExternalLink } from 'lucide-react';

import { Card, CardContent, Image } from '@/shared/ui';

import BookmarkDropdown from './BookmarkDropdown';

type BookMarkListProps = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
};

function BookMark({ id, title, description, url, image }: BookMarkListProps) {
  return (
    <Card className="group relative pr-4">
      <div className="absolute right-2 top-2 z-10">
        <BookmarkDropdown id={id} />
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer">
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
      </a>
    </Card>
  );
}

export default BookMark;
