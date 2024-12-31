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
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const Login: Story = {
  args: {
    isLogin: true,
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
      disable: true,
    },
  },
};
