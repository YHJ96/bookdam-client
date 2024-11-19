import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { LucideIcon } from 'lucide-react';

import { useSidebar } from '@/shared/hooks';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui';

type NavigationProps = { title: string; icon: LucideIcon; url: string };

function Navigation({ icon: Icon, title, url }: NavigationProps) {
  const isPath = usePathname() === url;
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem onClick={() => setOpenMobile(false)}>
      <Link href={url}>
        <SidebarMenuButton tooltip={title} isActive={isPath}>
          <Icon />
          <span>{title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}

export default Navigation;
