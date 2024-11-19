import { Navigation } from '@/components';
import { PATHS_TO_ARRAY } from '@/shared/constants';
import { SidebarContent, SidebarGroup, SidebarMenu } from '@/shared/ui';

function AppSideBarContent() {
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

export default AppSideBarContent;
