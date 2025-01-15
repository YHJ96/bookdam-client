import { useState } from 'react';

import { useIsMobile } from '@/shared/hooks';
import { TooltipProvider } from '@/shared/ui';

import SidebarContext from './SidebarContext';

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_ICON = '3rem';

interface SidebarProviderProps {
  defaultOpen: boolean;
  children: React.ReactNode;
}

const style = { '--sidebar-width': SIDEBAR_WIDTH, '--sidebar-width-icon': SIDEBAR_WIDTH_ICON } as React.CSSProperties;

function SidebarProvider({ children, defaultOpen }: SidebarProviderProps) {
  const [openMobile, setOpenMobile] = useState(false);
  const [open, _setOpen] = useState(defaultOpen);

  const setOpen = (value: boolean | ((value: boolean) => boolean)) => {
    const openState = typeof value === 'function' ? value(open) : value;
    _setOpen(openState);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  };

  const isMobile = useIsMobile();
  const toggleSidebar = () => (isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev));
  const state = open ? 'expanded' : 'collapsed';

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar, state, isMobile, openMobile, setOpenMobile }}>
      <TooltipProvider delayDuration={0}>
        <div
          className="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar"
          style={style}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;
