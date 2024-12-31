'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { useUser } from '@/entities/user';
import { useBookmarkService } from '@/services';
import { PATHS_TO_ARRAY } from '@/shared/constants';
import { useRole } from '@/shared/hooks';
import { excel } from '@/shared/utils';

import Header from './Header';

interface ContainerProps {
  component: typeof Header;
}

function Container({ component: Compoent }: ContainerProps) {
  const { user } = useUser();
  const router = useRouter();
  const role = useRole();
  const { bookmarks } = useBookmarkService(role);

  const path = usePathname();
  const currentPath = PATHS_TO_ARRAY.find(({ url }) => url === path);

  const handleLoginButtonOnClick = () => router.push('/login');
  const handleExcelButtonOnClick = () => excel(bookmarks);

  return (
    <Compoent
      title={currentPath?.title}
      isLogin={Boolean(user)}
      onLogin={handleLoginButtonOnClick}
      onExcel={handleExcelButtonOnClick}
    />
  );
}

export default Container;
