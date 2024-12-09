'use client';

import React from 'react';

import { BookMark } from '@/components';

function Home() {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <BookMark
        title="북마크 제목"
        description="북마크 내용"
        imageUrl="https://github.com/yhj96.png"
        url="http://localhost:3000"
      />
      <BookMark
        title="북마크 제목"
        description="북마크 내용"
        imageUrl="https://github.com/yhj96.png"
        url="http://localhost:3000"
      />
      <BookMark
        title="북마크 제목"
        description="북마크 내용"
        imageUrl="https://github.com/yhj96.png"
        url="http://localhost:3000"
      />
    </div>
  );
}

export default Home;
