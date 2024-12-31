import React from 'react';

import { Sidebar, SidebarRail } from '@/shared/ui';

import AppSidebarContent from './app-sidebar-content/AppSidebarContent';
import AppSidebarFooter from './app-sidebar-footer/AppSidebarFooter';

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarContent />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
