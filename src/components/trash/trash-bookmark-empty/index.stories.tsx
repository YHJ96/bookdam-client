import type { Meta, StoryObj } from '@storybook/react';

import TrashBookmarkEmpty from './index';

const meta: Meta<typeof TrashBookmarkEmpty> = {
  title: 'Component/TrashBookmarkEmpty',
  component: TrashBookmarkEmpty,
} satisfies Meta<typeof TrashBookmarkEmpty>;

export default meta;

type Story = StoryObj<typeof TrashBookmarkEmpty>;

export const Default: Story = {};
