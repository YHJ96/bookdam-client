import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SidebarProvider } from '@/shared/ui';

import AppSidebar from './index';

const meta: Meta<typeof AppSidebar> = {
  title: 'Component/AppSidebar',
  component: AppSidebar,
  parameters: {
    docs: {
      subtitle: 'AppSidebar 컴포넌트는 앱의 사이드바를 표시하는 데 사용됩니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 사이드바 컴포넌트입니다.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: '로그인 상태인 경우 표시되는 사이드바 컴포넌트입니다.',
      },
    },
  },
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
