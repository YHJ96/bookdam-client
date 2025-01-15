import { useContext } from 'react';

import SidebarContext from './SidebarContext';

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === null) throw new Error('useSidebar는 반드시 SidebarProvider 내부에서 사용해야 합니다.');
  return context;
}

export default useSidebar;
