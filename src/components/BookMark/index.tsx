'use client';

import React from 'react';

import { ExternalLink } from 'lucide-react';

import { Card, CardContent, Image } from '@/shared/ui';

import BookMarkDropdown from '../BookMarkDropdown';

type BookMarkListProps = {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
};

function BookMark({ title, description, url, imageUrl }: BookMarkListProps) {
  return (
    <Card className="group relative">
      <div className="absolute right-2 top-2 z-10">
        <BookMarkDropdown />
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <CardContent className="flex items-center p-4">
          <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
            <Image src={imageUrl} alt={title} width={60} height={60} />
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
