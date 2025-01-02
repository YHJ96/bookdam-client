import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import * as z from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui';

const meta: Meta<typeof Form> = {
  title: 'Shared/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => <ProfileForm {...args} />,
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Form 컴포넌트는 폼을 표시하는 데 사용됩니다.',
    },
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  name: z.string().min(2, {
    message: '유저이름은 2글자 이상이어야 합니다.',
  }),
});

const ProfileForm = (args: Story['args']) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    action('onSubmit')(values);
  }

  return (
    <Form {...args} {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="이름"
                  {...field}
                />
              </FormControl>
              <FormDescription>유저의 이름이 입력됩니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button className="rounded bg-primary px-4 py-2 text-primary-foreground" type="submit">
          확인
        </button>
      </form>
    </Form>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 폼 컴포넌트입니다.',
      },
    },
  },
};
