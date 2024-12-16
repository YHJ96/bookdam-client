'use client';

import { useUser } from '@/entities/user';
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/shared/ui';

import UserPopover from './UserPopover';

function AppSidebarFooter() {
  const { user } = useUser();
  if (!user) return null;

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <UserPopover {...user} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default AppSidebarFooter;
