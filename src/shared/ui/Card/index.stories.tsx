import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './index';

const meta = {
  title: 'Shared/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader>
        <CardTitle>헤더 제목</CardTitle>
        <CardDescription>헤더 내용</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <div>
            <p>제목</p>
            <p className="text-foreground/50">내용</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>푸터</CardFooter>
    </Card>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
