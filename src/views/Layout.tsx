import React from 'react';

import { cookies } from 'next/headers';

import { FloatingButton } from '@/components';
import { SidebarInset, SidebarProvider } from '@/shared/ui';
import { AppSideBar, Footer, Header } from '@/templates';

type LayoutProps = {
  children: React.ReactNode;
};

async function Layout({ children }: LayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
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
