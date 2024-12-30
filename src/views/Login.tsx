'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui';

function Login() {
  const router = useRouter();

  const handleBackButtonOnClick = () => router.back();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mb-8 w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">로그인</CardTitle>
          <CardDescription className="text-center">소셜 계정으로 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90 dark:bg-[#FEE500] dark:hover:bg-[#FEE500]/90"
            asChild
          >
            <a href={process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL}>카카오로 로그인</a>
          </Button>
          <Button className="w-full border border-gray-300 bg-white text-black hover:bg-gray-100" asChild>
            <a href={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL}>Google로 로그인</a>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <Button variant="default" onClick={handleBackButtonOnClick}>
            이전 페이지로 돌아가기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
