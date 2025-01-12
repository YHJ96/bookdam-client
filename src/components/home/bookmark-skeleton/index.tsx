import React from 'react';

import { Card, CardContent, Skeleton } from '@/shared/ui';

function BookmarkSkeleton() {
  return (
    <Card className="relative pr-4">
      <CardContent className="flex items-center p-4">
        <div className="relative mr-4 h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="min-w-0 flex-grow">
          <Skeleton className="h-5" />
          <Skeleton className="mt-1 h-4" />
          <Skeleton className="mt-1 h-4" />
        </div>
      </CardContent>
    </Card>
  );
}

export default BookmarkSkeleton;
