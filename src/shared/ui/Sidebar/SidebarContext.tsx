'use client';

import { createContext } from 'react';

type SidebarContext = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

type SidebarContextProps = SidebarContext | null;

const SidebarContext = createContext<SidebarContextProps>(null);

export default SidebarContext;
