import * as React from 'react';

import { UserPopover } from '@/components';
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/shared/ui';

function AppSideBarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <UserPopover />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default AppSideBarFooter;
