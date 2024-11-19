'use client';

import * as React from 'react';

import { ChevronsUpDown, LogOut } from 'lucide-react';

import { UserPopover } from '@/components';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui';

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
