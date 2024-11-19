'use client';

import * as React from 'react';

import { Sidebar, SidebarRail } from '@/shared/ui';

import { AppSideBarContent, AppSideBarFooter } from './ui';

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
