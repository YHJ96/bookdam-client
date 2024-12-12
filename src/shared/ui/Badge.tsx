import * as React from 'react';

import { cn } from '@/shared/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'text-secondary-foreground inline-flex items-center rounded-md border border-transparent bg-[#F4F4F5] px-2.5 py-0.5 text-xs font-semibold text-[#18181B] transition-colors dark:bg-[#27272A] dark:text-[#FAFAFA]',
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
