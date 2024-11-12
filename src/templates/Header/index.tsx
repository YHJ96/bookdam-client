import React, { useState } from 'react';

import { usePathname } from 'next/navigation';

import { Download } from 'lucide-react';

import { PATHS_TO_ARRAY } from '@/shared/constants';
import { Button } from '@/shared/ui';
import { Hide } from '@/shared/utils/react';

function Header() {
  const _path = usePathname();
  const currentPath = PATHS_TO_ARRAY.find((path) => path.url === _path);
  const [isLogin, setIsLogin] = useState(false);
  const login = () => setIsLogin(true);

  return (
    <header className="flex h-12 w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-1.5 dark:border-[#303030] dark:bg-[#151515]">
      <h2 className="text-base font-bold text-gray-800 dark:text-gray-300">{currentPath?.title}</h2>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Download />
          <span>엑셀 다운로드</span>
        </Button>
        <Hide
          condition={isLogin}
          component={
            <Button variant="outline" size="sm" onClick={login}>
              로그인
            </Button>
          }
        />
      </div>
    </header>
  );
}

export default Header;
