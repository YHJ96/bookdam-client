'use client';

import React from 'react';

import { Download, Menu } from 'lucide-react';

import { Button } from '@/shared/ui';
import { useSidebar } from '@/shared/ui';
import { Hide } from '@/shared/utils/react';

interface HeaderProps {
  title?: string;
  isLogin: boolean;
  onLogin: () => void;
  onExcel: () => void;
}

function Header({ title, isLogin, onLogin, onExcel }: HeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-14 w-full items-center justify-between border-b bg-background px-4 py-2.5">
      <section className="flex items-center gap-1.5">
        <Button className="h-6 w-6 md:hidden" variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu />
        </Button>

        <h2 className="font-bold">{title}</h2>
      </section>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onExcel}>
          <Download />
          <span>엑셀 다운로드</span>
        </Button>

        <Hide
          condition={isLogin}
          component={
            <Button variant="outline" size="sm" onClick={onLogin}>
              로그인
            </Button>
          }
        />
      </div>
    </header>
  );
}

export default Header;
