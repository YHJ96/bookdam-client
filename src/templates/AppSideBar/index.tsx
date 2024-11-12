'use client';

import * as React from 'react';

import { AppSideBarContent, AppSideBarFooter } from '@/components';
import { Sidebar, SidebarRail } from '@/shared/ui';

function AppSideBar() {
  return (
    <Sidebar collapsible="icon">
      <AppSideBarContent />
      <AppSideBarFooter />
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSideBar;
