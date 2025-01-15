import Link from 'next/link';

import { Button } from '@/shared/ui';

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-8 text-2xl">페이지를 찾을 수 없습니다</p>
      <Link href="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
