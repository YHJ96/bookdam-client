import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/shared/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  isDelete?: boolean;
  onDelete?: () => void;
}

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-[#C4C4CA] bg-[#D4D4D8] text-[#18181B] dark:border-[#3F3F46] dark:bg-[#52525B] dark:text-[#FAFAFA]',
        selected: 'border-transparent bg-[#E4E4E7] text-[#18181B] dark:bg-[#27272A] dark:text-[#FAFAFA]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
});
Badge.displayName = 'Badge';

export interface BadgeDeleteProps extends React.HTMLAttributes<HTMLButtonElement> {
  onDelete: () => void;
}

const BadgeDelete = React.forwardRef<HTMLButtonElement, BadgeDeleteProps>(
  ({ className, onDelete, children, ...props }, ref) => {
    return (
      <button ref={ref} className={className} {...props} onClick={onDelete}>
        <X className="h-3 w-3" />
        <span className="sr-only">Remove Tag</span>
      </button>
    );
  },
);
BadgeDelete.displayName = 'BadgeDelete';
export { Badge, BadgeDelete };
