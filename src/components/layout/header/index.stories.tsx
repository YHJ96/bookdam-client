import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { SidebarProvider } from '@/shared/ui';

import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Component/Header',
  component: Header,
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    isLogin: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-14 overflow-hidden">
        <SidebarProvider defaultOpen={false}>
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
  args: {
    title: '북마크',
    isLogin: false,
    onLogin: action('login'),
    onExcel: action('excel'),
  },
  parameters: {
    layout: 'padded',
    docs: {
      subtitle: 'Header 컴포넌트는 헤더를 표시하는 데 사용됩니다.',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '로그인 상태가 아닌 경우 표시되는 헤더 컴포넌트입니다.',
      },
    },
  },
};

export const Login: Story = {
  args: {
    isLogin: true,
  },
  parameters: {
    docs: {
      description: {
        story: '로그인 상태인 경우 표시되는 헤더 컴포넌트입니다.',
      },
    },
  },
};

export const Mobile: Story = {
  args: {
    isLogin: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: '모바일 환경에서 표시되는 헤더 컴포넌트입니다.',
      },
    },
  },
};
