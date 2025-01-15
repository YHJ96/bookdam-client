'use client';

import { AlertCircle } from 'lucide-react';

import { Button } from '@/shared/ui';

import './(layout)/globals.css';

export default function BookmarkError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const hanldeResetButtonOnClick = () => reset();
  const hanldeGoToHomeButtonOnClick = () => (window.location.href = '/');

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
            <div className="mb-6 flex items-center justify-center">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">북마크 로딩 오류</h1>
            <p className="mb-6 text-center text-gray-600">
              북마크를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={hanldeResetButtonOnClick} className="bg-blue-500 text-white hover:bg-blue-600">
                다시 시도
              </Button>
              <Button
                onClick={hanldeGoToHomeButtonOnClick}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                홈으로 돌아가기
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
