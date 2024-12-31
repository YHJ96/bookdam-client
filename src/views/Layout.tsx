import React from 'react';

import { cookies } from 'next/headers';

import { AppSidebar, Footer, Header } from '@/components/layout';

import { SidebarInset, SidebarProvider } from '@/shared/ui';

type LayoutProps = {
  children: React.ReactNode;
};

async function Layout({ children }: LayoutProps) {
  const cookie = await cookies();
  const defaultOpen = cookie.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1 p-2">{children}</div>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
