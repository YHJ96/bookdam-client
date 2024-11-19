'use client';

import React from 'react';

import { FloatingButton } from '@/components';
import { SidebarInset, SidebarProvider } from '@/shared/ui';
import { AppSideBar, Footer, Header } from '@/templates';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col dark:text-sidebar-foreground">
          <Header />
          <div className="flex-1 p-2">{children}</div>
          <Footer />
        </div>
      </SidebarInset>
      <FloatingButton animationDisable={false} />
    </SidebarProvider>
  );
}

export default Layout;
