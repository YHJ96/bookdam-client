import type { Meta, StoryObj } from '@storybook/react';

import Footer from './index';

type Story = StoryObj<typeof Footer>;

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    darkMode: { stylePreview: true },
    layout: 'centered',
    docs: {
      description: {
        component: '',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Footer>;

export const Default: Story = {
  args: {},
};

export default meta;
