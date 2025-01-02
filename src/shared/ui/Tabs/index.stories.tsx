import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabsList, TabsTrigger } from './index';

const meta = {
  title: 'Shared/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  render: (args) => (
    <Tabs {...args} className="w-96" defaultValue="tab1">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="tab1">Tab1</TabsTrigger>
        <TabsTrigger value="tab2">Tab2</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Tabs 컴포넌트는 탭을 표시하는 데 사용됩니다.',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 탭 컴포넌트입니다.',
      },
    },
  },
};
