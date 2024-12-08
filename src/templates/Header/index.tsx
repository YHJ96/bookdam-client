'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { Download, Menu } from 'lucide-react';

import { PATHS_TO_ARRAY } from '@/shared/constants';
import { Button } from '@/shared/ui';
import { useSidebar } from '@/shared/ui';
import { Hide } from '@/shared/utils/react';

function Header() {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const path = usePathname();

  const currentPath = PATHS_TO_ARRAY.find(({ url }) => url === path);
  const handleLoginButtonOnClick = () => router.push('/login');

  return (
    <header className="flex w-full items-center justify-between border-b border-primary px-4 py-2.5">
      <section className="flex items-center gap-1.5">
        <Button className="h-6 w-6 md:hidden" variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu />
        </Button>

        <h2 className="font-bold">{currentPath?.title}</h2>
      </section>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Download />
          <span>엑셀 다운로드</span>
        </Button>
        <Hide
          condition={false}
          component={
            <Button variant="outline" size="sm" onClick={handleLoginButtonOnClick}>
              로그인
            </Button>
          }
        />
      </div>
    </header>
  );
}

export default Header;
