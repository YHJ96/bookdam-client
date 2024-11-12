'use client';

import React from 'react';

import { SidebarInset, SidebarProvider } from '@/shared/ui';
import { AppSideBar, Header } from '@/templates';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <Header />
        <div className="p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
