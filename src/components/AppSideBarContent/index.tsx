import { PATHS_TO_ARRAY } from '@/shared/constants';
import { SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui';

import { NavItem } from './ui';

function AppSideBarContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {PATHS_TO_ARRAY.map((nav) => (
            <NavItem key={nav.id} title={nav.title} icon={nav.icon} url={nav.url} />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}

export default AppSideBarContent;
