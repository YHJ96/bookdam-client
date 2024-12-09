import * as React from 'react';

import { UserPopover } from '@/components';
import { useUser } from '@/entities';
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/shared/ui';
import { Hide } from '@/shared/utils/react';

function AppSideBarFooter() {
  const { isSession, ...rest } = useUser();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <Hide condition={!isSession} component={<UserPopover {...rest} />} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default AppSideBarFooter;
