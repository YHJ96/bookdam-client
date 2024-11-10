import React, { useState } from 'react';

import { User } from 'lucide-react';

import { Button } from '@/shared/ui';
import { IfElse } from '@/shared/utils/react';

function Header() {
  const [isLogin, setIsLogin] = useState(false);

  const login = () => setIsLogin(true);

  return (
    <header className="flex w-full items-center justify-between border-b border-t border-gray-200 bg-white px-20 py-8 dark:border-[#303030] dark:bg-[#151515] sm:py-12">
      {/* 아이콘 영역 */}
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-300 sm:text-xl">북담</h2>

      <IfElse
        condition={isLogin}
        then={
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <User className="h-20 w-20 sm:h-24 sm:w-24" aria-hidden="true" />
            <span className="sr-only">사용자 프로필</span>
          </Button>
        }
        other={
          <Button
            variant="outline"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={login}
          >
            로그인
          </Button>
        }
      />
    </header>
  );
}

export default Header;
