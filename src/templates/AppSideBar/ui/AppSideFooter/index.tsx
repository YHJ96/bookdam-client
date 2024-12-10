import { UserPopover } from '@/components';
import { useUser } from '@/entities';
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/shared/ui';

function AppSideBarFooter() {
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

export default AppSideBarFooter;
