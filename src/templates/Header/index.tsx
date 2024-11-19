import React, { HTMLAttributes, ReactElement, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Download, Menu } from 'lucide-react';

import { PATHS_TO_ARRAY } from '@/shared/constants';
import { Button, SidebarTrigger } from '@/shared/ui';
import { Hide } from '@/shared/utils/react';

function Header() {
  const _path = usePathname();
  const currentPath = PATHS_TO_ARRAY.find((path) => path.url === _path);
  const [isLogin, setIsLogin] = useState(false);
  const login = () => setIsLogin(true);

  return (
    <header className="border-primary flex h-12 w-full items-center justify-between border-b px-4 py-1.5">
      <section className="flex items-center gap-1">
        <SidebarTrigger>
          <Button className="sm:hidden" variant="ghost" size="icon">
            <Menu />
          </Button>
        </SidebarTrigger>

        <h2 className="text-base font-bold text-gray-800 dark:text-gray-300">{currentPath?.title}</h2>
      </section>

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
