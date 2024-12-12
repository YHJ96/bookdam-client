import React from 'react';

import { Bookmark } from 'lucide-react';

function BookMarkEmpty() {
  return (
    <div className="bg-background flex h-full flex-col items-center justify-center text-center">
      <Bookmark className="text-muted-foreground mb-4 h-16 w-16" />
      <h2 className="mb-2 text-2xl font-semibold">북마크가 없습니다</h2>
      <p className="text-muted-foreground mb-4">
        아직 저장된 북마크가 없습니다. 아래의 버튼을 눌러 새로운 북마크를 추가해보세요.
      </p>
    </div>
  );
}

export default BookMarkEmpty;
