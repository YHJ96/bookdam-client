import React from 'react';

import Link from 'next/link';

import { Button } from '@/shared/ui';

export default function Tour() {
  return (
    <div className="mx-auto flex h-full flex-col items-center justify-center px-4 py-16">
      <h2 className="mb-6 text-4xl font-bold">북마크 튜토리얼에 오신 것을 환영합니다!</h2>
      <p className="mb-8 text-xl">이 튜토리얼을 통해 북마크 기능의 사용법을 쉽게 배울 수 있습니다.</p>
      <Link href="/trash">
        <Button size="lg">튜토리얼 시작하기</Button>
      </Link>
    </div>
  );
}
