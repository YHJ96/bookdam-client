import React from 'react';

import { cookies } from 'next/headers';

import { AppSidebarContent, AppSidebarFooter, Footer, Header } from '@/components/layout';

import { Sidebar, SidebarInset, SidebarProvider, SidebarRail } from '@/shared/ui';

type LayoutProps = {
  children: React.ReactNode;
};

async function Layout({ children }: LayoutProps) {
  const cookie = await cookies();
  const defaultOpen = cookie.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar collapsible="icon">
        <AppSidebarContent />
        <AppSidebarFooter />
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen flex-col dark:text-sidebar-foreground">
          <Header />
          <div className="flex-1 p-2">{children}</div>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
