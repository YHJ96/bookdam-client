'use client';

import { createContext } from 'react';

type SidebarContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  state: 'expanded' | 'collapsed';
};

type SidebarContextProps = SidebarContext | null;

const SidebarContext = createContext<SidebarContextProps>(null);

export default SidebarContext;
