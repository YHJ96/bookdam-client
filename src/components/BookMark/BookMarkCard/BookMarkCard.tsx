import React from 'react';

import { ExternalLink } from 'lucide-react';

import { Theme } from '@/shared/types';
import { Card, CardContent } from '@/shared/ui';
import { cn } from '@/shared/utils';

type BookMarkCardProps = { title: string; description: string; url: string; theme: Theme };

function BookMarkCard({ title, description, url, theme }: BookMarkCardProps) {
  const styles = {
    light: {
      card: 'bg-white text-gray-800 hover:bg-gray-50',
      iconBackground: 'bg-gray-200',
      iconFill: '#E5E7EB',
      title: 'text-blue-600',
      description: 'text-gray-600',
      linkText: 'text-gray-500',
    },
    dark: {
      card: 'bg-gray-800 text-gray-100 hover:bg-gray-600',
      iconBackground: 'bg-gray-700',
      iconFill: '#374151',
      title: 'text-blue-400',
      description: 'text-gray-400',
      linkText: 'text-gray-300',
    },
  };

  const currentStyle = styles[theme];

  return (
    <a href={url} target="_blank">
      <Card
        className={cn(
          'min-w-300 h-150 w-full overflow-hidden rounded-lg shadow-md transition-colors duration-200',
          currentStyle.card,
        )}
      >
        <div className="flex h-full">
          <div className={cn('w-100 h-full flex-shrink-0', currentStyle.iconBackground)}>
            <svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="150" fill={currentStyle.iconFill} />
              <text
                x="50"
                y="75"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fill="#6B7280"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                100x150
              </text>
            </svg>
          </div>
          <CardContent className="flex flex-grow flex-col justify-between p-12">
            <div>
              <h3 className={cn('truncate text-sm font-medium', currentStyle.title)}>{title}</h3>
              <p className={cn('mt-1 line-clamp-2 text-xs', currentStyle.description)}>{description}</p>
            </div>
            <div className="mt-8 flex items-center text-xs">
              <ExternalLink className="mr-4 h-12 w-12" />
              <span className={cn('truncate', currentStyle.linkText)}>{url}</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </a>
  );
}

export default BookMarkCard;
