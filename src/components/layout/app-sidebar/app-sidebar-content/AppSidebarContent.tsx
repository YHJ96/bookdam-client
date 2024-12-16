'use client';

import { PATHS_TO_ARRAY } from '@/shared/constants';
import { SidebarContent, SidebarGroup, SidebarMenu } from '@/shared/ui';

import Navigation from './Navigation';

function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {PATHS_TO_ARRAY.map((nav) => (
            <Navigation key={nav.id} title={nav.title} icon={nav.icon} url={nav.url} />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}

export default AppSidebarContent;
