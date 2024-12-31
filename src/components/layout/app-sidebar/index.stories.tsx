import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SidebarProvider } from '@/shared/ui';

import AppSidebar from './index';

const meta: Meta<typeof AppSidebar> = {
  title: 'Component/AppSidebar',
  component: AppSidebar,
};

export default meta;

type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();

      return (
        <QueryClientProvider client={queryClient}>
          <SidebarProvider defaultOpen={true}>
            <Story />
          </SidebarProvider>
        </QueryClientProvider>
      );
    },
  ],
};

export const Login: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      queryClient.prefetchQuery({
        queryKey: ['user'],
        queryFn: () => ({ name: 'YHJ96', avatar: 'https://github.com/YHJ96.png', email: 'YHJ96@github.com' }),
      });

      return (
        <QueryClientProvider client={queryClient}>
          <SidebarProvider defaultOpen={true}>
            <Story />
          </SidebarProvider>
        </QueryClientProvider>
      );
    },
  ],
};
