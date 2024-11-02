import React from 'react';

import { ExternalLink } from 'lucide-react';

import { Theme } from '@/shared/types';
import { Card, CardContent } from '@/shared/ui';
import { cn } from '@/shared/utils';

type BookMarkListProps = {
  title: string;
  description: string;
  url: string;
  theme: Theme;
};

function BookMarkList({ title, description, url, theme }: BookMarkListProps) {
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
        className={cn('w-full overflow-hidden rounded-lg shadow-md transition-colors duration-200', currentStyle.card)}
      >
        <CardContent className="flex items-center p-16">
          <div className={cn('mr-16 h-60 w-60 flex-shrink-0 rounded-md', currentStyle.iconBackground)}>
            <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="60" fill={currentStyle.iconFill} />
              <text
                x="30"
                y="30"
                fontFamily="Arial, sans-serif"
                fontSize="10"
                fill={theme === 'light' ? '#6B7280' : '#9CA3AF'}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                60x60
              </text>
            </svg>
          </div>
          <div className="min-w-0 flex-grow">
            <h3 className={cn('truncate text-sm font-medium', currentStyle.title)}>{title}</h3>
            <p className={cn('mt-4 truncate text-xs', currentStyle.description)}>{description}</p>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <ExternalLink className="mr-4 h-12 w-12" />
              <span className={cn('truncate', currentStyle.linkText)}>{url}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

export default BookMarkList;
