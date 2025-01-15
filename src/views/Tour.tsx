'use client';

import React from 'react';

import Link from 'next/link';

import { useUser, useUserUtils } from '@/entities/user';
import { Button } from '@/shared/ui';
import { useTourStore } from '@/store';

export default function Tour() {
  const { role } = useUser();
  const { startTour } = useTourStore();
  const { setRole } = useUserUtils();

  const handleStartTour = () => {
    if (role === 'tourist') return;
    startTour(role);
    setRole('tourist');
  };

  return (
    <div className="mx-auto flex h-full flex-col items-center justify-center px-4 py-16">
      <h2 className="mb-6 text-center text-3xl font-bold">북마크 튜토리얼에 오신 것을 환영합니다!</h2>
      <p className="mb-8 text-center text-xl">이 튜토리얼을 통해 북마크 기능의 사용법을 쉽게 배울 수 있습니다.</p>
      <Link href="/" onClick={handleStartTour}>
        <Button size="lg">튜토리얼 시작하기</Button>
      </Link>
    </div>
  );
}
