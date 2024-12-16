import React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/ui';
import { cn } from '@/shared/utils';

type BookmarkFormInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form' | 'name'>;

function BookmarkFormInput<T extends FieldValues>({
  form,
  name,
  label,
  className,
  ...rest
}: BookmarkFormInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('relative space-y-2', className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...rest} {...field} />
          </FormControl>
          <FormMessage className="absolute bottom-0 left-0" />
        </FormItem>
      )}
    />
  );
}

export default BookmarkFormInput;
