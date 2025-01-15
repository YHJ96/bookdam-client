import type { Meta, StoryObj } from '@storybook/react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './index';

const meta: Meta<typeof Select> = {
  title: 'Shared/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-96">
        <SelectValue placeholder="선택해주세요." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="select1">선택1</SelectItem>
          <SelectItem value="select2">선택2</SelectItem>
          <SelectItem value="select3">선택3</SelectItem>
          <SelectItem value="select4">선택4</SelectItem>
          <SelectItem value="select5">선택5</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Select 컴포넌트는 선택 목록을 표시하는 데 사용됩니다.',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 선택 컴포넌트입니다.',
      },
    },
  },
};
