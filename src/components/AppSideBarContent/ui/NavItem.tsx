import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { LucideIcon } from 'lucide-react';

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shared/ui';

type NavItemProps = { title: string; icon: LucideIcon; url: string };

function NavItem({ icon: Icon, title, url }: NavItemProps) {
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

export default NavItem;
